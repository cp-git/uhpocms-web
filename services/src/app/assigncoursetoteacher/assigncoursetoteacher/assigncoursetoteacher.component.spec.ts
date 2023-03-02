import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigncoursetoteacherComponent } from './assigncoursetoteacher.component';

describe('AssigncoursetoteacherComponent', () => {
  let component: AssigncoursetoteacherComponent;
  let fixture: ComponentFixture<AssigncoursetoteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigncoursetoteacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigncoursetoteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
