import { TestBed } from '@angular/core/testing';

import { AuthGroupPermissionService } from './auth-group-permission.service';

describe('AuthGroupPermissionService', () => {
  let service: AuthGroupPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGroupPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
