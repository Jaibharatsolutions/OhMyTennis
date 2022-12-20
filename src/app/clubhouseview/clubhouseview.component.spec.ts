import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubhouseviewComponent } from './clubhouseview.component';

describe('ClubhouseviewComponent', () => {
  let component: ClubhouseviewComponent;
  let fixture: ComponentFixture<ClubhouseviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubhouseviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubhouseviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
