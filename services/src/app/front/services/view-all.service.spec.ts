import { TestBed } from '@angular/core/testing';

import { ViewAllService } from './view-all.service';

describe('ViewAllService', () => {
  let service: ViewAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
