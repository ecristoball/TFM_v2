import { Component } from '@angular/core';
import { Showlevel1Service } from '../../../../../services/showlevel1.service';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.css'
})
export class ComponentesComponent {
 level1Items: any[] = [];

  constructor(private showlevel1service: Showlevel1Service) {}

  ngOnInit(): void {
    this.showlevel1service.getByFrontLevel(200).subscribe(data => {
      this.level1Items = data;
      console.log(data);
    });
  }
   mostrar(){
    this.showlevel1service.getByFrontLevel(20).subscribe(data => {
      this.level1Items = data;
      console.log(data);
    });
  }
}
