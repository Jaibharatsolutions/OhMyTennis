import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OffreDeServiceCoachTennisComponent } from "./offre-de-service-coach-tennis.component";

describe("OffreDeServiceCoachTennisComponent", () => {
  let component: OffreDeServiceCoachTennisComponent;
  let fixture: ComponentFixture<OffreDeServiceCoachTennisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OffreDeServiceCoachTennisComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreDeServiceCoachTennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
