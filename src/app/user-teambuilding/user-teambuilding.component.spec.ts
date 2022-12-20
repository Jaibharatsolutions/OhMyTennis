import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeambuildingComponent } from './user-teambuilding.component';

describe('UserTeambuildingComponent', () => {
  let component: UserTeambuildingComponent;
  let fixture: ComponentFixture<UserTeambuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTeambuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeambuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
