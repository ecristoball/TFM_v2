import { Component } from '@angular/core';
import { Subject,takeUntil } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-medias-level1',
  templateUrl: './medias-level1.component.html',
  styleUrl: './medias-level1.component.css'
})
export class MediasLevel1Component {

   level1Items: any[] = [];
   constructor(private authService:AuthService) {}
   
     private destroy$ = new Subject<void>();
   
     ngOnInit(){
       const user = this.authService.currentUser;
       const user2 = this.authService.user$;
       const parentKey = 'medias';
   
      
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
