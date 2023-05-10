import { TestBed } from '@angular/core/testing';

import { ModuleProgressService } from './module-progress.service';

describe('ModuleProgressService', () => {
  let service: ModuleProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
