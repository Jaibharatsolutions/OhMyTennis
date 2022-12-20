import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnimationDetailComponent } from './user-animation-detail.component';

describe('UserAnimationDetailComponent', () => {
  let component: UserAnimationDetailComponent;
  let fixture: ComponentFixture<UserAnimationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAnimationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnimationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
