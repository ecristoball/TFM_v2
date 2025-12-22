import { Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { CrearJsonService } from '../../../../services/crear-json.service';
import { Showlevel1Service,JsonKey } from '../../../../services/showlevel1.service';
import { MostrarDialogoService } from '../../../../services/mostrar-dialogo.service';
import { DialogoJsonComponent } from '../../../../shared/dialogo-json/dialogo-json.component';
import { MatDialog } from '@angular/material/dialog';
import { Input } from '@angular/core';


@Component({
  selector: 'app-estilos-selected',
  templateUrl: './estilos-selected.component.html',
  styleUrl: './estilos-selected.component.css'
})
export class EstilosSelectedComponent {

  tojsonItems: any[] = [];
  jsonResult: any;

  constructor (private mostrarDialogoService: MostrarDialogoService, 
    private showlevel1service: Showlevel1Service, private crearJsonService:CrearJsonService,
    private dialog: MatDialog) {}

 
  @Input() connectedTo: string[] = [];
  selectedItems: any[] = [];
  copiedItem: any={};

  onItemDropped(event: CdkDragDrop<any[]>) {
    console.log("itemgrop")
      if (event.previousContainer !== event.container) {
        const item = event.previousContainer.data[event.previousIndex];

        // Clonamos el item para no modificar el original
        this.copiedItem = { ...item };
        item.locked = true;

        // Insertamos el clon en la lista destino
        event.container.data.splice(event.currentIndex, 0, this.copiedItem);
        console.log("Item copiado sin borrar el original:", this.copiedItem);
      }
      console.log ("drop")
      const itemType = event.item.data?.type || this.copiedItem.key_name;
      console.log("item es ", itemType)

      const dialog$ = this.mostrarDialogoService.openDialogForItem(itemType);
// para mostrar dialogos, no drag&drop
   if (dialog$) {
  dialog$.subscribe(result => {
    if (result) {
      console.log(`Resultado del diálogo (${itemType}):`, result);

      // 🔹 Actualizar el valor directamente en el componente
      const updatedItem = this.selectedItems.find(i => i.key_name === itemType);
      if (updatedItem) {
        updatedItem.value = result;
        console.log("Item actualizado localmente:", updatedItem,updatedItem.value, result);
      }

      // 🔹 Guardar en el backend
      this.insertValue(itemType, result);
    }
  });
}





  }

  insertValue(key:string,valor:any){
    console.log("insert",key,valor)
    this.showlevel1service.updateValue(key, valor).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err)
    });
  }



crearJson() {
  this.showlevel1service.getLevelsBy().subscribe(data => {
   this.tojsonItems = (data as any[]).map(item => ({
  ...item,
  value: this.parseValue(item.value)
    })
  );
    console.log("datos de tabla", this.tojsonItems);
    this.jsonResult = this.crearJsonService.convertTableToJson(this.tojsonItems);
    console.log('JSON generado:', this.jsonResult);
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

  onDelete(){
    if (confirm('¿Seguro que quieres borrar todos los valores?')){
      this.showlevel1service.deleteAllValues().subscribe({
        next: (res) => {
            console.log('Valores eliminados correctamente:', res);
            // Si quieres, actualiza tu vista aquí (por ejemplo, recargar datos)
          },
          error: (err) => console.error('Error al eliminar valores:', err)
        });
  }
}

    }