
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
  console.log("carga options document, selfie...")
  const user = this.authService.currentUser;
  const user2 = this.authService.user$;
  const parentKey = 'stages';

  console.log(user, user2)
  if (!user) {
    console.error("Usuario no autenticado");
    return;
  }
  const userId = user.id;
    console.log("userid es : ",userId)
    this.authService.getUserFunctionalities(userId,parentKey)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data:any) => {
        console.log("DATA COMPLETA DEL BACKEND:", data);

        this.level1Items = data
        console.log(this.level1Items);
      },
      error: (err) => console.error(err)
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