import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmoduleComponent } from './studentmodule.component';

describe('StudentmoduleComponent', () => {
  let component: StudentmoduleComponent;
  let fixture: ComponentFixture<StudentmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentmoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
