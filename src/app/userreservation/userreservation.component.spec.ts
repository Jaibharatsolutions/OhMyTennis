import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserreservationComponent } from './userreservation.component';

describe('UserreservationComponent', () => {
  let component: UserreservationComponent;
  let fixture: ComponentFixture<UserreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
