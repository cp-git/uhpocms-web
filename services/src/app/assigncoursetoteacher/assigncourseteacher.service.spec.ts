import { TestBed } from '@angular/core/testing';

import { AssigncourseteacherService } from './assigncourseteacher.service';

describe('AssigncourseteacherService', () => {
  let service: AssigncourseteacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssigncourseteacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
