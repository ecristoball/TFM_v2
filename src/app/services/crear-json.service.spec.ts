import { TestBed } from '@angular/core/testing';

import { CrearJsonService } from './crear-json.service';

describe('CrearJsonService', () => {
  let service: CrearJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
