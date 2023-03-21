import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveTeacherCourseComponent } from './inactive-teacher-course.component';

describe('InactiveTeacherCourseComponent', () => {
  let component: InactiveTeacherCourseComponent;
  let fixture: ComponentFixture<InactiveTeacherCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveTeacherCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactiveTeacherCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
