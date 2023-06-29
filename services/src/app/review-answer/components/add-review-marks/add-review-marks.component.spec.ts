import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewMarksComponent } from './add-review-marks.component';

describe('AddReviewMarksComponent', () => {
  let component: AddReviewMarksComponent;
  let fixture: ComponentFixture<AddReviewMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReviewMarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReviewMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
