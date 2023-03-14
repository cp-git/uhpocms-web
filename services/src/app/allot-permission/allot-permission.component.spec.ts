import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotPermissionComponent } from './allot-permission.component';

describe('AllotPermissionComponent', () => {
  let component: AllotPermissionComponent;
  let fixture: ComponentFixture<AllotPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllotPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllotPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
