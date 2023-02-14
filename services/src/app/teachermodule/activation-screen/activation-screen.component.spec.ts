import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationScreenComponent } from './activation-screen.component';

describe('ActivationScreenComponent', () => {
  let component: ActivationScreenComponent;
  let fixture: ComponentFixture<ActivationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
