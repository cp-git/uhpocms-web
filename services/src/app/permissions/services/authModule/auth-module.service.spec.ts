import { TestBed } from '@angular/core/testing';

import { AuthModuleService } from './auth-module.service';

describe('AuthModuleService', () => {
  let service: AuthModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
