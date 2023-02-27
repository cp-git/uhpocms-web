import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursedepartmentComponent } from './coursedepartment.component';

describe('CoursedepartmentComponent', () => {
  let component: CoursedepartmentComponent;
  let fixture: ComponentFixture<CoursedepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursedepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursedepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
