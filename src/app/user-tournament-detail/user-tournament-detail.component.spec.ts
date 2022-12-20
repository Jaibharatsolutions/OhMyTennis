import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTournamentDetailComponent } from './user-tournament-detail.component';

describe('UserTournamentDetailComponent', () => {
  let component: UserTournamentDetailComponent;
  let fixture: ComponentFixture<UserTournamentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTournamentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTournamentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
