import { TestBed } from '@angular/core/testing';

import { AuthuserserviceService } from './authuserservice.service';

describe('AuthuserserviceService', () => {
  let service: AuthuserserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthuserserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
