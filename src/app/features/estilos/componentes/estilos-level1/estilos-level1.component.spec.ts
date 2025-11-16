import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstilosLevel1Component } from './estilos-level1.component';

describe('EstilosLevel1Component', () => {
  let component: EstilosLevel1Component;
  let fixture: ComponentFixture<EstilosLevel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstilosLevel1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstilosLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
