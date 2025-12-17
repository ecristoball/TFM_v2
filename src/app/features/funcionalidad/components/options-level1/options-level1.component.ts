import { Component } from '@angular/core';
//import { FuncionalidadService } from '../../../../services/funcionalidad.service';
import { JsonKey, Showlevel1Service } from '../../../../services/showlevel1.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-options-level1',
  templateUrl: './options-level1.component.html',
  styleUrl: './options-level1.component.css'
})
export class OptionsLevel1Component {
    functionalities: string[] = [];
  constructor (private authService: AuthService) {}
/* movido a stages y options
  level1Items: any[] = [];

  constructor(private showlevel1service: Showlevel1Service) {}

  ngOnInit(): void {
    this.showlevel1service.getByFrontLevel(1).subscribe(data => {
      this.level1Items = data;
      console.log(data);
    });
  }
    */
    ngOnInit() {
    this.authService.functionalities$.subscribe(f => {
      this.functionalities = f;
      console.log('FUNCIONES DISPONIBLES:', this.functionalities);
    });
  }
}

