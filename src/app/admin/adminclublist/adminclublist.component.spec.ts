import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminclublistlistComponent } from './adminclublistlist.component';

describe('AdminclublistlistComponent', () => {
  let component: AdminclublistlistComponent;
  let fixture: ComponentFixture<AdminclublistlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminclublistlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminclublistlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
