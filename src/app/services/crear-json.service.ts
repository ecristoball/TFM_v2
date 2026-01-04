import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Showlevel1Service } from './showlevel1.service';
import { DialogoJsonComponent } from '../shared/dialogo-json/dialogo-json.component';


@Injectable({
  providedIn: 'root'
})
export class CrearJsonService {

  constructor(private showlevel1service: Showlevel1Service,private dialog: MatDialog) { }
  
  generarJson(): void{
      this.showlevel1service.getLevelsBy().subscribe(data => {
        const items = (data as any[]).map(item => ({ ...item, value: this.parseValue(item.value) }));
        const jsonResult = this.convertTableToJson(items);

      // Validación de campos requeridos
        const itemsInvalidos = items.filter(item =>
          item.required === 1 && (item.value === null || item.value === '' || item.value === undefined)
        );

        if (itemsInvalidos.length > 0) {
          const lista = itemsInvalidos.map(i => i.level1 || i.key_name).join(", ");
          alert("Faltan valores obligatorios para: " + lista);
          return;
        }

        this.dialog.open(DialogoJsonComponent, {width: '900px',data:jsonResult});

      });


  }

  parseValue(value: any) {
    try {
      // Si es una cadena JSON, se convierte al tipo correcto
      return JSON.parse(value);
    } catch {
      // Si no lo es, se devuelve tal cual
      return value;
    }
  }
  
  convertTableToJson(data: any[]): any {
    const result: any = {};
    data.forEach(row => {
      const keys: string[] = [];
      for (let i = 1; i <= 8; i++) {
        const key = row[`level${i}`];
        if (key) keys.push(key.trim());
      }
      const value = row["value"];
      let current = result;
      keys.forEach((rawKey, index) => {
        //Normalizamos el texto (sin espacios, minúsculas)
        const normalizedKey = rawKey.replace(/\s+/g, '');
        const isArray = normalizedKey.endsWith("[]");
        const cleanKey = normalizedKey.replace(/\[\]$/, "");
        const isLast = index === keys.length - 1;
        //Creamos el contenedor si no existe
        if (current[cleanKey] === undefined) {
          current[cleanKey] = isArray ? [] : {};
        }
        if (isArray) {
          if (isLast) {
            current[cleanKey].push(value);
          } else {
            if (
              current[cleanKey].length === 0 ||
              typeof current[cleanKey][current[cleanKey].length - 1] !== "object"
            ) {
              current[cleanKey].push({});
            }
            current = current[cleanKey][current[cleanKey].length - 1];
          }
        } else {
          if (isLast) {
            current[cleanKey] = value;
          } else {
            if (!current[cleanKey] || typeof current[cleanKey] !== "object") {
              current[cleanKey] = {};
            }
            current = current[cleanKey];
          }
        }
      });
    });
    return result;
  }
 
}
 

