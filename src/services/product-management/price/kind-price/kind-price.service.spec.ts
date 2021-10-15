import { TestBed } from '@angular/core/testing';

import { KindPriceService } from './kind-price.service';

describe('KindPriceService', () => {
  let service: KindPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KindPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
