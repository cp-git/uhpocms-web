import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneuploadComponent } from './view-oneupload.component';

describe('ViewOneuploadComponent', () => {
  let component: ViewOneuploadComponent;
  let fixture: ComponentFixture<ViewOneuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOneuploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
