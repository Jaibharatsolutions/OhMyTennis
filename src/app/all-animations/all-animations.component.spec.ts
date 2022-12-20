import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnimationsComponent } from './all-animations.component';

describe('AllAnimationsComponent', () => {
  let component: AllAnimationsComponent;
  let fixture: ComponentFixture<AllAnimationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAnimationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
