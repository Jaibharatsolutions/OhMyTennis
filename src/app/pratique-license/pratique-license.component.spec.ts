import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PratiqueLicenseComponent } from './pratique-license.component';

describe('PratiqueLicenseComponent', () => {
  let component: PratiqueLicenseComponent;
  let fixture: ComponentFixture<PratiqueLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PratiqueLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PratiqueLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
