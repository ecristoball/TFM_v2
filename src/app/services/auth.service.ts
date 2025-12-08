
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
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  private functionalitiesSubject = new BehaviorSubject<string[]>([]);


  private apiUrl = `${environment.apiUrl}/login`;
  private apiUrlf = `${environment.apiUrl}/user/functionalities`;

  constructor(private http: HttpClient) {}



  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(res => {
        if (res.user) {
          this.userSubject.next(res.user);
        }
      })
    );
  }
   logout() {
    this.userSubject.next(null);
  }

  get currentUser() {
    return this.userSubject.value;
  }

  get roleId() {
    return this.userSubject.value?.role_id || null;
  }
  getUserFunctionalities(userId: number) {
  return this.http.get(this.apiUrlf, {
    params: { user_id: userId }

  });
}
functionalities$ = this.functionalitiesSubject.asObservable();



}

