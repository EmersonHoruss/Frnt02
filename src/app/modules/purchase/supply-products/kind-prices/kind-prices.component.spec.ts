import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindPricesComponent } from './kind-prices.component';

describe('KindPricesComponent', () => {
  let component: KindPricesComponent;
  let fixture: ComponentFixture<KindPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
