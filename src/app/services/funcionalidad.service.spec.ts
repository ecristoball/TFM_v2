import { TestBed } from '@angular/core/testing';

import { FuncionalidadService } from './funcionalidad.service';

describe('FuncionalidadService', () => {
  let service: FuncionalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
