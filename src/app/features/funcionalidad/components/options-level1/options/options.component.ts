
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
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
/*
Hace una llamada a tu API / servicio
this.showlevel1service.getOptionsBy(1, "options")

para obtener las opciones del nivel 1, pasando:


Es un observable que devolverá datos del backend.

✅ 2. Se suscribe al observable con pipe(takeUntil(...))
.pipe(takeUntil(this.destroy$))
.subscribe(data => { ... })

✔ Se suscribe solo mientras el componente esté vivo

takeUntil(this.destroy$) corta la suscripción cuando el componente se destruye (en ngOnDestroy), evitando que se acumulen suscripciones — una protección contra memory leaks.
Cuando llegan los datos, se guardan en level1Items
Los items obtenidos del backend se guardan para mostrarlos en el HTML (por ejemplo con *ngFor).
*/