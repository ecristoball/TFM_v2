import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { CrearJsonService } from '../../../../services/crear-json.service';
import { Showlevel1Service,JsonKey } from '../../../../services/showlevel1.service';
import { MostrarDialogoService } from '../../../../services/mostrar-dialogo.service';
import { DialogoJsonComponent } from '../../../../shared/dialogo-json/dialogo-json.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SelectionService } from '../../../../services/selection.service';
import { DragDropService } from '../../../../services/drag-drop.service';
import { Subject, takeUntil, skip } from 'rxjs';

@Component({
  selector: 'app-options-selected',
  templateUrl: './options-selected.component.html',
  styleUrls: ['./options-selected.component.css']
})

export class OptionsSelectedComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  tojsonItems: any[] = [];
  jsonResult: any;
  private subscription!: Subscription;

  constructor (private mostrarDialogoService: MostrarDialogoService, 
    private showlevel1service: Showlevel1Service, private crearJsonService:CrearJsonService,
    private dialog: MatDialog, private selectionService:SelectionService,
    private dragdropservice: DragDropService) {}

 
  @Input() connectedTo: string[] = [];
  selectedItems: any[] = [];
  copiedItem: any={};

  dropListIds: string[] = [];

  ngOnInit() {
    console.log(this.dropListIds)
    this.dragdropservice.selectedItems$.subscribe(items => {
      this.selectedItems = items;
    });
    this.dragdropservice.dropListIds$.subscribe(ids => {
      this.dropListIds = ids;
    });
  } 

  onItemDropped(event: CdkDragDrop<any[]>) {
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
    if (event.previousContainer !== event.container) {
      const item = event.previousContainer.data[event.previousIndex];
      this.copiedItem = { ...item };
      const itemType = event.item.data?.type || this.copiedItem.key_name;
      const dialog$ = this.mostrarDialogoService.openDialogForItem(itemType);

      // Muestra el dialogo, todavía no se ha hecho drop
      if (dialog$) {
        dialog$.subscribe(result => {
          if (result) {
            this.copiedItem.value = result;

            // Guardar en el backend
            this.insertValue(itemType, result);
             item.locked = true;
             console.log("result",result)
             

          // Insertamos el clon en la lista destino
            this.dragdropservice.addItemToSelected(this.copiedItem);
            console.log("Item copiado sin borrar el original:", this.copiedItem);
          }
          if (!result){
             console.log("El diálogo se cerró SIN datos");
             return
          }
        });
      }   
    }
  }

  insertValue(key:string,valor:any){
    console.log("insert",key,valor)
    this.showlevel1service.updateValue(key, valor).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err)
    });
  }

  mostrarJson() {
  this.crearJsonService.generarJson();
    
  }

 
  ngOnDestroy(): void {
    this.dragdropservice.clearLevel2Groups();
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDelete(){
    if (confirm('¿Seguro que quieres borrar todos los valores?')){
      this.showlevel1service.deleteAllValues().subscribe({
        next: (res) => {
            console.log('Valores eliminados correctamente:', res);
              this.selectedItems = [];
        this.tojsonItems = [];
        this.jsonResult = null;

        //bloqueados por drag&drop
        this.copiedItem = {};
          },
          error: (err) => console.error('Error al eliminar valores:', err)
        });
    }
  }

}