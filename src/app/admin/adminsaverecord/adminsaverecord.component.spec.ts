import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsaverecordComponent } from './adminsaverecord.component';

describe('AdminsaverecordComponent', () => {
  let component: AdminsaverecordComponent;
  let fixture: ComponentFixture<AdminsaverecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsaverecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsaverecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
