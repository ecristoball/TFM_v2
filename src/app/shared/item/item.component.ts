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

  constructor(private selectionService: SelectionService) {}

  old_onCardClick() {
     if (this.item.frontlevel=="1"){
        this.isActive=!this.isActive;
        this.selectionService.selectItem(this.item.key_name);
      }
      console.log("el item en level front es ",this.item);
  }

  onCardClick() {
    if (this.item.frontlevel == "1") {
        this.isActive=!this.isActive;
      // alterna la selección: si ya estaba seleccionada, la deselecciona
      this.selectionService.toggleSelect(this.item.key_name);
    }
    console.log("el item en level front es ", this.item);
  }
}
