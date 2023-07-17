import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCheckboxComponent } from './module-checkbox.component';

describe('ModuleCheckboxComponent', () => {
  let component: ModuleCheckboxComponent;
  let fixture: ComponentFixture<ModuleCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
