import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HistoireSecondComponent } from "./histoire-second.component";

describe("HistoireSecondComponent", () => {
  let component: HistoireSecondComponent;
  let fixture: ComponentFixture<HistoireSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoireSecondComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoireSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
