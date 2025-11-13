import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JsonKey {
  id: number;
  key_name: string;
  parent_key: string | null;
  level: number;
  frontlevel:number;
  frontparent:string;
}

@Injectable({
  providedIn: 'root'
})
export class Showlevel1Service {
  private apiUrl = 'http://127.0.0.1:8000/api/json_funcionalidades_keys'; // endpoint Laravel

  constructor(private http: HttpClient) { }

    getAllKeys(): Observable<JsonKey[]> {
      return this.http.get<JsonKey[]>(this.apiUrl);
    }

    getByParent(parent: string): Observable<JsonKey[]> {
      return this.http.get<JsonKey[]>(`${this.apiUrl}/parent/${parent}`);
    }

    getByFrontLevel(frontlevel: number | string): Observable<JsonKey[]> {
      return this.http.get<JsonKey[]>(`${this.apiUrl}/frontlevel/${frontlevel}`);
    }

    getItemsBy(frontlevel: number, keyName: string) {
       return this.http.get<JsonKey[]>(`${this.apiUrl}/filter/${frontlevel}/${keyName}`);
    }

    getOptionsBy(frontlevel: number, frontparent: string) {
        return this.http.get<JsonKey[]>(`${this.apiUrl}/${frontlevel}/${frontparent}`);
    }

    getLevelsBy(frontlevel: number) {
        return this.http.get<JsonKey[]>(`${this.apiUrl}/levelsbyfrontlevel/${frontlevel}`);
    }
    updateValue(keyName: string, value: any) {
       return this.http.put<JsonKey[]>(`${this.apiUrl}/update/${keyName}`, {value});
    }

    deleteValues(): Observable<JsonKey[]> {
      return this.http.delete<JsonKey[]>(`${this.apiUrl}/values`);
    }
}




