import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoJsonComponent } from './dialogo-json.component';

describe('DialogoJsonComponent', () => {
  let component: DialogoJsonComponent;
  let fixture: ComponentFixture<DialogoJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoJsonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogoJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
