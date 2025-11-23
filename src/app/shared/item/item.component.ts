import { Component , Input} from '@angular/core';
import { SelectionService } from '../../services/selection.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item!: { key_name: string, frontlevel:string, value?:any};
  isActive=false;
  selectedBackgroundColor: string = '#000000';
  selectedBorderColor = '#000000';
  selectedBorderWidth = 1;

  constructor(private selectionService: SelectionService) {}
// item.component.ts (simplificado)
ngOnInit() {
  this.selectionService.selectedKeys$
    .subscribe(evt => {
      this.isActive = evt.selectedKeys.includes(this.item.key_name);
    });
}

onCardClick() {
  if (this.item.frontlevel !== '1' && this.item.frontlevel !== '20') return;

  if (this.isActive) {
    // si ya está activa pedimos confirmación y solo si acepta hacemos toggle
    if (!confirm('¿Seguro que quieres borrar todos los valores?')) {
      return;
    }
  }

  // No tocamos this.isActive manualmente: delegamos en el servicio
  this.selectionService.toggleSelect(this.item.key_name);
}


/*
  old_onCardClick() {
     if (this.item.frontlevel=="1"){
        this.isActive=!this.isActive;
        this.selectionService.selectItem(this.item.key_name);
      }
      console.log("el item en level front es ",this.item);
  }

  onCardClick() {
    
    if (this.item.frontlevel == "1" || this.item.frontlevel == "20") {
      if(this.isActive){
        console.log(this.isActive, "es activo")
        if (confirm('¿Seguro que quieres borrar todos los valores?')){
          this.isActive=!this.isActive;
          console.log(this.isActive, "es activo")
        // alterna la selección: si ya estaba seleccionada, la deselecciona
        //this.selectionService.toggleSelect(this.item.key_name);
        }
      }
      if(!this.isActive){
        console.log(this.isActive, "mo es activo")
          this.isActive=!this.isActive;
        // alterna la selección: si ya estaba seleccionada, la deselecciona
        this.selectionService.toggleSelect(this.item.key_name);
      }
     
    }
  console.log("el item en level front es ", this.item);  
  }*/

  onBackgroundChange() {
    console.log("onBackgroudnCahange")
    this.selectionService.updateStyle(this.item.key_name, { backgroundColor: this.selectedBackgroundColor });
  }
  onBorderColorChange(color: string) {
    this.selectionService.updateStyle(this.item.key_name, { borderColor: this.selectedBorderColor });
    console.log(color, "border")
  }

  onBorderWidthChange(width: number) {
    console.log("number")
   this.selectionService.updateStyle(this.item.key_name, {borderWidth: width + 'px' });
  }

}
