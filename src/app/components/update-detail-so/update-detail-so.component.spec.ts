import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetailSOComponent } from './update-detail-so.component';

describe('UpdateDetailSOComponent', () => {
  let component: UpdateDetailSOComponent;
  let fixture: ComponentFixture<UpdateDetailSOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDetailSOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
