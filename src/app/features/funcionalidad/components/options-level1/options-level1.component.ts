import { Component } from '@angular/core';
import { FuncionalidadService } from '../../../../services/funcionalidad.service';
import { JsonKey, Showlevel1Service } from '../../../../services/showlevel1.service';

@Component({
  selector: 'app-options-level1',
  templateUrl: './options-level1.component.html',
  styleUrl: './options-level1.component.css'
})
export class OptionsLevel1Component {

  level1Items: any[] = [];

  constructor(private showlevel1service: Showlevel1Service) {}

  ngOnInit(): void {
    this.showlevel1service.getByFrontLevel(1).subscribe(data => {
      this.level1Items = data;
      console.log(data);
    });
  }
}

/*
  level1Items=[
    {id:1, name:'Confirmar'},
    {id:2, name:'No Confirmar'},
    {id:3, name:'Pausar'},
    {id:4, name:'Datos Contextuales'},
    {id:5, name:'Documento'},
    {id:6, name:'Selfie Pasivo'},
    {id:7, name:'Selfie Activo'},
    {id:8, name:'Video'},
    {id:9, name:'QR'},
    {id:10, name:'Sellado de tiempo'},
    {id:11, name:'Servicio del Ministerio'},
    {id:12, name:'Peps & Sanctions'},
    {id:13, name:'eSign'}
  ]
*/

