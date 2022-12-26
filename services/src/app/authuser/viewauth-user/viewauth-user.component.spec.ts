import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewauthUserComponent } from './viewauth-user.component';

describe('ViewauthUserComponent', () => {
  let component: ViewauthUserComponent;
  let fixture: ComponentFixture<ViewauthUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewauthUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewauthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
