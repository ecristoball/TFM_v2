import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonKey, Showlevel1Service } from '../../../../services/showlevel1.service';
import { Subscription } from 'rxjs';
import { SelectionService } from '../../../../services/selection.service';
import { CdkDragDrop,transferArrayItem,CdkDropList} from '@angular/cdk/drag-drop';
import { skip,takeUntil } from 'rxjs';
import { DragDropService } from '../../../../services/drag-drop.service';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';

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
    private destroy$ = new Subject<void>();

 @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;
  constructor(private showlevel1service: Showlevel1Service,private dragdropservice: DragDropService, private selectionService:SelectionService) {}

  ngOnInit(): void { 
    this.subscription = this.selectionService.selectedKeys$ //escucha el observable
    .pipe(skip(1),
    takeUntil(this.destroy$)) //evitar primera carga al pasar de una pantalla a otra 
    .subscribe(event => {
      // si un item se seleccionó
      if (event.selected && event.toggledKey && event.front_parent!="core") {
        this.showlevel1service.getOptionsBy(2, event.toggledKey)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.level2Groups[event.toggledKey!] = data;
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

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
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
 







  
