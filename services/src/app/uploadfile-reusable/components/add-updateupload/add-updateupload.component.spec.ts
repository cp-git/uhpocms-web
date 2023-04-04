import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateuploadComponent } from './add-updateupload.component';

describe('AddUpdateuploadComponent', () => {
  let component: AddUpdateuploadComponent;
  let fixture: ComponentFixture<AddUpdateuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateuploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
