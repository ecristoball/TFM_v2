import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FuncionalidadComponent } from './features/funcionalidad/funcionalidad.component';
import { EstilosComponent } from './features/estilos/estilos.component';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'funcionalidad' , component: FuncionalidadComponent},
  {path:'estilos' , component: EstilosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
