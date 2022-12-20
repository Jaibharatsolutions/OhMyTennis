import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OhMyCoachComponent } from './oh-my-coach-detail.component';

describe('OhMyCoachComponent', () => {
  let component: OhMyCoachComponent;
  let fixture: ComponentFixture<OhMyCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhMyCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhMyCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
