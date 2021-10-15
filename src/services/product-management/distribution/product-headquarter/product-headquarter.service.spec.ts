import { TestBed } from '@angular/core/testing';

import { ProductHeadquarterService } from './product-headquarter.service';

describe('ProductHeadquarterService', () => {
  let service: ProductHeadquarterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductHeadquarterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
