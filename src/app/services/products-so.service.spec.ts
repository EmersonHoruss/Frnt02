import { TestBed } from '@angular/core/testing';

import { ProductsSOService } from './products-so.service';

describe('ProductsSOService', () => {
  let service: ProductsSOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsSOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
