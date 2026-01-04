import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

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
  //private apiUrl = 'http://127.0.0.1:8000/api/json_funcionalidades_keys'; // en local
  private apiUrl = `${environment.apiUrl}/json_funcionalidades_keys`;
  constructor(private http: HttpClient) { }
    //Recupera todas las claves de la base de datos.
    getAllKeys(): Observable<JsonKey[]> {
      return this.http.get<JsonKey[]>(this.apiUrl);
    }
    //Obtiene los elementos que dependen de una clave padre específica.
    getByParent(parent: string): Observable<JsonKey[]> {
      return this.http.get<JsonKey[]>(`${this.apiUrl}/parent/${parent}`);
    }
    //Filtra los elementos según su nivel en la jerarquía de la interfaz.
    getByFrontLevel(frontlevel: number | string): Observable<JsonKey[]> {
      return this.http.get<JsonKey[]>(`${this.apiUrl}/frontlevel/${frontlevel}`);
    }
    //Devuelve  los keynames asociados a un determinado frontlevel 
    getItemsBy(frontlevel: number, keyName: string) {
       return this.http.get<JsonKey[]>(`${this.apiUrl}/filter/${frontlevel}/${keyName}`);
    }
    //Devuelve  los keynames asociados a un determinado frontparent 
    getOptionsBy(frontlevel: number, frontparent: string) {
        return this.http.get<JsonKey[]>(`${this.apiUrl}/${frontlevel}/${frontparent}`);
        //filterByFrontLevelAndFrontParent'
    }

    //Devuelve toda la jerarquía para crear el json.
    getLevelsBy() {
        return this.http.get<JsonKey[]>(`${this.apiUrl}/levelsbyfrontlevel`);
    }
    //Inserta en BBDD un valor para un determinado keyName 
    updateValue(keyName: string, value: any) {
       return this.http.put<JsonKey[]>(`${this.apiUrl}/update/${keyName}`, {value});
    }
    //Borra todos los valores de la BBDD. NO devuelve nada.
    deleteAllValues(): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/deleteall`);
    }
    //Borra un determinado valor de la BBDD, el asociado a keyName
    deleteValue(keyName: string): Observable<any> {
      return this.http.delete(
        `${this.apiUrl}/delete`,
        {
          body: { key_name: keyName }
        }
      );
    }
    clearValue(keyName: string): Observable<any> {
      return this.http.put(
        `${this.apiUrl}/value`,
        { key_name: keyName }
      );
    }

  getDefaultValue(keyName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/defaultvalue/${keyName}`);
  }


  getImageUrl(keyName: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/imageurl/${keyName}`
    );
  }

}




