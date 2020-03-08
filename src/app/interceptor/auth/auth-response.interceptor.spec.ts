import { TestBed } from '@angular/core/testing';

import { AuthResponseInterceptor } from './auth-response.interceptor';

describe('AuthResponseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthResponseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthResponseInterceptor = TestBed.inject(AuthResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
