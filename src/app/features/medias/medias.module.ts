import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediasRoutingModule } from './medias-routing.module';

import { MediasComponent } from './medias.component';

@NgModule({
  declarations: [
    MediasComponent,
  ],
  imports: [
    CommonModule,
    MediasRoutingModule
  ]
})
export class MediasModule { }
