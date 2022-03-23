import { TestBed } from '@angular/core/testing';

import { InfiniteScrollingService } from './infinite-scrolling.service';

describe('InfiniteScrollingService', () => {
  let service: InfiniteScrollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfiniteScrollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
