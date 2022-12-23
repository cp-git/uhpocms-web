import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstituteAdminComponent } from './view-institute-admin.component';

describe('ViewInstituteAdminComponent', () => {
  let component: ViewInstituteAdminComponent;
  let fixture: ComponentFixture<ViewInstituteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstituteAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInstituteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
