import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrearJsonService {

  constructor() { }
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
      // 🔹 Normalizamos el texto (sin espacios, minúsculas)
      const normalizedKey = rawKey.replace(/\s+/g, '');
      const isArray = normalizedKey.endsWith("[]");
      const cleanKey = normalizedKey.replace(/\[\]$/, "");
      const isLast = index === keys.length - 1;
console.log ("estoy en convertir")

      // 🔹 Creamos el contenedor si no existe
      if (current[cleanKey] === undefined) {
        current[cleanKey] = isArray ? [] : {};
      }
      console.log ("esto aqui");
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

