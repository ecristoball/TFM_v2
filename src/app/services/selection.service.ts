import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SelectionService {
  // Estado compartido: el elemento seleccionado
  private selectedKeySource = new BehaviorSubject<string | null>(null);
  selectedKey$ = this.selectedKeySource.asObservable();

  // Método público para cambiar el valor
  selectItem(key: string) {
    this.selectedKeySource.next(key);
  }
}
