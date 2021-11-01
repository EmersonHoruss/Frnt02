import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProductsComponent } from './assign-products.component';

describe('AssignProductsComponent', () => {
  let component: AssignProductsComponent;
  let fixture: ComponentFixture<AssignProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
