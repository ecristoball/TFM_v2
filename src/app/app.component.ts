
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Showlevel1Service } from './services/showlevel1.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'ecristoball_TFM';
  constructor(public authService: AuthService, private showlevel1service: Showlevel1Service) {}

logout() {
  const confirmLogout = confirm('¿Seguro que quieres cerrar sesión?');

  if (!confirmLogout) return;

  this.showlevel1service.deleteAllValues().subscribe({
    next: () => {
      
      
      // Ahora cerramos sesión

      this.authService.logout();
    },
    error: (err) => {
      console.error('Error borrando valores', err);
    }
  });
}

}
