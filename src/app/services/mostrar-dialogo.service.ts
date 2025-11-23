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
  private numberField = (key: string, min?: number,max?: number,step: number = 1) => ({
    title: key,
    fields: [{ label: '', type: 'number', key: 'max' , min, max, step}]
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

private radioWithTextField = (key: string, radioLabel: string, textLabel: string) => ({
  title: key,
  fields: [
    {
      label: radioLabel,
      type: 'radio-with-text', // tipo nuevo que identificará tu HTML
      key: 'choice',
      options: [
        { label: radioLabel, value: 'radio' },  // opción predefinida
        { label: textLabel, value: 'other' }    // opción con input libre
      ]
    }
  ]
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
    minimumAcceptableAge: this.numberField('minimumAcceptableAge',1,100),
    maximumAcceptableTimeSinceExpiration: this.numberField('maximumAcceptableTimeSinceExpiration'),
    manualCaptureDelay: this.numberField('manualCaptureDelay'),
    doc_detectionTimeout: this.numberField('doc_detectionTimeout'),
    challengeLength: this.numberField('challengeLength'),
    selfie_detectionTimeout: this.numberField('selfie_detectionTimeout'),

    // Ejemplo con boolean
    extendedCoverage: this.booleanField('extendedCoverage'),
    geolocation: this.booleanField('geolocation'),
    manualCaptureShow: this.booleanField('manualCaptureShow'),
    doc_instructionsShow: this.booleanField('doc_instructionsShow'),
    selfie_instructionsShow: this.booleanField('selfie_instructionsShow'),
    ivideo_nstructionsShow: this.booleanField('video_instructionsShow'),
    reviewShow: this.booleanField('reviewShow'),
    videoDocComparison:this.booleanField('videoDocComparison'),
    requiredTermsAndConditions:this.booleanField('requiredTermsAndConditions'),
    required:this.booleanField('required'),
    confirmProcess:this.booleanField('confirmProcess'),
    requireTermsAndConditions:this.booleanField('requireTermsAndConditions'),
    
    //ejemplo con string
    defaultCountry:this.textField('defaultCountry'),
    title:this.textField('title'),
    libraryDocumentIds:this.textField('libraryDocumentIds'),
    email:this.textField('email'),
    applicationCode:this.textField('applicationCode'),
    signers_name:this.textField('signers_name'),
    
      //ejemplo de array

    
    countryFilter: this.arrayField('countryFilter'),
    documentTypes: this.arrayField('documentTypes'),


    //documentTypes: this.radioWithTextField('documentTypes','SelectedByUser', 'otros'),

    pauseAfterStage:this.multiSelectField('pauseAfterStage',['document','selfie','video']),
    /*documentTypes:this.multiSelectField('documentTypes',['selectedByUser','IDCard','ResidencePermit',
      'DrivingLicense','IDCard-PO','DCard-MilitaryRS','DCard-MilitaryRT',
      'DCard-MilitaryRR','HealthCard','ProfessionalCard','Passport']),*/
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
    console.log ("config",config)

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
