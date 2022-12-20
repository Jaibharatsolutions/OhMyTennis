import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminprospectlistComponent } from './adminprospectlist.component';

describe('AdminprospectlistComponent', () => {
  let component: AdminprospectlistComponent;
  let fixture: ComponentFixture<AdminprospectlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminprospectlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminprospectlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
