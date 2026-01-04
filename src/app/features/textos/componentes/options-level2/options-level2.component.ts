import { CdkDropList} from '@angular/cdk/drag-drop';
import { skip, Subscription } from 'rxjs';
import { ViewChildren, QueryList } from '@angular/core';
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
      if (event.selected && event.toggledKey) {
        //extrae de la bbdd los valores de nivel2 que tienen en front_parent el valor seleccionado
        this.showlevel1service.getOptionsBy(12, event.toggledKey).subscribe(data => {
          if (data.length===0){
            return;   
          }
          else { 
            this.level2Groups[event.toggledKey!] = data;
          }
         
        });
      }
      // si un item se deseleccionó
      if (event.selected === false && event.toggledKey) {
        delete this.level2Groups[event.toggledKey];
        this.showlevel1service.clearValue( event.toggledKey).subscribe();
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
