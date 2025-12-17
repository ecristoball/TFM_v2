import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
//import { FuncionalidadModule } from './features/funcionalidad/funcionalidad.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { EstilosModule } from './features/estilos/estilos.module';
import { Showlevel1Service } from './services/showlevel1.service';
import { appInitializer } from './app-init';
import { APP_INITIALIZER } from '@angular/core';
import { HomeModule } from './features/home/home.module';
import { CanDirective } from './directivas/can.directive';
//import { TextosComponent } from './textos/textos.component';
//import { SetupComponent } from './features/setup/setup.component';
//import { MediasComponent } from './features/medias/medias.component';
//import { LoginComponent } from './features/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CanDirective,
    //TextosComponent,
    //SetupComponent,
    //MediasComponent,
    //HomeComponent,
    //LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FuncionalidadModule,
    HttpClientModule,
    FormsModule,
    //EstilosModule,
    HomeModule

  ],
  providers: [
    provideAnimationsAsync(),
    Showlevel1Service,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [Showlevel1Service],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }