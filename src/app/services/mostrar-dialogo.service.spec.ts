import { TestBed } from '@angular/core/testing';

import { MostrarDialogoService } from './mostrar-dialogo.service';

describe('MostrarDialogoService', () => {
  let service: MostrarDialogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarDialogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
