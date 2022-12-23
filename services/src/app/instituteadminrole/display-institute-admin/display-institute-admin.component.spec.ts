import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInstituteAdminComponent } from './display-institute-admin.component';

describe('DisplayInstituteAdminComponent', () => {
  let component: DisplayInstituteAdminComponent;
  let fixture: ComponentFixture<DisplayInstituteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayInstituteAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayInstituteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
