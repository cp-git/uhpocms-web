import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAdminroleComponent } from './display-adminrole.component';

describe('DisplayAdminroleComponent', () => {
  let component: DisplayAdminroleComponent;
  let fixture: ComponentFixture<DisplayAdminroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAdminroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAdminroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
