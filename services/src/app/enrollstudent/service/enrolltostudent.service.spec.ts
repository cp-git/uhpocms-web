import { TestBed } from '@angular/core/testing';

import { EnrolltostudentService } from './enrolltostudent.service';

describe('EnrolltostudentService', () => {
  let service: EnrolltostudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrolltostudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
