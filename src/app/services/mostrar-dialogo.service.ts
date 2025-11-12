import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoGenericoComponent } from '../shared/dialogo-generico/dialogo-generico.component';
import { Dialog } from '@angular/cdk/dialog';

@Injectable({
  providedIn: 'root'
})
export class MostrarDialogoService {

  constructor(private dialog: MatDialog) { }
  private dialogConfig: Record<string, any> = {
    
     serviceMode: {
      title: 'serviceMode',
      fields: [
          { label: 'Nombre', type: 'text', key: 'name' },
          { label: 'Tipo', type: 'select', key: 'type', options: ['validation', 'ocr'] }
      ]
    },
    //enteros
    minimumAcceptableAge: {
      title: 'minimumAcceptableAge',
      fields: [
        { label: '', type: 'number', key: 'max' }
      ]
    },
    maximumAcceptableTimeSinceExpiration: {
      title: 'maximumAcceptableTimeSinceExpiratin',
      fields: [
        { label: '', type: 'number', key: 'max' }
      ]
    },
     manualCaptureDelay: {
      title: 'manualCaptureDelay',
      fields: [
        { label: '', type: 'number', key: 'max' }
      ]
    },
     detectionTimeout: {
      title: 'detectionTimeout',
      fields: [
        { label: '', type: 'number', key: 'max' }
      ]
    },
    //Booleanos
    extendedCoverage: {
      title: 'extendedCoverage',
      fields: [
       { 
        label: 'Tipo', 
        type: 'boolean', 
        key: 'active', 
        options: [
          { label: 'True', value: true },
          { label: 'False', value: false }
        ]
      }
      ]
    },
    geolocation: {
      title: 'geolocation',
      fields: [
       { 
        label: 'Tipo', 
        type: 'boolean', 
        key: 'active', 
        options: [
          { label: 'True', value: true },
          { label: 'False', value: false }
        ]
      }
      ]
    },
     manualCaptureShow: {
      title: 'manualCaptureShow',
      fields: [
       { 
        label: 'Tipo', 
        type: 'boolean', 
        key: 'active', 
        options: [
          { label: 'True', value: true },
          { label: 'False', value: false }
        ]
      }
      ]
    },
    instructionsShow: {
      title: 'instructionsShow',
      fields: [
       { 
        label: 'Tipo', 
        type: 'boolean', 
        key: 'active', 
        options: [
          { label: 'True', value: true },
          { label: 'False', value: false }
        ]
      }
      ]
    },
    reviewShow: {
      title: 'reviewShow',
      fields: [
       { 
        label: 'Tipo', 
        type: 'boolean', 
        key: 'active', 
        options: [
          { label: 'True', value: true },
          { label: 'False', value: false }
        ]
      }
      ]
    }
  }
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
