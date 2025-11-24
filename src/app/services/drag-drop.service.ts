import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/*** previo funciona 
@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor() { }
  // Grupos del componente Level2
  private level2GroupsSubject = new BehaviorSubject<Record<string, any[]>>({});
  level2Groups$ = this.level2GroupsSubject.asObservable();

  // Lista seleccionada (componente Selected)
  private selectedItemsSubject = new BehaviorSubject<any[]>([]);
  selectedItems$ = this.selectedItemsSubject.asObservable();
  // BehaviorSubject con los IDs

  private dropListIdsSubject = new BehaviorSubject<string[]>([]);
  dropListIds$ = this.dropListIdsSubject.asObservable();
  

  updateDropListIds(ids: string[]) {
    this.dropListIdsSubject.next(ids);
    console.log("servicio1")
  }
  // Inicializar datos
  setLevel2Groups(groups: Record<string, any[]>) {
    this.level2GroupsSubject.next(groups);
    console.log("servicio2");
  }

  setSelectedItems(items: any[]) {
    this.selectedItemsSubject.next(items);
    console.log("servicio3");
  }

  // Mover un item entre listas
  moveItem(
    previousList: any[],
    currentList: any[],
    previousIndex: number,
    currentIndex: number
  ) {
    console.log("servicio4");
    const item = previousList.splice(previousIndex, 1)[0];
    currentList.splice(currentIndex, 0, item);

    // Emitimos el nuevo estado
    this.level2GroupsSubject.next({ ...this.level2GroupsSubject.value });
    this.selectedItemsSubject.next([...this.selectedItemsSubject.value]);
  }
}
*/


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
    console.log ("que es ",current)
    if (!current.some(i => i.key_name === item.key_name)) {
      this.selectedItemsSubject.next([...current, item]);
    }
  }

  removeFromSelected(item: any) {
    const updated = this.selectedItemsSubject.value.filter(i => i.key_name !== item.key_name);
    this.selectedItemsSubject.next(updated);
  }

  // mover/reordenar dentro de listas (si quieres usarlo)
  moveItem(previousList: any[], currentList: any[], previousIndex: number, currentIndex: number) {
    const item = previousList.splice(previousIndex, 1)[0];
    currentList.splice(currentIndex, 0, item);
    console.log("no debo estar aqui")
    // emitir nuevos estados (si las listas están en level2Groups o selectedItems)
    this.level2GroupsSubject.next({ ...this.level2GroupsSubject.value });
    this.selectedItemsSubject.next([...this.selectedItemsSubject.value]);
  }

  moveItemBetweenLists(
  item: any,
  fromSelected: boolean,
  toSelected: boolean,
  currentIndex: number
) {
  const level2Groups = this.level2GroupsSubject.value;
  let selectedItems = this.selectedItemsSubject.value;
  console.log(item, "fromseleceted",fromSelected, "toselected",toSelected)
  if (fromSelected && toSelected) return; // no hacer nada si es el mismo

  if (fromSelected && !toSelected) {
    // mover desde selected → level2
    console.log("a 2")
    const groupKey = item.frontparent;
    console.log(groupKey,"groupkey")
    selectedItems = selectedItems.filter(i => i !== item);
    console.log(groupKey,selectedItems,"groupkey")
   const originalItem = level2Groups[groupKey].find(i => i.id === item.id);

  // 3. desbloquearlo
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

}

