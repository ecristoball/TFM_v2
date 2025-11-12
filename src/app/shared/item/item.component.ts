import { Component , Input} from '@angular/core';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item!: { key_name: string, frontlevel:string};
  isActive=false;

  constructor(private selectionService: SelectionService) {}

  onCardClick() {
     if (this.item.frontlevel=="1"){
        this.isActive=!this.isActive;
        this.selectionService.selectItem(this.item.key_name);
      }
      console.log("el item en level front es ",this.item);
  }
}
