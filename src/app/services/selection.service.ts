import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



export interface SelectionEvent {
  selectedKeys: string[];
  toggledKey?: string;
  selected?: boolean; // true = seleccionado, false = deseleccionado
}
@Injectable({ providedIn: 'root' })

export class SelectionService {
  // Estado compartido: el elemento seleccionado
  //private old_selectedKeySource = new BehaviorSubject<string | null>(null);
  //selectedKey$ = this.selectedKeySource.asObservable();
 private selectedKeysSource = new BehaviorSubject<SelectionEvent>({ selectedKeys: [] });
  selectedKeys$ = this.selectedKeysSource.asObservable();

  // Método público para cambiar el valor
  selectItem(key: string) {
   // this.selectedKeySource.next(key);
  }

  old_toggleSelect(key: string) {
   // const current = this.selectedKeySource.value;
    //this.selectedKeySource.next(current === key ? null : key);
  }

toggleSelect(key: string) {
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
      selected: !isSelected
    });
  }

}



