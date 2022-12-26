import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewadminroleComponent } from './viewadminrole.component';

describe('ViewadminroleComponent', () => {
  let component: ViewadminroleComponent;
  let fixture: ComponentFixture<ViewadminroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewadminroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewadminroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
