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
      }

      // si un item se deseleccionó
      if (event.selected === false && event.toggledKey) {
        delete this.level2Groups[event.toggledKey];
      }
    });

    this.dragdropservice.level2Groups$
    .pipe(takeUntil(this.destroy$))
    .subscribe(groups => {
      this.level2Groups = groups;
      const ids = Object.keys(groups).map(key => `${key}-list`);
      this.dragdropservice.setDropListIds(ids);
    });
  
  }
 
  ngAfterViewInit() {
    this.updateDropListIds();
    this.dropLists.changes.subscribe(() => {
      this.updateDropListIds();
    });
  }

  private updateDropListIds() {
    const ids = this.dropLists.map(list => list.id);
    this.dragdropservice.setDropListIds(ids);
  }

  //Devuelve un array con las claves (keys) de un objeto.
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  //drop en options-level2, cuando vuelve de selected
  onItemDropped(event: CdkDragDrop<any[]>) {
    const item = event.previousContainer.data[event.previousIndex];
    const fromSelected = event.previousContainer.id === 'selected-list';
    const toSelected = event.container.id === 'selected-list';
    this.dragdropservice.moveItemBetweenLists(item, fromSelected, toSelected, event.currentIndex);
    this.showlevel1service.clearValue(item.key_name).subscribe();
  }

  ngOnDestroy(): void {
    this.dragdropservice.clearLevel2Groups();
    this.destroy$.next();
    this.destroy$.complete();
  }

}