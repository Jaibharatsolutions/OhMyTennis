import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBuildingComponent } from './team-building.component';

describe('TeamBuildingComponent', () => {
  let component: TeamBuildingComponent;
  let fixture: ComponentFixture<TeamBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
