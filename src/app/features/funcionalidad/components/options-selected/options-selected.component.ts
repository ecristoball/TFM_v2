import { Component, Input } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { CrearJsonService } from '../../../../services/crear-json.service';
import { Showlevel1Service,JsonKey } from '../../../../services/showlevel1.service';
import { MostrarDialogoService } from '../../../../services/mostrar-dialogo.service';


@Component({
  selector: 'app-options-selected',
  templateUrl: './options-selected.component.html',
  styleUrls: ['./options-selected.component.css']
})




export class OptionsSelectedComponent {

  tojsonItems: any[] = [];
  jsonResult: any;

  constructor (private mostrarDialogoService: MostrarDialogoService, private showlevel1service: Showlevel1Service, private crearJsonService:CrearJsonService) {}


  
  /*tableData = [
    { L1: 'flowSetup', L2: 'options', L3: 'document', L4: 'extendedCoverage', Valor: 'valor1' },
    { L1: 'flowSetup', L2: 'options', L3: 'document', L4: 'captur', Valor: 'valor2' },
    { L1: 'flowSetup', L2: 'options', L3: 'document', L4: 'captures[]', L5:'scoreConfiguration',Valor: 'valor3' },
    { L1: 'flowSetup', L2: 'options', L3: 'document', L4: 'captures[]',L5:'scoreConfon', Valor: 'valor3' },
    {L1: 'flowSetup', L2: 'options', L3: 'document', L4: 'extendedCoverage', Valor: '' },
    {L1: 'flowSetup', L2: 'options', L3: 'document', L4: 'extendedCoverage', Valor: 'valor1' },
  ];*/

 
  @Input() connectedTo: string[] = [];
  selectedItems: any[] = [];
  copiedItem: any={};

  onItemDropped(event: CdkDragDrop<any[]>) {
    console.log("itemgrop")
      if (event.previousContainer !== event.container) {
        const item = event.previousContainer.data[event.previousIndex];

        // Clonamos el item para no modificar el original
        this.copiedItem = { ...item };
        item.locked = true;

        // Insertamos el clon en la lista destino
        event.container.data.splice(event.currentIndex, 0, this.copiedItem);
        console.log("Item copiado sin borrar el original:", this.copiedItem);
      }
      console.log ("drop")
      const itemType = event.item.data?.type || this.copiedItem.key_name;
      console.log("item es ", itemType)

      const dialog$ = this.mostrarDialogoService.openDialogForItem(itemType);
// para mostrar dialogos, no drag&drop
     if (dialog$) {
      dialog$.subscribe(result => {
        if (result) {
          console.log(`Resultado del diálogo (${itemType}):`, result);
        // guardar el valor en backend Laravel
        this.insertValue(itemType,result)
        }
     });
    }
  }

  insertValue(key:string,valor:any){
    console.log("insert",key,valor)
    this.showlevel1service.updateValue(key, valor).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err)
    });
  }



crearJson() {
  this.showlevel1service.getLevelsBy(2).subscribe(data => {
   this.tojsonItems = (data as any[]).map(item => ({
  ...item,
  value: this.parseValue(item.value)
}));
    console.log("datos de tabla", this.tojsonItems);
    this.jsonResult = this.crearJsonService.convertTableToJson(this.tojsonItems);
    console.log('JSON generado:', this.jsonResult);
  });
}

parseValue(value: any) {
  try {
    // Si es una cadena JSON, se convierte al tipo correcto
    return JSON.parse(value);
  } catch {
    // Si no lo es, se devuelve tal cual
    return value;
  }
}




onDrop(event: any) {
  console.log ("drop")
  const itemType = event.item.data?.type || 'scoresConfiguration';

  const dialog$ = this.mostrarDialogoService.openDialogForItem(itemType);

  if (dialog$) {
    dialog$.subscribe(result => {
      if (result) {
        console.log(`Resultado del diálogo (${itemType}):`, result);
        // aquí puedes guardar el valor en tu backend Laravel
      }
    });
  }
}

}
