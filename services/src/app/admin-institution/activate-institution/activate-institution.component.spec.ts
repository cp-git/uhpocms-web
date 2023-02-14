import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateInstitutionComponent } from './activate-institution.component';

describe('ActivateInstitutionComponent', () => {
  let component: ActivateInstitutionComponent;
  let fixture: ComponentFixture<ActivateInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateInstitutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
