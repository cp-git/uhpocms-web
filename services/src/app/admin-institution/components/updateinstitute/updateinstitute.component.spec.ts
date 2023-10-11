import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateinstituteComponent } from './updateinstitute.component';

describe('UpdateinstituteComponent', () => {
  let component: UpdateinstituteComponent;
  let fixture: ComponentFixture<UpdateinstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateinstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateinstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
