import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStageComponent } from './all-stage.component';

describe('AllStageComponent', () => {
  let component: AllStageComponent;
  let fixture: ComponentFixture<AllStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
