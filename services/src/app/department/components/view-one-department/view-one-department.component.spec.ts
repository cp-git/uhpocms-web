import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneDepartmentComponent } from './view-one-department.component';

describe('ViewOneDepartmentComponent', () => {
  let component: ViewOneDepartmentComponent;
  let fixture: ComponentFixture<ViewOneDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOneDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
