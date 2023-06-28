import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewQueAnsComponent } from './review-que-ans.component';

describe('ReviewQueAnsComponent', () => {
  let component: ReviewQueAnsComponent;
  let fixture: ComponentFixture<ReviewQueAnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewQueAnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewQueAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
