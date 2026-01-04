import { Component } from '@angular/core';
//import { FuncionalidadService } from '../../../../services/funcionalidad.service';
import { JsonKey, Showlevel1Service } from '../../../../services/showlevel1.service';
import { AuthService } from '../../../../services/auth.service';
import { FuncionalidadModule } from '../../funcionalidad.module';

@Component({
  selector: 'app-options-level1',
  templateUrl: './options-level1.component.html',
  styleUrl: './options-level1.component.css'
})
export class OptionsLevel1Component {
    functionalities: string[] = [];
  constructor (private authService: AuthService) {}
    ngOnInit() {
    this.authService.functionalities$.subscribe(f => {
      this.functionalities = f;
    });
  }
}

