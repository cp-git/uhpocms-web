import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationAuthComponent } from './authorization-auth.component';

describe('AuthorizationAuthComponent', () => {
  let component: AuthorizationAuthComponent;
  let fixture: ComponentFixture<AuthorizationAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizationAuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizationAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
