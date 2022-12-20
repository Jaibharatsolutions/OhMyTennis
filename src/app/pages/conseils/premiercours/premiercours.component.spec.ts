import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PremiercoursComponent } from "./premiercours.component";

describe("PremiercoursComponent", () => {
  let component: PremiercoursComponent;
  let fixture: ComponentFixture<PremiercoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PremiercoursComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiercoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
