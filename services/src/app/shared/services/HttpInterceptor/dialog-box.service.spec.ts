import { TestBed } from '@angular/core/testing';

import { DialogBoxService } from './dialog-box.service';

describe('DialogBoxService', () => {
  let service: DialogBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
