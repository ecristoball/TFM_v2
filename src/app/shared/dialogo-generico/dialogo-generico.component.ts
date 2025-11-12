import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-generico',
  templateUrl: './dialogo-generico.component.html',
  styleUrl: './dialogo-generico.component.css'
})
export class DialogoGenericoComponent {
   formValues: Record<string, any> = {};

  constructor(
    public dialogRef: MatDialogRef<DialogoGenericoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save() {
  const typedValues: Record<string, any> = {};

  // Recorremos los valores del formulario
  for (const key in this.formValues) {
    if (this.formValues.hasOwnProperty(key)) {
      let value = this.formValues[key];

      // Convertir a número si el tipo del campo es number
      const fieldConfig = this.data.fields.find((f: any) => f.key === key);
      if (fieldConfig?.type === 'number' && value !== null && value !== '') {
        value = Number(value); // aquí transformamos el string a número
      }

      typedValues[key] = value;
    }
  }

  this.dialogRef.close(typedValues);
}



  
  cancel() {
    this.dialogRef.close(null);
  }

}
