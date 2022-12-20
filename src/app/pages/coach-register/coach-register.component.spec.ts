import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachRegisterComponent } from './coach-register.component';

describe('CoachRegisterComponent', () => {
  let component: CoachRegisterComponent;
  let fixture: ComponentFixture<CoachRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
