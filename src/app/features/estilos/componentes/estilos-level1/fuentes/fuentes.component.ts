import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../services/auth.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-fuentes',
  templateUrl: './fuentes.component.html',
  styleUrl: './fuentes.component.css'
})
export class FuentesComponent {
level1Items: any[] = [];

  constructor( private authService:AuthService) {}

  private destroy$ = new Subject<void>();

  ngOnInit() {
    console.log("carga options document, selfie...")
    const user = this.authService.currentUser;
    const user2 = this.authService.user$;
    const parentKey = 'font';

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
