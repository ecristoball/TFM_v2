
import { Component } from '@angular/core';
import { Showlevel1Service } from '../../../../../services/showlevel1.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  level1Items: any[] = [];

  constructor(private showlevel1service: Showlevel1Service, private authService:AuthService) {}

  private destroy$ = new Subject<void>();
/* funciona
  ngOnInit() {
    this.showlevel1service.getOptionsBy(1,"options")
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.level1Items = data;
      });
  }
*/
ngOnInit():void {
  console.log("carga options")
    this.authService.user$.subscribe(user => {
      console.log("user",user)
      if (!user) return; // sale si no hay usuario

      this.showlevel1service.getOptionsBy(1,"options").subscribe(data => {
        if (user.role_id == 1) {
          console.log("es documento y data",data)
          this.level1Items = data.filter(i => i.key_name === 'document' ||  i.key_name === 'selfie' ||
             i.key_name === 'video' ||  i.key_name === 'qr' ||
              i.key_name === 'timestamp' ||  i.key_name === 'esign' ||
               i.key_name === 'pepSanctions' ||  i.key_name === 'identityVerification'
          );
        } else if (user.role_id == 2) {
          this.level1Items = data.filter(i => i.key_name === 'selfie');
        } else {
          this.level1Items = data; // todos
        }
      });
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