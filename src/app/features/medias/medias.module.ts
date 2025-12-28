import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediasRoutingModule } from './medias-routing.module';

import { MediasComponent } from './medias.component';
import { MediasLevel1Component } from './comoponentes/medias-level1/medias-level1.component';
import { MediasLevel2Component } from './comoponentes/medias-level2/medias-level2.component';
import { MediasSelectedComponent } from './comoponentes/medias-selected/medias-selected.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MediasComponent,
    MediasLevel1Component,
    MediasLevel2Component,
    MediasSelectedComponent,
  ],
  imports: [
    CommonModule,
    MediasRoutingModule,
    SharedModule
  ]
})
export class MediasModule { }
