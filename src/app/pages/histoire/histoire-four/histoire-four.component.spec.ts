import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HistoireFourComponent } from "./histoire-four.component";

describe("HistoireFourComponent", () => {
  let component: HistoireFourComponent;
  let fixture: ComponentFixture<HistoireFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoireFourComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoireFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
