
import { Component } from '@angular/core';
import { Showlevel1Service } from '../../../../../services/showlevel1.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  level1Items: any[] = [];

  constructor(private showlevel1service: Showlevel1Service) {}

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.showlevel1service.getOptionsBy(1,"options")
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
