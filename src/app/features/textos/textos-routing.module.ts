import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TextosComponent } from './textos.component';


const routes: Routes = [
  { path: '', component: TextosComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextosRoutingModule { }
