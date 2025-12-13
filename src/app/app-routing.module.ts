import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FuncionalidadComponent } from './features/funcionalidad/funcionalidad.component';
import { EstilosComponent } from './features/estilos/estilos.component';
import { roleGuard } from './guards/role.guard';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  
 {
    path: 'funcionalidad',
      loadChildren: () =>
        import('./features/funcionalidad/funcionalidad.module').then(
          m => m.FuncionalidadModule
        ),
      canActivate: [roleGuard],
      data: { roles: [1, 2] } // admin y user1 pueden acceder
  },

   
  {
    path: 'estilos',
      loadChildren: () =>
        import('./features/estilos/estilos.module').then(
          m => m.EstilosModule
        ),
      canActivate: [roleGuard],
      data: { roles: [1] } // solo admin
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






