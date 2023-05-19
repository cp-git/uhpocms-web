import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchPopupComponent } from './barch-popup.component';

describe('BarchPopupComponent', () => {
  let component: BarchPopupComponent;
  let fixture: ComponentFixture<BarchPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarchPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
