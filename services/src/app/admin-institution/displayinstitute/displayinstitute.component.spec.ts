import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayinstituteComponent } from './displayinstitute.component';

describe('DisplayinstituteComponent', () => {
  let component: DisplayinstituteComponent;
  let fixture: ComponentFixture<DisplayinstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayinstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayinstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
