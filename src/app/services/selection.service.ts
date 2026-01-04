import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SelectionEvent {
  selectedKeys: string[];
  toggledKey?: string;
  front_parent?:string;
  selected?: boolean; // true = seleccionado, false = deseleccionado
}
export interface StyleEvent {
  key: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: string;
}
@Injectable({ providedIn: 'root' })

export class SelectionService {
  // Estado compartido: el elemento seleccionado
 
  selectedKeysSource = new BehaviorSubject<SelectionEvent>({ selectedKeys: [] });
  selectedKeys$ = this.selectedKeysSource.asObservable();

  toggleSelect(key: string,front_parent?: string) {
    const currentKeys = this.selectedKeysSource.value.selectedKeys;
    const isSelected = currentKeys.includes(key);
    let newKeys: string[];
    if (isSelected) {
      // si ya estaba seleccionado, lo eliminamos
      newKeys = currentKeys.filter(k => k !== key);
    } else {
    // si no estaba seleccionado, lo añadimos
      newKeys = [...currentKeys, key];
    }

    this.selectedKeysSource.next({
      selectedKeys: newKeys,
      toggledKey: key,
      selected: !isSelected,
      front_parent //para distinguir componentes que vienene de options y core
    });
  }
  
}



