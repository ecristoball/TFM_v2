import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { EstilosComponent } from './estilos.component';
//import { FormsModule } from '@angular/forms';

import { EstilosLevel1Component } from './componentes/estilos-level1/estilos-level1.component';
import { EstilosLevel2Component } from './componentes/estilos-level2/estilos-level2.component';
import { EstilosSelectedComponent } from './componentes/estilos-selected/estilos-selected.component';
import { ComponentesComponent } from './componentes/estilos-level1/componentes/componentes.component';
import { FuentesComponent } from './componentes/estilos-level1/fuentes/fuentes.component';
import { TemasComponent } from './componentes/estilos-level1/temas/temas.component';

import { EstilosRoutingModule } from './estilos-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
  EstilosComponent,
    EstilosLevel1Component,
    EstilosLevel2Component,
    EstilosSelectedComponent,
    ComponentesComponent,
    FuentesComponent,
    TemasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    EstilosRoutingModule,
  ]
})
export class EstilosModule { 
  constructor() {
  console.log('EstilosModule cargado');
}
}
