import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateadminroleComponent } from './updateadminrole.component';

describe('UpdateadminroleComponent', () => {
  let component: UpdateadminroleComponent;
  let fixture: ComponentFixture<UpdateadminroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateadminroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateadminroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
