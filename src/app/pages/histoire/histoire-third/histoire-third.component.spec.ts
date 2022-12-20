import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HistoireThirdComponent } from "./histoire-third.component";

describe("HistoireThirdComponent", () => {
  let component: HistoireThirdComponent;
  let fixture: ComponentFixture<HistoireThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoireThirdComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoireThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
