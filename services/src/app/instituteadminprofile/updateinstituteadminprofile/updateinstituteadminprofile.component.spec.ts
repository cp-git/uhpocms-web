import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateinstituteadminprofileComponent } from './updateinstituteadminprofile.component';

describe('UpdateinstituteadminprofileComponent', () => {
  let component: UpdateinstituteadminprofileComponent;
  let fixture: ComponentFixture<UpdateinstituteadminprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateinstituteadminprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateinstituteadminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
