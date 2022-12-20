import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PremierepartieComponent } from "./premierepartie.component";

describe("PremierepartieComponent", () => {
  let component: PremierepartieComponent;
  let fixture: ComponentFixture<PremierepartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PremierepartieComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremierepartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
