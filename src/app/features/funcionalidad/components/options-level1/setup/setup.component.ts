import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {
  level1Items: any[] = [];

  constructor( private authService:AuthService) {}

  private destroy$ = new Subject<void>();

  ngOnInit() {
    const user = this.authService.currentUser;
    const user2 = this.authService.user$;
    const parentKey = 'setup';

    if (!user) {
      console.error("Usuario no autenticado");
      return;
    }
    const userId = user.id;
    this.authService.getUserFunctionalities(userId,parentKey)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data:any) => {
          this.level1Items = data
        },
        error: (err) => console.error(err)
      }); 
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
