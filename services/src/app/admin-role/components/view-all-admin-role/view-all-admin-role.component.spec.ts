import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAdminRoleComponent } from './view-all-admin-role.component';

describe('ViewAllAdminRoleComponent', () => {
  let component: ViewAllAdminRoleComponent;
  let fixture: ComponentFixture<ViewAllAdminRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllAdminRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllAdminRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
