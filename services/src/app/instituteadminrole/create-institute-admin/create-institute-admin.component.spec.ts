import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstituteAdminComponent } from './create-institute-admin.component';

describe('CreateInstituteAdminComponent', () => {
  let component: CreateInstituteAdminComponent;
  let fixture: ComponentFixture<CreateInstituteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInstituteAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInstituteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
