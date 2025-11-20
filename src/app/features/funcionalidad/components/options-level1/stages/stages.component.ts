import { Component } from '@angular/core';
import { Showlevel1Service } from '../../../../../services/showlevel1.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrl: './stages.component.css'
})
export class StagesComponent {
  level1Items: any[] = [];

  constructor(private showlevel1service: Showlevel1Service) {}

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.showlevel1service.getOptionsBy(1,"core")
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.level1Items = data;
        data.forEach(item => {
          console.log('ID:', item.id);
        });
        console.log(data);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
// antiguo, menos correcto porque no destruye la suscripcion
/*this.showlevel1service.getByFrontLevel(1).subscribe(data => {
  this.level1Items = data;
  console.log(data);
});*/