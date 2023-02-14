import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmdouleComponent } from './adminmdoule.component';

describe('AdminmdouleComponent', () => {
  let component: AdminmdouleComponent;
  let fixture: ComponentFixture<AdminmdouleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmdouleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmdouleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
