import { Component } from '@angular/core';
import { Showlevel1Service } from '../../../../services/showlevel1.service';
import { Subscription } from 'rxjs';
import { SelectionService } from '../../../../services/selection.service';
import { CdkDragDrop,transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject, takeUntil, skip } from 'rxjs';

@Component({
  selector: 'app-estilos-level2',
  templateUrl: './estilos-level2.component.html',
  styleUrl: './estilos-level2.component.css'
})
export class EstilosLevel2Component {
  private destroy$ = new Subject<void>(); 
  selectedBackgroundColor: string = '#000000';
  selectedBorderColor: string = '#000000';
  selectedBorderWidth='0px';
  level2Groups: {[key:string]:any[]}={};
  loading=false;
  private subscription!: Subscription;

  constructor(private showlevel1service: Showlevel1Service, private selectionService:SelectionService) {}


  ngOnInit(): void { 

    this.selectionService.selectedKeys$
    .pipe(
      skip(1),        // ignora el valor almacenado
      takeUntil(this.destroy$)
    )
      .subscribe(event => {

        if (event.selected && event.toggledKey) {
          this.showlevel1service.getOptionsBy(21, event.toggledKey)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
              this.level2Groups[event.toggledKey!] = data;
            });
        }

        if (event.selected === false && event.toggledKey) {
          delete this.level2Groups[event.toggledKey];
        }
      });

    // 🔵 SUSCRIPCIÓN 2: estilos
    /*this.selectionService.style$
      .pipe(takeUntil(this.destroy$))
      .subscribe(style => {
        this.selectedColor = style.backgroundColor;
      });*/

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
