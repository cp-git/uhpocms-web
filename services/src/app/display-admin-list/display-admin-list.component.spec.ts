import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAdminListComponent } from './display-admin-list.component';

describe('DisplayAdminListComponent', () => {
  let component: DisplayAdminListComponent;
  let fixture: ComponentFixture<DisplayAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAdminListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
