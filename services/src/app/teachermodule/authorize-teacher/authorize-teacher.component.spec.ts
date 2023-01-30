import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeTeacherComponent } from './authorize-teacher.component';

describe('AuthorizeTeacherComponent', () => {
  let component: AuthorizeTeacherComponent;
  let fixture: ComponentFixture<AuthorizeTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
