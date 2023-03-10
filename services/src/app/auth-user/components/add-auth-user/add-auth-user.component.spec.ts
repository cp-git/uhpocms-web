import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthUserComponent } from './add-auth-user.component';

describe('AddAuthUserComponent', () => {
  let component: AddAuthUserComponent;
  let fixture: ComponentFixture<AddAuthUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAuthUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
