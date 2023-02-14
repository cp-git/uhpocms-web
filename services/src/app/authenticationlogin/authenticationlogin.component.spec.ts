import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationloginComponent } from './authenticationlogin.component';

describe('AuthenticationloginComponent', () => {
  let component: AuthenticationloginComponent;
  let fixture: ComponentFixture<AuthenticationloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
