import { TestBed } from '@angular/core/testing';

import { AuthUserPermissionService } from './auth-user-permission.service';

describe('AuthUserPermissionService', () => {
  let service: AuthUserPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
