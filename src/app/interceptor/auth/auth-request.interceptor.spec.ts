import { TestBed } from '@angular/core/testing';

import { AuthRequestInterceptor } from './auth-request.interceptor';

describe('AuthRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthRequestInterceptor = TestBed.inject(AuthRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
