import { TestBed } from '@angular/core/testing';

import { ReturnProductService } from './return-product.service';

describe('ReturnProductService', () => {
  let service: ReturnProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
