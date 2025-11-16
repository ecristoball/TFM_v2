import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstilosSelectedComponent } from './estilos-selected.component';

describe('EstilosSelectedComponent', () => {
  let component: EstilosSelectedComponent;
  let fixture: ComponentFixture<EstilosSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstilosSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstilosSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
