import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsLevel2Component } from './options-level2.component';

describe('OptionsLevel2Component', () => {
  let component: OptionsLevel2Component;
  let fixture: ComponentFixture<OptionsLevel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsLevel2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionsLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
