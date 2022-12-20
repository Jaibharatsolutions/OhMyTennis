import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnimationComponent } from './user-animation.component';

describe('UserAnimationComponent', () => {
  let component: UserAnimationComponent;
  let fixture: ComponentFixture<UserAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
