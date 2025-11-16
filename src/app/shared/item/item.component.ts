import { Component , Input} from '@angular/core';
import { SelectionService } from '../../services/selection.service';

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

  old_onCardClick() {
     if (this.item.frontlevel=="1"){
        this.isActive=!this.isActive;
        this.selectionService.selectItem(this.item.key_name);
      }
      console.log("el item en level front es ",this.item);
  }

  onCardClick() {
    if (this.item.frontlevel == "1" || this.item.frontlevel == "20") {
        this.isActive=!this.isActive;
      // alterna la selección: si ya estaba seleccionada, la deselecciona
      this.selectionService.toggleSelect(this.item.key_name);
    }
    else if(this.item.frontlevel == "21"){

    }
    console.log("el item en level front es ", this.item);
  }
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
