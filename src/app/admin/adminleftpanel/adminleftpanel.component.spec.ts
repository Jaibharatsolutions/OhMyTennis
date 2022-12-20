import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminleftpanelComponent } from './adminleftpanel.component';

describe('AdminleftpanelComponent', () => {
  let component: AdminleftpanelComponent;
  let fixture: ComponentFixture<AdminleftpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminleftpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminleftpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
