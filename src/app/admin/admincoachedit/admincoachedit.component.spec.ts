import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincoacheditComponent } from './admincoachedit.component';

describe('AdmincoacheditComponent', () => {
  let component: AdmincoacheditComponent;
  let fixture: ComponentFixture<AdmincoacheditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincoacheditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincoacheditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
