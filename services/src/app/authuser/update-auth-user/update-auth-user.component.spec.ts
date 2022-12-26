import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAuthUserComponent } from './update-auth-user.component';

describe('UpdateAuthUserComponent', () => {
  let component: UpdateAuthUserComponent;
  let fixture: ComponentFixture<UpdateAuthUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAuthUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
