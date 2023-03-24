import { TestBed } from '@angular/core/testing';

import { InstituteServicesService } from './institute-services.service';

describe('InstituteServicesService', () => {
  let service: InstituteServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
