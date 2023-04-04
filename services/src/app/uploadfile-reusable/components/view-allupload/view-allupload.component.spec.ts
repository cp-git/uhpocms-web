import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAlluploadComponent } from './view-allupload.component';

describe('ViewAlluploadComponent', () => {
  let component: ViewAlluploadComponent;
  let fixture: ComponentFixture<ViewAlluploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAlluploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAlluploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
