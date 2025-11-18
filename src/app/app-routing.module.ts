import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FuncionalidadComponent } from './features/funcionalidad/funcionalidad.component';
import { EstilosComponent } from './features/estilos/estilos.component';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'funcionalidad' ,
     loadChildren: () =>
    import('./features/funcionalidad/funcionalidad.module').then(m => m.FuncionalidadModule)
  },
  {path:'estilos' , 
     loadChildren: () =>
    import('./features/estilos/estilos.module').then(m => m.EstilosModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
