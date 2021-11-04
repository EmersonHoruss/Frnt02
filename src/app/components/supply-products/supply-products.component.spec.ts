import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyProductsComponent } from './supply-products.component';

describe('SupplyProductsComponent', () => {
  let component: SupplyProductsComponent;
  let fixture: ComponentFixture<SupplyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
