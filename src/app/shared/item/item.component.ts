import { Component , Input} from '@angular/core';
import { SelectionService } from '../../services/selection.service';
import { takeUntil,Subject} from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item!: { 
    key_name: string,
    frontlevel:string, 
    value?:any
  };

  isActive=false;
  selectedBackgroundColor: string = '#000000';
  selectedBorderColor = '#000000';
  selectedBorderWidth = 1;
  private destroy$ = new Subject<void>();
  
  constructor(private selectionService: SelectionService) {}
  
  ngOnInit() {
    
  
    this.selectionService.selectedKeys$
    .pipe(takeUntil(this.destroy$))
    .subscribe(evt => {
      this.isActive = evt.selectedKeys.includes(this.item.key_name);
       //Cada vez que se actualiza la lista de ítems seleccionados (selectedKeys$), actualiza isActive según si este ítem está incluido
    });
      console.log("ITEM RECIBIDO:", this.item, this.item.value,"active", this.isActive);
  }



  onCardClick() {
    if (this.item.frontlevel !== '1' && this.item.frontlevel !== '11' && this.item.frontlevel !== '12' && this.item.frontlevel !== '21') return;

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
  ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
  }*/


  //ESTILOS
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






