import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsSelectedComponent } from './options-selected.component';

describe('OptionsSelectedComponent', () => {
  let component: OptionsSelectedComponent;
  let fixture: ComponentFixture<OptionsSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionsSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
