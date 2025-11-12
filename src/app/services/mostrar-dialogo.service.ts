import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoGenericoComponent } from '../shared/dialogo-generico/dialogo-generico.component';

@Injectable({
  providedIn: 'root'
})
export class MostrarDialogoService {
  constructor(private dialog: MatDialog) {}

  /** 🔧 Helpers para generar tipos de configuración */
  private numberField = (key: string) => ({
    title: key,
    fields: [{ label: '', type: 'number', key: 'max' }]
  });

  private booleanField = (key: string) => ({
    title: key,
    fields: [{
      label: 'Tipo',
      type: 'boolean',
      key: 'active',
      options: [
        { label: 'True', value: true },
        { label: 'False', value: false }
      ]
    }]
  });

  private selectField = (key: string, options: string[]) => ({
    title: key,
    fields: [{
      label: 'Tipo',
      type: 'select',
      key: 'type',
      options
    }]
  });
  private textField = (key:string)=>({
    title: key,
    fields: [{
       
    type: 'text',
    
    }]
  });


  /**  Mapa de configuraciones */
  private dialogConfig: Record<string, any> = {
    // Ejemplo con select
    serviceMode: this.selectField('serviceMode', ['validation', 'ocr']),
    deviceRotatedOnOrientation:this.selectField('deviceRotatedOnOrientation',['landscape','portrait','none']),
    selectCamera:this.selectField('selectCamera',['front','back']),

    // Ejemplo con number
    minimumAcceptableAge: this.numberField('minimumAcceptableAge'),
    maximumAcceptableTimeSinceExpiration: this.numberField('maximumAcceptableTimeSinceExpiration'),
    manualCaptureDelay: this.numberField('manualCaptureDelay'),
    detectionTimeout: this.numberField('detectionTimeout'),

    // Ejemplo con boolean
    extendedCoverage: this.booleanField('extendedCoverage'),
    geolocation: this.booleanField('geolocation'),
    manualCaptureShow: this.booleanField('manualCaptureShow'),
    instructionsShow: this.booleanField('instructionsShow'),
    reviewShow: this.booleanField('reviewShow'),
    defaultCountry:this.textField('defaultCountry'),
  };

  /** 🪟 Abre el diálogo según el tipo */
  openDialogForItem(itemType: string) {
    const config = this.dialogConfig[itemType];

    if (!config) {
      console.warn(`No hay configuración para el tipo: ${itemType}`);
      return null;
    }

    const dialogRef = this.dialog.open(DialogoGenericoComponent, {
      width: '500px',
      data: config
    });

    return dialogRef.afterClosed();
  }
}
