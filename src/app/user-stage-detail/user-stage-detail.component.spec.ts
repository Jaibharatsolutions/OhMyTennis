import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStageDetailComponent } from './user-stage-detail.component';

describe('UserStageDetailComponent', () => {
  let component: UserStageDetailComponent;
  let fixture: ComponentFixture<UserStageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
