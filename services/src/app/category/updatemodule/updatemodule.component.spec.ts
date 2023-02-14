import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemoduleComponent } from './updatemodule.component';

describe('UpdatemoduleComponent', () => {
  let component: UpdatemoduleComponent;
  let fixture: ComponentFixture<UpdatemoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatemoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatemoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
