import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { FuncionalidadModule } from './features/funcionalidad/funcionalidad.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EstilosComponent } from './features/estilos/estilos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EstilosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FuncionalidadModule,
    HttpClientModule,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
