import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserleftpanelcomponentComponent } from './userleftpanelcomponent.component';

describe('UserleftpanelcomponentComponent', () => {
  let component: UserleftpanelcomponentComponent;
  let fixture: ComponentFixture<UserleftpanelcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserleftpanelcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserleftpanelcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
