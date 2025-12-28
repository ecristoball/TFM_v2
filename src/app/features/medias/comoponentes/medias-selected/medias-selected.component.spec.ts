import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasSelectedComponent } from './medias-selected.component';

describe('MediasSelectedComponent', () => {
  let component: MediasSelectedComponent;
  let fixture: ComponentFixture<MediasSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediasSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediasSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
