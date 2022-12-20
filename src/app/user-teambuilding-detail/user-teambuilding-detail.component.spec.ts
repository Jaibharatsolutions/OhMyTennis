import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeambuildingDetailComponent } from './user-teambuilding-detail.component';

describe('UserTeambuildingDetailComponent', () => {
  let component: UserTeambuildingDetailComponent;
  let fixture: ComponentFixture<UserTeambuildingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTeambuildingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeambuildingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
