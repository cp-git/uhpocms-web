import { TestBed } from '@angular/core/testing';

import { TeacherCourseService } from './services/teacher-course.service';

describe('TeacherCourseService', () => {
  let service: TeacherCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
