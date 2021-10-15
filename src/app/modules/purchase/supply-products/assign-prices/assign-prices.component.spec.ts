import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPricesComponent } from './assign-prices.component';

describe('AssignPricesComponent', () => {
  let component: AssignPricesComponent;
  let fixture: ComponentFixture<AssignPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
