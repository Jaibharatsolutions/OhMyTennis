import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChoisirComponent } from "./choisir.component";

describe("ChoisirComponent", () => {
  let component: ChoisirComponent;
  let fixture: ComponentFixture<ChoisirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChoisirComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoisirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
