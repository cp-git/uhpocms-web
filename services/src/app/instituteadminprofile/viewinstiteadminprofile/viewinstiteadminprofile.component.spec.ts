import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinstiteadminprofileComponent } from './viewinstiteadminprofile.component';

describe('ViewinstiteadminprofileComponent', () => {
  let component: ViewinstiteadminprofileComponent;
  let fixture: ComponentFixture<ViewinstiteadminprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewinstiteadminprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewinstiteadminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
