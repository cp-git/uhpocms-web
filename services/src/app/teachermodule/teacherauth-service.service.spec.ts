import { TestBed } from '@angular/core/testing';

import { TeacherauthServiceService } from './teacherauth-service.service';

describe('TeacherauthServiceService', () => {
  let service: TeacherauthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherauthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
