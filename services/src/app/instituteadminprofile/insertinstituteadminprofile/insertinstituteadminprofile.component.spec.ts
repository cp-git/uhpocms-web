import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertinstituteadminprofileComponent } from './insertinstituteadminprofile.component';

describe('InsertinstituteadminprofileComponent', () => {
  let component: InsertinstituteadminprofileComponent;
  let fixture: ComponentFixture<InsertinstituteadminprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertinstituteadminprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertinstituteadminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
