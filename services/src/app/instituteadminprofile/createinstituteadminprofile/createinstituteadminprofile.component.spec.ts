import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateinstituteadminprofileComponent } from './createinstituteadminprofile.component';

describe('CreateinstituteadminprofileComponent', () => {
  let component: CreateinstituteadminprofileComponent;
  let fixture: ComponentFixture<CreateinstituteadminprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateinstituteadminprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateinstituteadminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
