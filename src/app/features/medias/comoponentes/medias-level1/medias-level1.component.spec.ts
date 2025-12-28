import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasLevel1Component } from './medias-level1.component';

describe('MediasLevel1Component', () => {
  let component: MediasLevel1Component;
  let fixture: ComponentFixture<MediasLevel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediasLevel1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediasLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
