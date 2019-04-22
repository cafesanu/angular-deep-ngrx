import { TestBed } from '@angular/core/testing';

import { LoggingInterceptorService } from './logging-interceptor.service';

describe('LoginInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggingInterceptorService = TestBed.get(LoggingInterceptorService);
    expect(service).toBeTruthy();
  });
});
