
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  //BehaviourSubject guarda siempre el último valor
  private userSubject = new BehaviorSubject<User | null>(null); 
  public user$ = this.userSubject.asObservable(); // $ porque es observable
  private functionalitiesSubject = new BehaviorSubject<string[]>([]);
  /*
  En la aplicación he utilizado un patrón basado en RxJS para gestionar el estado del usuario autenticado.
  El estado se guarda internamente en un BehaviorSubject (userSubject), que actúa como una fuente reactiva que almacena 
  siempre el último usuario autenticado y permite emitir cambios.
  Para evitar que los componentes puedan modificar este estado de forma accidental, 
  expongo únicamente un Observable de solo lectura (user$), obtenido mediante asObservable().
  Los componentes pueden suscribirse a user$ para reaccionar cuando el usuario inicia sesión, 
  cierra sesión o cambia de rol, pero solo el servicio puede modificar el estado usando next().
  Esta técnica refuerza el encapsulamiento, evita errores de asignación directa y permite que
  otros elementos como directivas (por ejemplo, la directiva appCan) 
  reaccionen automáticamente cuando cambian los roles o el usuario actual.*/

  private apiUrl = `${environment.apiUrl}/login`;
  private apiUrlf = `${environment.apiUrl}/user/functionalities`;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(res => {
        if (res.user) {
          this.userSubject.next(res.user); //todos los subscritos ven el cambio. Solo se puede hacer en el servicio, no en el componente
        }
      })
    );
  }
  
  logout() {
    console.log ("estoy en logout");
    const confirmLogout = confirm('¿Seguro que quieres cerrar sesión?');

    if (confirmLogout) {
     this.userSubject.next(null);  
    }
    
  }

  
  //user$ = this.userSubject.asObservable();
  get currentUser() {
 
    return this.userSubject.value;
  }

  get roleId() {
    return this.userSubject.value?.role_id || null;
  }

  getUserFunctionalities(userId: number, parentKey: string) {
    return this.http.get(`${this.apiUrlf}/${userId}/${parentKey}`);
  }
  functionalities$ = this.functionalitiesSubject.asObservable();

}

