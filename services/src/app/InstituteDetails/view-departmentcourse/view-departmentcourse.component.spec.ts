import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepartmentcourseComponent } from './view-departmentcourse.component';

describe('ViewDepartmentcourseComponent', () => {
  let component: ViewDepartmentcourseComponent;
  let fixture: ComponentFixture<ViewDepartmentcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDepartmentcourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDepartmentcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
