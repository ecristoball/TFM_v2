import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { Showlevel1Service } from '../../../../services/showlevel1.service';

@Component({
  selector: 'app-options-level1',
  templateUrl: './options-level1.component.html',
  styleUrl: './options-level1.component.css'
})
export class OptionsLevel1Component {
  level1Items: any[] = [];

  constructor(private authService:AuthService) {}

  private destroy$ = new Subject<void>();

  ngOnInit(){
    const user = this.authService.currentUser;
    const user2 = this.authService.user$;
    const parentKey = 'textos';

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
