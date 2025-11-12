

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // disponible en toda la app
})
export class FuncionalidadService {

  private apiUrl = 'http://127.0.0.1:8000/api/funcionalidades1'; // tu endpoint Laravel

  constructor(private http: HttpClient) {}

  getFuncionalidades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
