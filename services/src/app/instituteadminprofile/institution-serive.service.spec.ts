import { TestBed } from '@angular/core/testing';

import { InstitutionSeriveService } from './institution-serive.service';

describe('InstitutionSeriveService', () => {
  let service: InstitutionSeriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionSeriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
