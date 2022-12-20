import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminprospecteditComponent } from './adminprospectedit.component';

describe('AdminprospecteditComponent', () => {
  let component: AdminprospecteditComponent;
  let fixture: ComponentFixture<AdminprospecteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminprospecteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminprospecteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
