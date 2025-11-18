import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionalidadRoutingModule } from './funcionalidad-routing.module';

import { FuncionalidadComponent } from './funcionalidad.component';
import { OptionsLevel1Component } from './components/options-level1/options-level1.component';
import { OptionsLevel2Component } from './components/options-level2/options-level2.component';
import { OptionsSelectedComponent } from './components/options-selected/options-selected.component';

import { SharedModule } from '../../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
//import { DialogoGenericoComponent } from '../../shared/dialogo-generico/dialogo-generico.component';

@NgModule({
  declarations: [
    FuncionalidadComponent,
    OptionsLevel1Component,
    OptionsLevel2Component,
    OptionsSelectedComponent
  ],

  imports: [
    CommonModule,
    FuncionalidadRoutingModule,
    SharedModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class FuncionalidadModule {
  constructor() {
  console.log('funcionalidadmodule cargado');
}
 }
