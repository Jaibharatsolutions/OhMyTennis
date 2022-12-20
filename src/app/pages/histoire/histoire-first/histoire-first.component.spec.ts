import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HistoireFirstComponent } from "./histoire-first.component";

describe("HistoireFirstComponent", () => {
  let component: HistoireFirstComponent;
  let fixture: ComponentFixture<HistoireFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoireFirstComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoireFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
