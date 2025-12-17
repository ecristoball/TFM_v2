import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsLevel1Component } from './options-level1.component';

describe('OptionsLevel1Component', () => {
  let component: OptionsLevel1Component;
  let fixture: ComponentFixture<OptionsLevel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsLevel1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionsLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
