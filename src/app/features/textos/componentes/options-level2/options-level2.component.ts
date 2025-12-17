import { CdkDragDrop,transferArrayItem,CdkDropList} from '@angular/cdk/drag-drop';
import { skip, Subscription } from 'rxjs';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Showlevel1Service } from '../../../../services/showlevel1.service';
import { SelectionService } from '../../../../services/selection.service';


@Component({
  selector: 'app-options-level2',
  templateUrl: './options-level2.component.html',
  styleUrl: './options-level2.component.css'
})
export class OptionsLevel2Component implements OnInit, OnDestroy{
  //level2Items: any[] = [];
  level2Groups: {[key:string]:any[]}={};
  loading=false;
  private subscription!: Subscription;
 @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;
  constructor(private showlevel1service: Showlevel1Service, private selectionService:SelectionService) {}

  ngOnInit(): void { 
    this.subscription = this.selectionService.selectedKeys$ //escucha el observable
    .pipe(skip(1)) //evitar primera carga al pasar de una pantalla a otra 
    .subscribe(event => {
      // si un item se seleccionó
      if (event.selected && event.toggledKey && event.front_parent!="core") {
        console.log("mostrando")
        this.showlevel1service.getOptionsBy(12, event.toggledKey).subscribe(data => {
          this.level2Groups[event.toggledKey!] = data;
        });
        console.log("evento ", event.toggledKey,event.front_parent)
      }
      // si un item se deseleccionó
      if (event.selected === false && event.toggledKey) {
        console.log("estoy borrando")
        delete this.level2Groups[event.toggledKey];
      }
    });

  

   
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
