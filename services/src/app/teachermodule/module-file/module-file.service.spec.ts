import { TestBed } from '@angular/core/testing';

import { ModuleFileService } from './module-file.service';

describe('ModuleFileService', () => {
  let service: ModuleFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
