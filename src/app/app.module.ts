import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { FuncionalidadModule } from './features/funcionalidad/funcionalidad.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EstilosComponent } from './features/estilos/estilos.component';
import { FormsModule } from '@angular/forms';
import { EstilosLevel1Component } from './features/estilos/componentes/estilos-level1/estilos-level1.component';
import { EstilosLevel2Component } from './features/estilos/componentes/estilos-level2/estilos-level2.component';
import { EstilosSelectedComponent } from './features/estilos/componentes/estilos-selected/estilos-selected.component';
import { ComponentesComponent } from './features/estilos/componentes/estilos-level1/componentes/componentes.component';
import { FuentesComponent } from './features/estilos/componentes/estilos-level1/fuentes/fuentes.component';
import { TemasComponent } from './features/estilos/componentes/estilos-level1/temas/temas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EstilosComponent,
    EstilosLevel1Component,
    EstilosLevel2Component,
    EstilosSelectedComponent,
    ComponentesComponent,
    FuentesComponent,
    TemasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FuncionalidadModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }