import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverSaleComponent } from './deliver-sale.component';

describe('DeliverSaleComponent', () => {
  let component: DeliverSaleComponent;
  let fixture: ComponentFixture<DeliverSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
