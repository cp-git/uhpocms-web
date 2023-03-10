import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAuthUserComponent } from './view-all-auth-user.component';

describe('ViewAllAuthUserComponent', () => {
  let component: ViewAllAuthUserComponent;
  let fixture: ComponentFixture<ViewAllAuthUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllAuthUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllAuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
