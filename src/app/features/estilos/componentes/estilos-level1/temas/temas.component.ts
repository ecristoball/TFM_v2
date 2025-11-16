import { Component } from '@angular/core';
import { Showlevel1Service } from '../../../../../services/showlevel1.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrl: './temas.component.css'
})
export class TemasComponent {
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
