import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstilosLevel2Component } from './estilos-level2.component';

describe('EstilosLevel2Component', () => {
  let component: EstilosLevel2Component;
  let fixture: ComponentFixture<EstilosLevel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstilosLevel2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstilosLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
