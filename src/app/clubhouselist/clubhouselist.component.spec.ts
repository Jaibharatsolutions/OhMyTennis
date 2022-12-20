import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubhouselistComponent } from './clubhouselist.component';

describe('ClubhouselistComponent', () => {
  let component: ClubhouselistComponent;
  let fixture: ComponentFixture<ClubhouselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubhouselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubhouselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
