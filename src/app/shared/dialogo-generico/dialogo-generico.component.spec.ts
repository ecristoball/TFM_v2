import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoGenericoComponent } from './dialogo-generico.component';

describe('DialogoGenericoComponent', () => {
  let component: DialogoGenericoComponent;
  let fixture: ComponentFixture<DialogoGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoGenericoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
