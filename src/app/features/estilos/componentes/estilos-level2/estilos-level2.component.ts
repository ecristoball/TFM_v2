import { Component, OnDestroy } from '@angular/core';
import { Showlevel1Service } from '../../../../services/showlevel1.service';
import { Subscription } from 'rxjs';
import { SelectionService } from '../../../../services/selection.service';

import { Subject, takeUntil, skip } from 'rxjs';
import { DragDropService } from '../../../../services/drag-drop.service';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CdkDragDrop,transferArrayItem,CdkDropList} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-estilos-level2',
  templateUrl: './estilos-level2.component.html',
  styleUrl: './estilos-level2.component.css'
})

/*
export class EstilosLevel2Component { 
  private destroy$ = new Subject<void>(); 
  selectedBackgroundColor: string = '#000000';
  selectedBorderColor: string = '#000000';
  selectedBorderWidth='0px';
  level2Groups: {[key:string]:any[]}={};
  loading=false;
  private subscription!: Subscription;
selectedColor = '#000000';
  constructor(private showlevel1service: Showlevel1Service, private selectionService:SelectionService) {}


  ngOnInit(): void { 
    this.selectionService.selectedKeys$
    .pipe(skip(1),takeUntil(this.destroy$))
      .subscribe(event => {
        console.log('EVENTO COMPLETO:', event);

        if (event.selected && event.toggledKey) {
          console.log("mostrando")
          this.showlevel1service.getOptionsBy(22, event.toggledKey)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
              this.level2Groups[event.toggledKey!] = data;
            });
        }

        if (event.selected === false && event.toggledKey) {
          delete this.level2Groups[event.toggledKey];
        }
      });

    // SUSCRIPCIÓN 2: estilos
    /*this.selectionService.style$
      .pipe(takeUntil(this.destroy$))
      .subscribe(style => {
        this.selectedColor = style.backgroundColor;
      });

this.selectionService.style$.subscribe(style => {
  
  if (style.backgroundColor !== undefined) {
    this.selectedBackgroundColor = style.backgroundColor;
  }

  if (style.borderColor !== undefined) {
    this.selectedBorderColor = style.borderColor;
  }

  if (style.borderWidth !== undefined) { 
    this.selectedBorderWidth = style.borderWidth;
  }

});


  }



 objectKeys(obj: any): string[] {
    return Object.keys(obj);
   }
  ngOnDestroy(): void {
    console.log("estoy en destroy")
       this.destroy$.next();
    this.destroy$.complete();
  }
  onItemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
*/

export class EstilosLevel2Component implements OnDestroy { 
 private destroy$ = new Subject<void>();
  level2Groups: {[key:string]:any[]}={};
    loading=false;
    private subscription!: Subscription;
   @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;

  constructor(private showlevel1service: Showlevel1Service,private dragdropservice: DragDropService, private selectionService:SelectionService) {}


  ngOnInit(): void { 
    this.subscription = this.selectionService.selectedKeys$ //escucha el observable
    .pipe(skip(1),
      takeUntil(this.destroy$)) //evitar primera carga al pasar de una pantalla a otra 
    
    .subscribe(event => {
      // si un item se seleccionó
      if (event.selected && event.toggledKey ) {
        this.showlevel1service.getOptionsBy(22, event.toggledKey)
         .pipe(takeUntil(this.destroy$))
  
        .subscribe(data => {
          this.level2Groups[event.toggledKey!] = data;
          //this.dragdropservice.setLevel2Groups(this.level2Groups);
        });
        console.log("evento ", event.toggledKey,event.front_parent)
      }


      
      // si un item se deseleccionó
      if (event.selected === false && event.toggledKey) {
        console.log("estoy borrando")
        delete this.level2Groups[event.toggledKey];
      }
    });

    this.dragdropservice.level2Groups$
      .pipe(takeUntil(this.destroy$))
    
    .subscribe(groups => {
      this.level2Groups = groups;
      console.log("level2groups",this.level2Groups)
      const ids = Object.keys(groups).map(key => `${key}-list`);
      this.dragdropservice.setDropListIds(ids);
      console.log("IDS ENVIADOS DESDE LEVEL2 setDropListIds", ids);
    });

   
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
    this.dragdropservice.setDropListIds(ids);
    console.log("Actualizando dropListIds: en options level2", ids);
  }

  //Devuelve un array con las claves (keys) de un objeto.
    objectKeys(obj: any): string[] {
    return Object.keys(obj);
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

    this.dragdropservice.moveItemBetweenLists(item, fromSelected, toSelected, event.currentIndex);
    console.log("borrar el item", item.key_name)
    //this.showlevel1service.deleteValue(item.key_name);
    this.showlevel1service.clearValue(item.key_name).subscribe();
  }
  ngOnDestroy(): void {
  this.dragdropservice.clearLevel2Groups();
  this.destroy$.next();
  this.destroy$.complete();
}

}