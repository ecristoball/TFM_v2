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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatCard,
    MatCardModule,
    MatIcon,
    MatTooltipModule
  ]
})
export class TextosModule { }