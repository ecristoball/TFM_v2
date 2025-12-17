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

private infoConfirmField = (key: string, defaultValues: any) => ({
  title:key,
  fields: [{
    type: 'info-confirm',
    defaultValues,
    key:defaultValues
    
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
    doc_selectCamera:this.radioField('doc_selectCamera',['front','back']),
    selfie_selectCamera:this.radioField('selfie_selectCamera',['front','back']),
    video_selectCamera:this.radioField('video_selectCamera',['front','back']),
    liveness:this.radioField('liveness',['passive','active']),
    authority:this.radioField('authority',['fnmt','izenpe','standard']),

    // seleccion
    operationMode: this.radioField('operationMode', ['idv'], 'idv'),
    language: this.radioField('language', ['es', 'en']),
    platform: this.radioField('platform', ['web'],'web'),
    services: this.radioField('services', ['AAMVA', 'RENIEC', 'ReceitaFederal','ESMinistry']),
    types: this.radioField('types', ['pep', 'pep-class-1', 'pep-class-2', 'pep-class-3', 'pep-class-4', 'sanction', 'warning', 'adverse-media-v2-property', 'adverse-media-v2-financial-aml-cft', 'adverse-media-v2-fraud-linked', 'adverse-media-v2-narcotics-aml-cft', 'adverse-media-v2-violence-aml-cft', 'adverse-media-v2-terrorism', 'adverse-media-v2-cybercrime', 'adverse-media-v2-general-aml-cft', 'adverse-media-v2-regulatory', 'adverse-media-v2-financial-difficulty', 'adverse-media-v2-violence-non-aml-cft', 'adverse-media-v2-other-financial', 'adverse-media-v2-other-serious', 'adverse-media-v2-other-minor'],'web'),

    
    // Ejemplo con number
    minimumAcceptableAge: this.numberField('minimumAcceptableAge',1,100),
    maximumAcceptableTimeSinceExpiration: this.numberField('maximumAcceptableTimeSinceExpiration'),
    manualCaptureDelay: this.numberField('manualCaptureDelay'),
    doc_detectionTimeout: this.numberField('doc_detectionTimeout'),
    video_detectionTimeout: this.numberField('video_detectionTimeout'),
    challengeLength: this.numberField('challengeLength'),
    selfie_detectionTimeout: this.numberField('selfie_detectionTimeout'),

    // Ejemplo con boolean
    extendedCoverage: this.booleanField('extendedCoverage'),
    geolocation: this.booleanField('geolocation'),
    manualCaptureShow: this.booleanField('manualCaptureShow'),
    doc_instructionsShow: this.booleanField('doc_instructionsShow'),
    selfie_instructionsShow: this.booleanField('selfie_instructionsShow'),
    video_instructionsShow: this.booleanField('video_instructionsShow'),
    doc_reviewShow: this.booleanField('doc_reviewShow'),
    selfie_reviewShow: this.booleanField('selfie_reviewShow'),
    videoDocComparison:this.booleanField('videoDocComparison'),
    requiredTermsAndConditions:this.booleanField('requiredTermsAndConditions'),
    required:this.booleanField('required'),
    confirmProcess:this.booleanField('confirmProcess'),
    requireTermsAndConditions:this.booleanField('requireTermsAndConditions'),
    modal_show:this.booleanField('modal_show'),  
    continue_desktop:this.booleanField('continue_desktop'),  
    logo_Show:this.booleanField('logo_Show'),  
    success_Show:this.booleanField('success_Show'),  
    errorModal_Show:this.booleanField('errorModal_Show'),  
    captureHeading_Show:this.booleanField('captureHeading_Show'),  
    helpModal_Show:this.booleanField('helpModal_Show'),  
    closeButton_Show:this.booleanField('closeButton_Show'),

    //ejemplo con string
    defaultCountry:this.textField('defaultCountry'),
    title:this.textField('title'),
    libraryDocumentIds:this.textField('libraryDocumentIds'),
    email:this.textField('email'),
    applicationCode:this.textField('applicationCode'),
    signers_name:this.textField('signers_name'),
    signers_email:this.textField('signers_email'),
    redirectionUrl:this.textField('redirectionUrl'),
     
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
    contextualData: this.objectField('Contextual Data', ['user_id', 'user_data']),

    antispoofing: this.infoConfirmField('Se aplicarán las siguientes palancas:',
      {
        "ScoreGroup-PrintAttackTest": 1,
        "ScoreGroup-ReplayAttackTest": 1,
        "ScoreGroup-PhotoAuthenticity": 1
      }
    ),
    cumplimiento_CCN: this.infoConfirmField('Se aplciarán las siguietnes palancas',
      {
        "ScoreRel-PD_BirthDate_FrontNoFlash-PD_BirthDate_MRZ-Text": 1,
        "ScoreRel-DD_ExpirationDate_FrontNoFlash-DD_ExpirationDate_MRZ-Text": 1,
        "ScoreRel-PD_IdentificationNumber_FrontNoFlash-PD_IdentificationNumber_MRZ-Text": 1,
        "ScoreGroup-SD_MRZ-MRZDecoding": 1,
        "ScoreGroup-PrintAttackTest": 1,
        "ScoreGroup-ReplayAttackTest": 1,
        "ScoreGroup-PhotoAuthenticity": 1
      }
    )

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
