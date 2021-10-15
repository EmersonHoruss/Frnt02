import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySaleOrderComponent } from './pay-sale-order.component';

describe('PaySaleOrderComponent', () => {
  let component: PaySaleOrderComponent;
  let fixture: ComponentFixture<PaySaleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaySaleOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaySaleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
