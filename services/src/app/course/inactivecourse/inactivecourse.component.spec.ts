import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivecourseComponent } from './inactivecourse.component';

describe('InactivecourseComponent', () => {
  let component: InactivecourseComponent;
  let fixture: ComponentFixture<InactivecourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactivecourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
