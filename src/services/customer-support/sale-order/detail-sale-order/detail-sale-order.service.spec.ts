import { TestBed } from '@angular/core/testing';

import { DetailSaleOrderService } from './detail-sale-order.service';

describe('DetailSaleOrderService', () => {
  let service: DetailSaleOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailSaleOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
