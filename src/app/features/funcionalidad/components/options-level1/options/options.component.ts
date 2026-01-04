
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
  ngOnInit():void {
    const user = this.authService.currentUser;
    const user2 = this.authService.user$;
    const parentKey = 'stages';

    console.log(user, user2)
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
