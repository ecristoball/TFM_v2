
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextosComponent } from './textos.component';
import { OptionsLevel1Component } from './componentes/options-level1/options-level1.component';
import { OptionsLevel2Component } from './componentes/options-level2/options-level2.component';
import { OptionsSelectedComponent } from './componentes/options-selected/options-selected.component';
import { TextosRoutingModule } from './textos-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { OpcionesComponent } from './componentes/options-level2/opciones/opciones.component';
import { ValoresComponent } from './componentes/options-level2/valores/valores.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    TextosComponent,
    OptionsLevel1Component,
    OptionsLevel2Component,
    OptionsSelectedComponent,
    OpcionesComponent,
    ValoresComponent
  ],
  imports: [
    TextosRoutingModule,
    SharedModule,
    DragDropModule,
    CommonModule
  ]
})
export class TextosModule { }