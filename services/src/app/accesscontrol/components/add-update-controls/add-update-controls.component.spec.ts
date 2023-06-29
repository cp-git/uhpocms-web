import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateControlsComponent } from './add-update-controls.component';

describe('AddUpdateControlsComponent', () => {
  let component: AddUpdateControlsComponent;
  let fixture: ComponentFixture<AddUpdateControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
