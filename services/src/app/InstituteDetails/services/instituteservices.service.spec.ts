import { TestBed } from '@angular/core/testing';

import { InstituteservicesService } from './instituteservices.service';

describe('InstituteservicesService', () => {
  let service: InstituteservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
