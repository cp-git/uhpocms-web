import { TestBed } from '@angular/core/testing';

import { AdmininstitutionService } from './admininstitution.service';

describe('AdmininstitutionService', () => {
  let service: AdmininstitutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmininstitutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
