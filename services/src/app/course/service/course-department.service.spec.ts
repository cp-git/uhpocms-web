import { TestBed } from '@angular/core/testing';

import { CourseDepartmentService } from './course-department.service';

describe('CourseDepartmentService', () => {
  let service: CourseDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
