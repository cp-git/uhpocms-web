import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAuthUserComponent } from './insert-auth-user.component';

describe('InsertAuthUserComponent', () => {
  let component: InsertAuthUserComponent;
  let fixture: ComponentFixture<InsertAuthUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertAuthUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertAuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
