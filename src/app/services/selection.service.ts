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
  //private old_selectedKeySource = new BehaviorSubject<string | null>(null);
  //selectedKey$ = this.selectedKeySource.asObservable();
 
  selectedKeysSource = new BehaviorSubject<SelectionEvent>({ selectedKeys: [] });
  selectedKeys$ = this.selectedKeysSource.asObservable();

   // ESTILOS POR ITEM
  private styleSource = new BehaviorSubject<StyleEvent>({
    key: '',
    backgroundColor: '#000000',
    borderColor: '#000000',
    borderWidth: '1px'
  });
  style$ = this.styleSource.asObservable();

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
      console.log("estoy en selelected",newKeys)

      this.selectedKeysSource.next({
        selectedKeys: newKeys,
        toggledKey: key,
        selected: !isSelected,
        front_parent //para distinguir componentes que vienene de options y core
      });
    }



//  ESTILOS COMPARTIDOS ---

/*

  private styleSource = new BehaviorSubject<any>({
  
  });

  style$ = this.styleSource.asObservable();

  updateStyle(style: any) {
    const current = this.styleSource.value;
    this.styleSource.next({ ...current, ...style });
  }
*/


 

  updateStyle(key: string, style: Partial<StyleEvent>) {
  const current = this.styleSource.value;
  this.styleSource.next({
    ...current,
    key,
    ...style,               // esto puede poner undefined
    backgroundColor: style.backgroundColor ?? current.backgroundColor,
    borderColor: style.borderColor ?? current.borderColor,
    borderWidth: style.borderWidth ?? current.borderWidth
  });
}

  


  // Método público para cambiar el valor
  selectItem(key: string) {
   // this.selectedKeySource.next(key);
  }

 

  

}



