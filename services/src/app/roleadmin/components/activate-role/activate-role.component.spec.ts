import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateRoleComponent } from './activate-role.component';

describe('ActivateRoleComponent', () => {
  let component: ActivateRoleComponent;
  let fixture: ComponentFixture<ActivateRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
