import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseonClubComponent } from './courseon-club.component';

describe('CourseonClubComponent', () => {
  let component: CourseonClubComponent;
  let fixture: ComponentFixture<CourseonClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseonClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseonClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
