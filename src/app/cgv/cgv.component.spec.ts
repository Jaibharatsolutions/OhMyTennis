import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CGVComponent } from './cgv.component';

describe('CGVComponent', () => {
  let component: CGVComponent;
  let fixture: ComponentFixture<CGVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CGVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CGVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
