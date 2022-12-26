import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAuthuserComponent } from './display-authuser.component';

describe('DisplayAuthuserComponent', () => {
  let component: DisplayAuthuserComponent;
  let fixture: ComponentFixture<DisplayAuthuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAuthuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAuthuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
