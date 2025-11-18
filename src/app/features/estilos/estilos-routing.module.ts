import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstilosComponent } from './estilos.component';

const routes: Routes = [
  
  {
    path: '',
    component: EstilosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstilosRoutingModule {}