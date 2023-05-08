import { TestBed } from '@angular/core/testing';

import { CourseProgressService } from './course-progress.service';

describe('CourseProgressService', () => {
  let service: CourseProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
