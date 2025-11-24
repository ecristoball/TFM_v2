import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { CrearJsonService } from '../../../../services/crear-json.service';
import { Showlevel1Service,JsonKey } from '../../../../services/showlevel1.service';
import { MostrarDialogoService } from '../../../../services/mostrar-dialogo.service';
import { DialogoJsonComponent } from '../../../../shared/dialogo-json/dialogo-json.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, skip  } from 'rxjs';
import { SelectionService } from '../../../../services/selection.service';
import { DragDropService } from '../../../../services/drag-drop.service';


@Component({
  selector: 'app-options-selected',
  templateUrl: './options-selected.component.html',
  styleUrls: ['./options-selected.component.css']
})


export class OptionsSelectedComponent {

  tojsonItems: any[] = [];
  jsonResult: any;
  private subscription!: Subscription;
  constructor (private mostrarDialogoService: MostrarDialogoService, 
    private showlevel1service: Showlevel1Service, private crearJsonService:CrearJsonService,
  private dialog: MatDialog,private selectionService:SelectionService,private state: DragDropService) {}

 
  @Input() connectedTo: string[] = [];
  selectedItems: any[] = [];
  copiedItem: any={};

  //escucha los ids y conéctalos

  dropListIds: string[] = [];

  ngOnInit() {
    console.log(this.dropListIds)
    this.state.selectedItems$.subscribe(items => {
      this.selectedItems = items;
      console.log("itesss", items)
    });
    

    this.state.dropListIds$.subscribe(ids => {
  console.log('dropListIds', ids);
  this.dropListIds = ids;
});
  } 



  onItemDropped(event: CdkDragDrop<any[]>) {
console.log('prev:', event.previousContainer.id, 'dest:', event.container.id);
console.log('prevData:', event.previousContainer.data);
console.log('destData:', event.container.data);
    this.subscription = this.selectionService.selectedKeys$ //escucha el observable
      .pipe(skip(1)) //evitar primera carga al pasar de una pantalla a otra 
      .subscribe(event => {
          // si un item se seleccionó
          if (event.selected && event.toggledKey ) {
            //this.showlevel1service.getOptionsBy(2, event.toggledKey).subscribe(data => {
             // this.level2Groups[event.toggledKey!] = data;
             console.log("er")
            //});
            console.log("evento ", event.toggledKey,event.front_parent)
          }
    
          // si un item se deseleccionó
          if (event.selected === false && event.toggledKey) {
            this.tojsonItems=[];
            this.selectedItems = [];
            this.jsonResult = null;
            this.copiedItem = {};
            console.log ("dlete")
          }
        });
    console.log("itemgropxx")
    if (event.previousContainer !== event.container) {
      console.log("itemgrop2222")
      const item = event.previousContainer.data[event.previousIndex];
      console.log("itemgrop222888", item)
      this.copiedItem = { ...item };
      const itemType = event.item.data?.type || this.copiedItem.key_name;
      console.log("item ess ", itemType)
   
        const dialog$ = this.mostrarDialogoService.openDialogForItem(itemType);
        
        console.log ("dialogo", dialog$,itemType)




        

      // Muestra el dialogo, todavía no se ha hecho drop
      if (dialog$) {
        dialog$.subscribe(result => {
          if (result) {
            console.log(`Resultado del diálogo (${itemType}):`, result);

          // Actualizar el valor directamente en el componente
            const updatedItem = this.selectedItems.find(i => i.key_name === itemType);
            if (updatedItem) {
              updatedItem.value = result;
              console.log("Item actualizado localmente:", updatedItem,updatedItem.value, result);
            }

          // Guardar en el backend
            this.insertValue(itemType, result);
             item.locked = true;

        // Insertamos el clon en la lista destino
            this.state.addItemToSelected(this.copiedItem);
            console.log("item esssssssssssss ", this.copiedItem)
            //event.container.data.splice(event.currentIndex, 0, this.copiedItem);
            console.log("Item copiado sin borrar el original:", this.copiedItem);
          }
          if (!result){
             console.log("El diálogo se cerró SIN datos");
             return
          }
        });
      }
           
    }
    console.log ("drop")
  }

  insertValue(key:string,valor:any){
    console.log("insert",key,valor)
    this.showlevel1service.updateValue(key, valor).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err)
    });
  }



crearJson() {
  this.showlevel1service.getLevelsBy(2).subscribe(data => {
   this.tojsonItems = (data as any[]).map(item => ({
  ...item,
  value: this.parseValue(item.value)
    })
  );
    console.log("datos de tabla", this.tojsonItems);
    this.jsonResult = this.crearJsonService.convertTableToJson(this.tojsonItems);
    console.log('JSON generado:', this.jsonResult);

     // 1VALIDACIÓN: comprobar los campos requeridos
    const itemsInvalidos = this.tojsonItems.filter(item =>
      item.required === 1 && (item.value === null || item.value === '' || item.value === undefined)
    );

    if (itemsInvalidos.length > 0) {
     const lista = itemsInvalidos.map(i => i.level1 || i.key_name).join(", ");
  alert("Faltan valores obligatorios para: " + lista);
  return;
    }

    //const jsonData = this.generarJson(); // Aquí generas tu objeto JSON
    this.dialog.open(DialogoJsonComponent, {
      width: '600px',
      data: this.jsonResult
    });
  });
}

parseValue(value: any) {
  try {
    // Si es una cadena JSON, se convierte al tipo correcto
    return JSON.parse(value);
  } catch {
    // Si no lo es, se devuelve tal cual
    return value;
  }
}



/*
onDrop(event: any) {
  console.log ("drop")
  const itemType = event.item.data?.type || 'scoresConfiguration';

  const dialog$ = this.mostrarDialogoService.openDialogForItem(itemType);

  if (dialog$) {
    dialog$.subscribe(result => {
      if (result) {
        console.log(`Resultado del diálogo (${itemType}):`, result);
        // aquí puedes guardar el valor en tu backend Laravel
      }
    });
  }
}
  */

  onDelete(){
    if (confirm('¿Seguro que quieres borrar todos los valores?')){
      this.showlevel1service.deleteValues().subscribe({
        next: (res) => {
            console.log('Valores eliminados correctamente:', res);
              this.selectedItems = [];
        this.tojsonItems = [];
        this.jsonResult = null;

        // 🔹 Opcional: si tienes items bloqueados por drag&drop
        this.copiedItem = {};
            // Si quieres, actualiza tu vista aquí (por ejemplo, recargar datos)
          },
          error: (err) => console.error('Error al eliminar valores:', err)
        });
    }
  }

    }