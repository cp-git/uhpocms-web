import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachermoduleComponent } from './teachermodule.component';

describe('TeachermoduleComponent', () => {
  let component: TeachermoduleComponent;
  let fixture: ComponentFixture<TeachermoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeachermoduleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeachermoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
