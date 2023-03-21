import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDepartmentComponent } from './activate-department.component';

describe('ActivateDepartmentComponent', () => {
  let component: ActivateDepartmentComponent;
  let fixture: ComponentFixture<ActivateDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
