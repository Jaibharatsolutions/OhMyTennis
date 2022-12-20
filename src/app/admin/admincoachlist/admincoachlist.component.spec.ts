import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincoachlistComponent } from './admincoachlist.component';

describe('AdmincoachlistComponent', () => {
  let component: AdmincoachlistComponent;
  let fixture: ComponentFixture<AdmincoachlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincoachlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincoachlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
