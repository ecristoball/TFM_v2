import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectionService } from '../../../../services/selection.service';
import { skip, Subscription } from 'rxjs';
//import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Showlevel1Service } from '../../../../services/showlevel1.service';
import { CrearJsonService } from '../../../../services/crear-json.service';
import { MostrarDialogoService } from '../../../../services/mostrar-dialogo.service';
import { DialogoJsonComponent } from '../../../../shared/dialogo-json/dialogo-json.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-options-selected',
  templateUrl: './options-selected.component.html',
  styleUrl: './options-selected.component.css'
})
export class OptionsSelectedComponent {

  private subscription!: Subscription;
  mostrarTextoVacio = false;
  valorTexto = '';
  textoPorDefecto='';
 imagenUrl: string = '';
  tojsonItems: any[] = [];
  jsonResult: any;
  selectedKey: string | null = null;

  constructor( private dialog: MatDialog , private showlevel1service: Showlevel1Service, 
      private crearJsonService:CrearJsonService, private selectionService:SelectionService) {}
  
  ngOnInit(): void { 
    this.subscription = this.selectionService.selectedKeys$ //escucha el observable
      .pipe(skip(1)) //evitar primera carga al pasar de una pantalla a otra 
      .subscribe(event => {
        // si un item se seleccionó
        //if (event.selected && event.toggledKey && event.front_parent!="core") {
        // el elemento que se acaba de tocar
        if (event.toggledKey && event.selected) {
          this.selectedKey = event.toggledKey; // guarda la key
         console.log("mostrando0", this.mostrarTextoVacio)
          console.log('Elemento clicado:', event.toggledKey);

        // si fue selección o deselección
        console.log('¿Seleccionado?', event.selected);

        // lista completa actual
        console.log('Todos los seleccionados:', event.selectedKeys);

        // quién emitió el evento
        console.log('Origen:', event.front_parent);  
          console.log("mostrando", this.mostrarTextoVacio)
        this.showlevel1service.getDefaultValue(event.toggledKey).subscribe(data => {
          this.valorTexto= data;
          if (Array.isArray(data) && data[0]!== null) {
             this.mostrarTextoVacio = true;
             console.log("es null",data)
          }
          else{
            this.mostrarTextoVacio = false;
          }
          this.textoPorDefecto=data;
          console.log("mostrando2", this.mostrarTextoVacio,data)
          console.log("valor por defecto", this.valorTexto)
        });
        this.showlevel1service.getImageUrl(event.toggledKey).subscribe(data => {
         this.imagenUrl = data.imagenUrl;
        });
        console.log("evento ", event.toggledKey,event.front_parent)
        if (event.toggledKey ) {
          this.mostrarTextoVacio = true;
        } else {
          this.mostrarTextoVacio = false;
          this.valorTexto = '';
        }
      //}
      // si un item se deseleccionó
      /*
      if (event.selected === false && event.toggledKey) {
        console.log("estoy borrando")
        delete this.level2Groups[event.toggledKey];
      }*/
        }
        else  {
          this.mostrarTextoVacio = false;
          this.valorTexto = '';
          this.textoPorDefecto ='';
          this.selectedKey = null;
          this.imagenUrl = '';
          return;
        }
       
    });
console.log(this.imagenUrl, "la imagen")
  }
  
  insertValue() {
    if (!this.selectedKey) {
      console.warn('No hay key seleccionada');
      return;
    }
    console.log('Insertando:', this.selectedKey, this.textoPorDefecto);

    this.showlevel1service.updateValue(
      this.selectedKey,
      JSON.parse(this.textoPorDefecto)
      ).subscribe({
        next: (res) => console.log('Guardado OK', res),
        error: (err) => console.error('Error guardando', err)
    });
  }


  crearJson() {
    this.showlevel1service.getLevelsBy().subscribe(data => {
    this.tojsonItems = (data as any[]).map(item => ({
    ...item,
    value: this.parseValue(item.value)
      })
    );
      console.log("datos de tabla", this.tojsonItems);
      this.jsonResult = this.crearJsonService.convertTableToJson(this.tojsonItems);
      console.log('JSON generado:', this.jsonResult);

      // 1VALIDACIÓN: comprobar los campos requeridos
      const itemsInvalidos = this.tojsonItems.filter(item =>
        item.required === 1 && (item.value === null || item.value === '' || item.value === undefined)
      );

      if (itemsInvalidos.length > 0) {
      const lista = itemsInvalidos.map(i => i.level1 || i.key_name).join(", ");
    alert("Faltan valores obligatorios para: " + lista);
    return;
      }

      //const jsonData = this.generarJson(); // Aquí generas tu objeto JSON
      this.dialog.open(DialogoJsonComponent, {
        width: '600px',
        data: this.jsonResult
      });
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
  onDelete(){
    if (confirm('Esta acción borrará todos los datos almacenados hasta ahora. ¿Seguro que quieres borrar todos los valores?')){
      this.showlevel1service.deleteAllValues().subscribe({
        next: (res) => {
          console.log('Valores eliminados correctamente:', res);
          //this.tojsonItems = [];
          //this.jsonResult = null;
        },
        error: (err) => console.error('Error al eliminar valores:', err)
      });
    }
  }
  onCancel(){
    // Oculta toda la parte editable
   const selectedKeys = this.selectionService.selectedKeysSource.value.selectedKeys;

  if (selectedKeys.length > 0) {
    const key = selectedKeys[selectedKeys.length - 1];
    console.log("laa key es",key)
    this.selectionService.toggleSelect(key); // 
  }

  this.mostrarTextoVacio = false;

  // Limpia estado interno
  this.valorTexto = '';
  this.textoPorDefecto = '';
  this.imagenUrl = '';
  console.log(this.imagenUrl, "la imagen")
  this.selectedKey = null;

  }

}

