import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneAdminRoleComponent } from './view-one-admin-role.component';

describe('ViewOneAdminRoleComponent', () => {
  let component: ViewOneAdminRoleComponent;
  let fixture: ComponentFixture<ViewOneAdminRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOneAdminRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneAdminRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
