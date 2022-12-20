import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersignoutComponent } from './usersignout.component';

describe('UsersignoutComponent', () => {
  let component: UsersignoutComponent;
  let fixture: ComponentFixture<UsersignoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersignoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
