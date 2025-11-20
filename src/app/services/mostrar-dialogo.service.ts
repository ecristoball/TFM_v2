import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoGenericoComponent } from '../shared/dialogo-generico/dialogo-generico.component';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class MostrarDialogoService {
  constructor(private dialog: MatDialog) {}

  /**  Helpers para generar tipos de configuración */
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

  private radioField = (key: string, options: string[],defaultValue?: string) => ({
    title: key,
    fields: [{
      label: 'Tipo',
      type: 'radio',
      key: 'type',
      options: options.map(o => ({ label: o, value: o })),
      defaultValue
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
/*
private objectField = (key: string, fields: string[]) => ({
  title: key,
  type: 'object',
  properties: fields.map(f => ({
    label: f,
    type: 'text',
    key: f
  }))
});


private objectField = (key: string, fields: string[]) => ({
  key,
  type: 'object',
  children: fields.map(f => ({
    key: f,
    type: 'text',
    label: f,
  }))
});*/

private objectField = (title: string, fields: string[]) => ({
  title,
  type: 'object',
  fields: fields.map(f => ({
    label: f,
    key: f,
    type: 'text'
  }))
});


  private multiSelectField = (key: string, options: string[]) => ({
  title: key,
  fields: [{
    label: 'Seleccionar',
    type: 'multiselect',
    key: 'values',
    options
  }]
});

  /**  Mapa de configuraciones. Ir añadiendo configuracions aquí para mostrar en selected*/
  private dialogConfig: Record<string, any> = {
    // Ejemplo con select
    serviceMode: this.radioField('serviceMode', ['validation', 'ocr']),
    deviceRotatedOnOrientation:this.radioField('deviceRotatedOnOrientation',['landscape','portrait','none']),
    selectCamera:this.radioField('selectCamera',['front','back']),
    liveness:this.radioField('liveness',['passive','active']),
    authority:this.radioField('authority',['fnmt','izenpe','standard']),

    // seleccion
    operationMode: this.radioField('operationMode', ['idv'], 'idv'),
    language: this.radioField('language', ['es', 'en', ''],''),
    platform: this.radioField('platform', ['web']),
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
    confirmProcess:this.booleanField('confirmProcess'),
    
    //ejemplo con string
    defaultCountry:this.textField('defaultCountry'),
    title:this.textField('title'),
    name:this.textField('name'),
    email:this.textField('email'),
    applicationCode:this.textField('applicationCode'),
    
      //ejemplo de array

    //documentTypes: this.arrayField('documentTypes'),
    countryFilter: this.arrayField('countryFilter'),


    pauseAfterStage:this.multiSelectField('pauseAfterStage',['document','selfie','video']),
    documentTypes:this.multiSelectField('documentTypes',['selectedByUser','IDCard','ResidencePermit',
      'DrivingLicense','IDCard-PO','DCard-MilitaryRS','DCard-MilitaryRT',
      'DCard-MilitaryRR','HealthCard','ProfessionalCard','Passport'
    ]),
    documentKindFilter:this.multiSelectField('documentKindFilter',['IDCard','DrivingLicense','HealthCard',
      'ProfessionalCard','Passport','XX_XX_XXXX','AnyCard'
    ]),

    //contextualData: this.objectField('contextualData', ['user_id', 'user_data']),
    //contextualData: this.objectField('contextualData', ['user_id', 'user_data'])
    contextualData: this.objectField('Contextual Data', ['user_id', 'user_data'])

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
      data: config,
      disableClose: true  // bloqueo del cierre por click fuera o ESC
    });

    return dialogRef.afterClosed();
  }
}
