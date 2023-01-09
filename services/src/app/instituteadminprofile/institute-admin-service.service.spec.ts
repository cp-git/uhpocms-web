import { TestBed } from '@angular/core/testing';

import { InstituteAdminServiceService } from './institute-admin-service.service';

describe('InstituteAdminServiceService', () => {
  let service: InstituteAdminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteAdminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
