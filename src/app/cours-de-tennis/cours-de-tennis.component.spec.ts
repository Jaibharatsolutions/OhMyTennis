import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursDeTennisComponent } from './cours-de-tennis.component';

describe('CoursDeTennisComponent', () => {
  let component: CoursDeTennisComponent;
  let fixture: ComponentFixture<CoursDeTennisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursDeTennisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursDeTennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
