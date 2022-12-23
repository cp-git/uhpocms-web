import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstituteAdminComponent } from './update-institute-admin.component';

describe('UpdateInstituteAdminComponent', () => {
  let component: UpdateInstituteAdminComponent;
  let fixture: ComponentFixture<UpdateInstituteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInstituteAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInstituteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
