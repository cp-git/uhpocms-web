import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleFileComponent } from './module-file.component';

describe('ModuleFileComponent', () => {
  let component: ModuleFileComponent;
  let fixture: ComponentFixture<ModuleFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
