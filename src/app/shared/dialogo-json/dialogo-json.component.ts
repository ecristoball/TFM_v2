import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-json',
  templateUrl: './dialogo-json.component.html',
  styleUrl: './dialogo-json.component.css'
})
export class DialogoJsonComponent {
  jsonString: string;
  constructor(
      public dialogRef: MatDialogRef<DialogoJsonComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ){
    // Convertimos el objeto recibido a un JSON bonito con formato
    this.jsonString = JSON.stringify(data, null, 2);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  descargarFichero() {
    //Crea blob con el contenido JSON
    const blob = new Blob([this.jsonString], { type: 'application/json' });

    //enlace temporal
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    // Nombre del fichero
    a.href = url;
    a.download = 'data.json';

    //  click
    a.click();

    // Libera la URL creada
    window.URL.revokeObjectURL(url);
  }

}
