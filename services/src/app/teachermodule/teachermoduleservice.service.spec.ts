import { TestBed } from '@angular/core/testing';

import { TeachermoduleserviceService } from './teachermoduleservice.service';

describe('TeachermoduleserviceService', () => {
  let service: TeachermoduleserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeachermoduleserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
