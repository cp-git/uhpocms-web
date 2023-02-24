import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollstudentComponent } from './enrollstudent.component';

describe('EnrollstudentComponent', () => {
  let component: EnrollstudentComponent;
  let fixture: ComponentFixture<EnrollstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollstudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
