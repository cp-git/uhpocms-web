import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminRoleComponent } from './update-admin-role.component';

describe('UpdateAdminRoleComponent', () => {
  let component: UpdateAdminRoleComponent;
  let fixture: ComponentFixture<UpdateAdminRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdminRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdminRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
