import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersparringComponent } from './usersparring.component';

describe('UsersparringComponent', () => {
  let component: UsersparringComponent;
  let fixture: ComponentFixture<UsersparringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersparringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersparringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
