import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAdminRoleComponent } from './insert-admin-role.component';

describe('InsertAdminRoleComponent', () => {
  let component: InsertAdminRoleComponent;
  let fixture: ComponentFixture<InsertAdminRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertAdminRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertAdminRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
