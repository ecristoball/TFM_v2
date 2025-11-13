import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoGenericoComponent } from '../shared/dialogo-generico/dialogo-generico.component';
import { __values } from 'tslib';

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
       label: 'Tipo',
       type: 'text',
       key:'text'
    
    }]
  });
 private arrayField = (key:string)=>({
    title: key,
    fields: [{
       label: 'Tipo',
       type: 'array',
       key:'value'
    
    }]
  });
   private objectField = (key:string)=>({
    title: key,
    fields: [{
       label: 'Tipo',
       type: 'text',
       key:'text'
    
    }]
  });

  /**  Mapa de configuraciones */
  private dialogConfig: Record<string, any> = {
    // Ejemplo con select
    serviceMode: this.selectField('serviceMode', ['validation', 'ocr']),
    deviceRotatedOnOrientation:this.selectField('deviceRotatedOnOrientation',['landscape','portrait','none']),
    selectCamera:this.selectField('selectCamera',['front','back']),
    liveness:this.selectField('liveness',['passive','active']),
    authority:this.selectField('authority',['fnmt','izenpe','standard']),

    // Ejemplo con number
    minimumAcceptableAge: this.numberField('minimumAcceptableAge'),
    maximumAcceptableTimeSinceExpiration: this.numberField('maximumAcceptableTimeSinceExpiration'),
    manualCaptureDelay: this.numberField('manualCaptureDelay'),
    detectionTimeout: this.numberField('detectionTimeout'),
    challengeLength: this.numberField('challengeLength'),

    // Ejemplo con boolean
    extendedCoverage: this.booleanField('extendedCoverage'),
    geolocation: this.booleanField('geolocation'),
    manualCaptureShow: this.booleanField('manualCaptureShow'),
    instructionsShow: this.booleanField('instructionsShow'),
    reviewShow: this.booleanField('reviewShow'),
    videoDocComparison:this.booleanField('videoDocComparison'),
    requiredTermsAndConditions:this.booleanField('requiredTermsAndConditions'),
    required:this.booleanField('required'),
    
    //ejemplo con string
    defaultCountry:this.textField('defaultCountry'),
    title:this.textField('title'),
    name:this.textField('name'),
    email:this.textField('email'),
    applicationCode:this.textField('applicationCode'),
    
      //ejemplo de array

    documentTypes: this.arrayField('documentTypes'),
    countryFilter: this.arrayField('countryFilter'),
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
