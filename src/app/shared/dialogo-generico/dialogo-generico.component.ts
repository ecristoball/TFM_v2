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

  ngOnInit() {
    if (this.data.type === 'object') {
      this.formValues = {};

      this.data.fields.forEach((f: any) => {
        this.formValues[f.key] = ''; // valores iniciales
      });

      return; // NO seguir procesando los demás tipos
    }

    // Para el resto de tipos
    for (const field of this.data.fields) {
      if (field.type === 'multiselect') {
        this.formValues[field.key] = {};
      } else {
        this.formValues[field.key] = '';
      }
    }
  }
  private isFormValid(): boolean {
    for (const key in this.formValues) {
      const value = this.formValues[key];

      // Validación para campos simples
      if (value === null || value === undefined || value === '') {
        return false;
      }

      // Validación para multiselect
      if (typeof value === 'object' && this.data.type !== 'object') {
        const selected = Object.values(value).some(v => v === true);
        if (!selected) return false;
      }
    }
    return true;
  }

  save() {
      // Si no pasa validación → alerta y no cerrar
    if (!this.isFormValid()) {
      alert('Por favor completa todos los campos antes de continuar.');
      return;
    }

    const typedValues: Record<string, any> = {};

    // Recorremos los valores del formulario
    for (const key in this.formValues) {
      console.log("ob", this.data.type)
      if (this.formValues.hasOwnProperty(key)) {
        let value = this.formValues[key];

        // Convertir a número si el tipo del campo es number
        const fieldConfig = this.data.fields.find((f: any) => f.key === key);

        if (fieldConfig?.type === 'number' && value !== null && value !== '') {
          value = Number(value); // aquí transformamos el string a número
        }
        if (fieldConfig?.type === 'multiselect'|| fieldConfig?.type ==='text') {
              value = Object.keys(value).filter(k => value[k] === true);
        }
        if (this.data.type === 'object') {
            this.dialogRef.close({ ...this.formValues });
            return;
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
