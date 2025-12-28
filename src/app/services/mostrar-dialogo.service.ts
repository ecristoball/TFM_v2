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

private colorField = (key: string, defaultColor: string = '#000000') => ({
  title: key,
  fields: [{
    label: 'Selecciona un color',
    type: 'color',
    key: 'color',
    defaultValue: defaultColor
  }]
});


  /****************  Mapa de configuraciones. ************/
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
    //header_borderColor: this.radioField('header_borderColor', ['idv'], 'idv'),
    operationMode: this.radioField('operationMode', ['idv'], 'idv'),
    language: this.radioField('language', ['es', 'en']),
    platform: this.radioField('platform', ['web'],'web'),
    services: this.radioField('services', ['AAMVA', 'RENIEC', 'ReceitaFederal','ESMinistry']),
    types: this.radioField('types', ['pep', 'pep-class-1', 'pep-class-2', 'pep-class-3', 'pep-class-4', 'sanction', 'warning', 'adverse-media-v2-property', 'adverse-media-v2-financial-aml-cft', 'adverse-media-v2-fraud-linked', 'adverse-media-v2-narcotics-aml-cft', 'adverse-media-v2-violence-aml-cft', 'adverse-media-v2-terrorism', 'adverse-media-v2-cybercrime', 'adverse-media-v2-general-aml-cft', 'adverse-media-v2-regulatory', 'adverse-media-v2-financial-difficulty', 'adverse-media-v2-violence-non-aml-cft', 'adverse-media-v2-other-financial', 'adverse-media-v2-other-serious', 'adverse-media-v2-other-minor'],'web'),

    
    // Tipo number
    minimumAcceptableAge: this.numberField('minimumAcceptableAge',1,100),
    maximumAcceptableTimeSinceExpiration: this.numberField('maximumAcceptableTimeSinceExpiration'),
    manualCaptureDelay: this.numberField('manualCaptureDelay'),
    doc_detectionTimeout: this.numberField('doc_detectionTimeout'),
    video_detectionTimeout: this.numberField('video_detectionTimeout'),
    challengeLength: this.numberField('challengeLength'),
    selfie_detectionTimeout: this.numberField('selfie_detectionTimeout'),
    
    // Tipo boolean
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

    //Tipo string
    defaultCountry:this.textField('defaultCountry'),
    title:this.textField('title'),
    libraryDocumentIds:this.textField('libraryDocumentIds'),
    email:this.textField('email'),
    applicationCode:this.textField('applicationCode'),
    signers_name:this.textField('signers_name'),
    signers_email:this.textField('signers_email'),
    redirectionUrl:this.textField('redirectionUrl'),
    familyPrimary:this.textField('familyPrimary'),
    familySecondary:this.textField('familySecondary'),
    borderWidthPrimary: this.textField('borderWidthPrimary'),
    borderWidth: this.textField('borderWidth'), 
    widthBorderVisited: this.textField('widthBorderVisited'), 
    borderWidthSecondary: this.textField('borderWidthSecondary'), 
    borderWidthTertiary: this.textField('borderWidthTertiary'), 
    borderWidthTertiaryInverse: this.textField('borderWidthTertiaryInverse'), 
    borderWidthOutline: this.textField('borderWidthOutline'), 
    borderRadius: this.textField('borderRadius'), 
    header_borderWidth: this.textField('header_borderWidth'), 
    modal_borderWidth: this.textField('header_borderWidth'), 
    modal_borderRadius: this.textField('modal_borderRadius'), 
    dropDown_borderRadius: this.textField('dropDown_borderRadius'), 
    
     
    //Tipo array
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
    custom1_familyPrimary: this.objectField('custom1_familyPrimary Data', ['name', 'url','weight','style', 'stretch', 'display','unicodeRange']),
    custom2_familyPrimary: this.objectField('custom2_familyPrimary Data', ['name', 'url','weight','style', 'stretch', 'display','unicodeRange']),
    custom1_familySecondary: this.objectField('custom1_familySecondary Data', ['name', 'url','weight','style', 'stretch', 'display','unicodeRange']),
    custom2_familySecondary: this.objectField('custom2_familySecondary Data', ['name', 'url','weight','style', 'stretch', 'display','unicodeRange']),


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
    ),
    //tipo color

    header_borderColor: this.colorField('header_borderColor', '#ff0000'),
    header_backgroundColor: this.colorField('header_backgroundColor', '#ff0000'),
    darkTextColor: this.colorField('darkTextColor', '#ff0000'),
    lightTextColor: this.colorField('lightTextColor', '#ff0000'),
    brandPrimaryColor: this.colorField('brandPrimaryColor', '#ff0000'),
    brandSecondaryColor: this.colorField('brandSecondaryColor', '#ff0000'),
    spinner_containerColor: this.colorField('spinner_containerColor', '#ff0000'),
    spinner_progressColor: this.colorField('spinner_progressColor', '#ff0000'),
    backgroundColorPrimary: this.colorField('backgroundColorPrimary', '#ff0000'),
    labelColorPrimary: this.colorField('labelColorPrimary', '#ff0000'),
    borderColorPrimary: this.colorField('borderColorPrimary', '#ff0000'),
    textColor: this.colorField('textColor', '#ff0000'),
    iconColor: this.colorField('iconColor', '#ff0000'),
    borderColor: this.colorField('borderColor', '#ff0000'),
    colorHover: this.colorField('colorHover', '#ff0000'),
    colorPressed: this.colorField('colorPressed', '#ff0000'),
    textColorVisited: this.colorField('textColorVisited', '#ff0000'),
    borderColorVisited: this.colorField('borderColorVisited', '#ff0000'),
    backgroundColorSecondary: this.colorField('backgroundColorSecondary', '#ff0000'),
    contentColorVisited: this.colorField('contentColorVisited', '#ff0000'),
    iconColorSecondary: this.colorField('iconColorSecondary', '#ff0000'),
    labelColorSecondary: this.colorField('labelColorSecondary', '#ff0000'),
    borderColorSecondary: this.colorField('borderColorSecondary', '#ff0000'),
    backgroundColorTertiary: this.colorField('backgroundColorTertiary', '#ff0000'),
    iconColorTertiary: this.colorField('iconColorTertiary', '#ff0000'),
    labelColorTertiary: this.colorField('labelColorTertiary', '#ff0000'),
    borderColorTertiary: this.colorField('borderColorTertiary', '#ff0000'),
    backgroundColorTertiaryInverse: this.colorField('backgroundColorTertiaryInverse', '#ff0000'),
    iconColorTertiaryInverse: this.colorField('iconColorTertiaryInverse', '#ff0000'),
    labelColorTertiaryInverse: this.colorField('labelColorTertiaryInverse', '#ff0000'),
    borderColorTertiaryInverse: this.colorField('borderColorTertiaryInverse', '#ff0000'),
    backgroundColorOutline: this.colorField('backgroundColorOutline', '#ff0000'),
    iconColorOutline: this.colorField('iconColorOutline', '#ff0000'),
    borderColorOutline: this.colorField('borderColorOutline', '#ff0000'),
    labelColorOutline: this.colorField('labelColorOutline', '#ff0000'),
    dropDown_backgroundColor: this.colorField('dropDown_backgroundColor', '#ff0000'),
    dropDown_borderColor: this.colorField('dropDown_borderColor', '#ff0000'),
    modal_backgroundColor: this.colorField('modal_backgroundColor', '#ff0000'), 
    modal_titleColor: this.colorField('modal_titleColor', '#ff0000'), 
    modal_descriptionColor: this.colorField('modal_descriptionColor', '#ff0000'), 
    modal_iconColorStart: this.colorField('modal_iconColorStart', '#ff0000'), 
    modal_iconColorStartError: this.colorField('iconColorStartError', '#ff0000'), 
    modal_iconColorStartSuccess: this.colorField('iconColorStartSuccess', '#ff0000'), 
    modal_iconColorEnd: this.colorField('iconColorEnd', '#ff0000'), 
    modal_borderColor: this.colorField('borderColor', '#ff0000'), 

  }

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
