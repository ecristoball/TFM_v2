import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonKey, Showlevel1Service } from '../../../../services/showlevel1.service';
import { Subscription } from 'rxjs';
import { SelectionService } from '../../../../services/selection.service';
import { CdkDragDrop,transferArrayItem } from '@angular/cdk/drag-drop';
import { skip } from 'rxjs';

@Component({
  selector: 'app-options-level2',
  templateUrl: './options-level2.component.html',
  styleUrl: './options-level2.component.css'
})
export class OptionsLevel2Component implements OnInit, OnDestroy {
  //level2Items: any[] = [];

  level2Groups: {[key:string]:any[]}={};
  loading=false;
  private subscription!: Subscription;

  constructor(private showlevel1service: Showlevel1Service, private selectionService:SelectionService) {}

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


       
  }
   objectKeys(obj: any): string[] {
    return Object.keys(obj);
   }
  ngOnDestroy(): void {
     this.subscription.unsubscribe();
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
   level2DocumentItems=[
    {id:1, name:'Con Selector'},
    {id:2, name:'Sin Selector'},
    {id:3, name:'País'},
    {id:4, name:'Datos Contextuales'},
    {id:5, name:'Documento'},
    {id:6, name:'Selfie Pasivo'},
    {id:7, name:'Selfie Activo'},
    {id:8, name:'Video'},
    {id:9, name:'QR'},
    {id:10, name:'Sellado de tiempo'},
    {id:11, name:'Servicio del Ministerio'},
    {id:12, name:'Peps & Sanctions'},
    {id:13, name:'eSign'}
  ]*/






  
