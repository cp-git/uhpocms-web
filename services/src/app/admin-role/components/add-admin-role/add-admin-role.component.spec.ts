import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminRoleComponent } from './add-admin-role.component';

describe('AddAdminRoleComponent', () => {
  let component: AddAdminRoleComponent;
  let fixture: ComponentFixture<AddAdminRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
