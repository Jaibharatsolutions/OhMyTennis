import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserchangepasswordComponent } from './userchangepassword.component';

describe('UserchangepasswordComponent', () => {
  let component: UserchangepasswordComponent;
  let fixture: ComponentFixture<UserchangepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserchangepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserchangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
