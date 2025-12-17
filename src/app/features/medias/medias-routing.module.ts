import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { MediasComponent } from './medias.component';

const routes: Routes = [
  { path: '', component: MediasComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediasRoutingModule { }
