import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneAuthUserComponent } from './view-one-auth-user.component';

describe('ViewOneAuthUserComponent', () => {
  let component: ViewOneAuthUserComponent;
  let fixture: ComponentFixture<ViewOneAuthUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOneAuthUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneAuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
