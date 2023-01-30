import { TestBed } from '@angular/core/testing';

import { HttpInceptorServiceService } from './http-inceptor-service.service';

describe('HttpInceptorServiceService', () => {
  let service: HttpInceptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInceptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
