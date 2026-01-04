import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DragDropService {

  //observables a los que se pueden suscribir
  private level2GroupsSubject = new BehaviorSubject<Record<string, any[]>>({});
  level2Groups$ = this.level2GroupsSubject.asObservable();

  private selectedItemsSubject = new BehaviorSubject<any[]>([]);
  selectedItems$ = this.selectedItemsSubject.asObservable();

  private dropListIdsSubject = new BehaviorSubject<string[]>([]);
  dropListIds$ = this.dropListIdsSubject.asObservable();

  //almacena los IDs de todas las listas level2.
  setDropListIds(ids: string[]) {
     this.dropListIdsSubject.next(ids); 
    }

  setLevel2Groups(groups: Record<string, any[]>) { this.level2GroupsSubject.next(groups); }

  setSelectedItems(items: any[]) { this.selectedItemsSubject.next(items); }

  addItemToSelected(item: any) {
    const current = this.selectedItemsSubject.value;
    if (!current.some(i => i.key_name === item.key_name)) {
      this.selectedItemsSubject.next([...current, item]);
    }
  }

  removeFromSelected(item: any) {
    const updated = this.selectedItemsSubject.value.filter(i => i.key_name !== item.key_name);
    this.selectedItemsSubject.next(updated);
  }
  moveItemBetweenLists(
  item: any,
  fromSelected: boolean,
  toSelected: boolean,
  currentIndex: number
  ) {
    const level2Groups = this.level2GroupsSubject.value;
    let selectedItems = this.selectedItemsSubject.value;
    if (fromSelected && toSelected) return; // no hacer nada si es el mismo

    if (fromSelected && !toSelected) {
      // mover desde selected → level2
      const groupKey = item.frontparent;
      selectedItems = selectedItems.filter(i => i !== item);
      const originalItem = level2Groups[groupKey].find(i => i.id === item.id);

      // desbloquearlo
      if (originalItem) {
        originalItem.locked = false;
      }
  


    } else if (!fromSelected && toSelected) {
      // mover desde level2 → selected
      const groupKey = item.originalGroupKey;
      level2Groups[groupKey] = level2Groups[groupKey].filter(i => i !== item);
      selectedItems.splice(currentIndex, 0, item);
    }

    // Emitimos el nuevo estado
    this.level2GroupsSubject.next({ ...level2Groups });
    this.selectedItemsSubject.next([...selectedItems]);
  }
  clearLevel2Groups() {
    this.level2GroupsSubject.next({});
    this.selectedItemsSubject.next([]);
  }

}

