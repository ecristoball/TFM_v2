import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasLevel2Component } from './medias-level2.component';

describe('MediasLevel2Component', () => {
  let component: MediasLevel2Component;
  let fixture: ComponentFixture<MediasLevel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediasLevel2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediasLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
