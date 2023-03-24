import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDepartmentComponent } from './course-department.component';

describe('CourseDepartmentComponent', () => {
  let component: CourseDepartmentComponent;
  let fixture: ComponentFixture<CourseDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
