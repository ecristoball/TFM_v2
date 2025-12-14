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
    console.log("data inyectado",this.data)
    if (this.data.type === 'object') {
      console.log("iterable")
      this.formValues = {};
      this.data.fields.forEach((f: any) => {
        this.formValues[f.key] = ''; // valores iniciales
      });
      return; // NO seguir procesando los demás tipos
    }
    //tipos con dapos por default
    if (this.data.type === 'info-confirm'){
        console.log("veo valores por defecto",this.data.defaultValues)
   // 🔹 USAMOS EL VALOR POR DEFECTO
      this.formValues = this.data.defaultValues;
      return; // NO seguir procesando los demás tipos
    }
    // Para el resto de tipos
    for (const field of this.data.fields) {
      if (field.type === 'multiselect') {
        this.formValues[field.key] = {};
        console.log("valor1")
      }  
      else if (field.type === 'radio-with-text') {
      this.formValues[field.key] = { selectedOption: '', otherText: '' };
      }
      else if (field.defaultValues !== undefined){
        console.log("veo valores por defecto",field.defaultValues)
   // 🔹 USAMOS EL VALOR POR DEFECTO
      this.formValues[field.key] = field.defaultValues;
      }
      else {
        this.formValues[field.key] = '';
        console.log(this.formValues, "salida default");
      }
    }
  }

  private isFormValid(): boolean {
    for (const key in this.formValues) {
      const value = this.formValues[key];
      console.log("value:",value);

      // Validación para campos simples
      if (value === null || value === undefined || value === '') {
        return false;
      }
      // Validación number con min/max dinámicos
      if (this.data.type === 'number') {
        const num = Number(value);
        if (num < this.data.this.datamin || num > this.data.max) {
          alert(`El valor debe estar entre ${this.data.min} y ${this.data.max}`);
          return false;
        }
      }
      // Validación para radio-with-text
      const fieldConfig = this.data.fields.find((f: any) => f.key === key);
      if (fieldConfig?.type === 'radio-with-text') {
        if (!value.selectedOption) {
          return false; // no ha seleccionado ninguna opción
        }
        if (value.selectedOption === 'other' && !value.otherText?.trim()) {
          return false; // seleccionó "other" pero no escribió texto
        }
        continue; // ya validamos este campo
      }

      // Validación para multiselect
      if (this.data.type === 'object') {
        const hasAtLeastOne = Object.values(this.formValues).some(v => v !== null && v !== undefined && v !== '');
        if (!hasAtLeastOne) return false;
        break; // ya validamos el objeto, no seguimos con cada propiedad
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
      console.log("ob",this.data, this.data.type)
      if (this.formValues.hasOwnProperty(key)) {
        let value = this.formValues[key];

        // Convertir a número si el tipo del campo es number
        const fieldConfig = this.data.fields.find((f: any) => f.key === key);
        console.log("ob", this.data.type, fieldConfig)
        if (fieldConfig?.type === 'number' && value !== null && value !== '') {
          value = Number(value); // aquí transformamos el string a número
        }
        if (fieldConfig?.type === 'multiselect') {
              value = Object.keys(value).filter(k => value[k] === true);
        }
        if (this.data.type === 'object') {
            this.dialogRef.close({ ...this.formValues });
            return;
        }
       if (fieldConfig?.type === 'array' && typeof value === 'string' && value.includes(',')) {
          console.log("estoy en conversion")
        // Convertimos la cadena separada por comas en un array
        value = value.split(',').map((v: string) => v.trim()).filter((v: string) => v !== '');
        }
        if (fieldConfig?.type === 'radio-with-text') {
          const choice = this.formValues[fieldConfig?.key];
          if (choice.selectedOption === 'other') {
            typedValues[fieldConfig?.key] = choice.otherText;
          } else {
            typedValues[fieldConfig?.key] = choice.selectedOption;
          }
        }
        typedValues[key] = value;

      }
    }
    this.dialogRef.close(typedValues);
  }
  
  cancel() {
    console.log("cancelado")
    this.dialogRef.close(null);
  }

}
