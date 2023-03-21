import { TestBed } from '@angular/core/testing';

import { TeacherQuestionService } from './teacher-question.service';

describe('TeacherQuestionService', () => {
  let service: TeacherQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
