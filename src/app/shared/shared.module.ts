import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { DialogoGenericoComponent } from './dialogo-generico/dialogo-generico.component';


import { FormsModule } from '@angular/forms';  // 👈 necesario para [(ngModel)]
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio'; ;


@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    DialogoGenericoComponent],
  imports: [
    CommonModule,
    FormsModule, // 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule
  ],
  exports: [
    ItemComponent, 
    ItemListComponent,
     DialogoGenericoComponent,
    FormsModule, //
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule
  ]
})
export class SharedModule { }
