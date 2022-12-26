import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertadminroleComponent } from './insertadminrole.component';

describe('InsertadminroleComponent', () => {
  let component: InsertadminroleComponent;
  let fixture: ComponentFixture<InsertadminroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertadminroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertadminroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
