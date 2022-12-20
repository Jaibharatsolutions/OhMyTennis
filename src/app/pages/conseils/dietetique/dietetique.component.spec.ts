import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DietetiqueComponent } from "./dietetique.component";

describe("DietetiqueComponent", () => {
  let component: DietetiqueComponent;
  let fixture: ComponentFixture<DietetiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DietetiqueComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietetiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
