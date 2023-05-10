import { TestBed } from '@angular/core/testing';

import { ModulefileprogressService } from './modulefileprogress.service';

describe('ModulefileprogressService', () => {
  let service: ModulefileprogressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulefileprogressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
