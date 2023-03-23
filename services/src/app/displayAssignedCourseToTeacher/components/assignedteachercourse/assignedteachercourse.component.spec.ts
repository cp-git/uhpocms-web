import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedteachercourseComponent } from './assignedteachercourse.component';

describe('AssignedteachercourseComponent', () => {
  let component: AssignedteachercourseComponent;
  let fixture: ComponentFixture<AssignedteachercourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedteachercourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedteachercourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
