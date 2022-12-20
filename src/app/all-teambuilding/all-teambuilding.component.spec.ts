import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeambuildingComponent } from './all-teambuilding.component';

describe('AllTeambuildingComponent', () => {
  let component: AllTeambuildingComponent;
  let fixture: ComponentFixture<AllTeambuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTeambuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeambuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
