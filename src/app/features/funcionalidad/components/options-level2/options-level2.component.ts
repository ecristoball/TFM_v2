import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonKey, Showlevel1Service } from '../../../../services/showlevel1.service';
import { Subscription } from 'rxjs';
import { SelectionService } from '../../../../services/selection.service';
import { CdkDragDrop,transferArrayItem,CdkDropList} from '@angular/cdk/drag-drop';
import { skip } from 'rxjs';
import { DragDropService } from '../../../../services/drag-drop.service';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-options-level2',
  templateUrl: './options-level2.component.html',
  styleUrl: './options-level2.component.css'
})

export class OptionsLevel2Component implements OnInit, OnDestroy,AfterViewInit {
  //level2Items: any[] = [];
  level2Groups: {[key:string]:any[]}={};
  loading=false;
  private subscription!: Subscription;
 @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;
  constructor(private showlevel1service: Showlevel1Service,private state: DragDropService, private selectionService:SelectionService) {}

  ngOnInit(): void { 
    this.subscription = this.selectionService.selectedKeys$ //escucha el observable
    .pipe(skip(1)) //evitar primera carga al pasar de una pantalla a otra 
    .subscribe(event => {
      // si un item se seleccionó
      if (event.selected && event.toggledKey && event.front_parent!="core") {
        this.showlevel1service.getOptionsBy(2, event.toggledKey).subscribe(data => {
          this.level2Groups[event.toggledKey!] = data;
        });
        console.log("evento ", event.toggledKey,event.front_parent)
      }
      // si un item se deseleccionó
      if (event.selected === false && event.toggledKey) {
        delete this.level2Groups[event.toggledKey];
      }
    });

    this.state.level2Groups$.subscribe(groups => {
      this.level2Groups = groups;
      const ids = Object.keys(groups).map(key => `${key}-list`);
      this.state.setDropListIds(ids);
      console.log("IDS ENVIADOS DESDE LEVEL2", ids);
    });

   
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit() {
    console.log("afete")
    this.updateDropListIds();

    this.dropLists.changes.subscribe(() => {
      this.updateDropListIds();
    });
  }

  private updateDropListIds() {
    const ids = this.dropLists.map(list => list.id);
    this.state.setDropListIds(ids);
    console.log("Actualizando dropListIds: en options level2", ids);
  }

  //drop en options-level2, cuando vuelve de selected
  onItemDropped(event: CdkDragDrop<any[]>) {

    console.log('previous:', event.previousContainer.id, 'destious:', event.container.id);
    console.log('prevDataios:', event.previousContainer.data);
    console.log('destDataios:', event.container.data);
    const item = event.previousContainer.data[event.previousIndex];
    console.log("estoy aqui=", item)

    const fromSelected = event.previousContainer.id === 'selected-list';
    const toSelected = event.container.id === 'selected-list';

    this.state.moveItemBetweenLists(item, fromSelected, toSelected, event.currentIndex);
  }
}
  /*
    console.log("dropeado")
    if (event.previousContainer !== event.container) {
    console.log("dropeado")
    this.state.moveItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    console.log("intento hacer drop")
  }*/
    /*
  }
    if (event.previousContainer.id === 'optionsSelected') {

        const item = event.previousContainer.data[event.previousIndex];

        // Insertar en el grupo correcto
        this.level2Groups[groupKey].splice(event.currentIndex, 0, item);

        // Eliminar de options-selected
        event.previousContainer.data.splice(event.previousIndex, 1);

        return;
        */
 

      /*
    if (event.previousContainer !== event.container) {
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }*/
  



/*

    this.subscription = this.selectionService.selectedKey$.subscribe(key => {
      if (!key) return;
      this.loading = true;
     
      this.showlevel1service.getItemsBy(1, key).subscribe(data => {
      this.level2Items = data;
      this.loading = false;
      console.log(data);
    });
    });
    */


/*

    this.subscription = this.selectionService.selectedKey$.subscribe(key => {
    // Si key === null -> limpiar lo cargado
    if (!key) {
      this.level2Groups = {};        // limpia las listas mostradas
      this.loading = false;
      return;
    }

    // Si hay clave -> cargar opciones de nivel 2
    this.loading = true;
    this.showlevel1service.getOptionsBy(2, key).subscribe(data => {
      this.level2Groups[key] = data;
      this.loading = false;
      console.log(data);
    }, err => {
      this.loading = false;
      console.error(err);
    });
  });

*/








  
