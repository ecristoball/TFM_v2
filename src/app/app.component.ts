
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
console.log(confirmLogout)
  if (!confirmLogout) return;
  console.log("he pasado")
  this.showlevel1service.deleteValues().subscribe({
    next: () => {
      
      
      // Ahora cerramos sesión
      console.log("antes de logout")
      this.authService.logout();
    },
    error: (err) => {
      console.error('Error borrando valores', err);
    }
  });
}

}
