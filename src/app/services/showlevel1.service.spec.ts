import { TestBed } from '@angular/core/testing';

import { Showlevel1Service } from './showlevel1.service';

describe('Showlevel1Service', () => {
  let service: Showlevel1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Showlevel1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
