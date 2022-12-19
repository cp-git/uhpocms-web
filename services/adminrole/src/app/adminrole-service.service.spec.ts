import { TestBed } from '@angular/core/testing';

import { AdminroleServiceService } from './adminrole-service.service';

describe('AdminroleServiceService', () => {
  let service: AdminroleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminroleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
