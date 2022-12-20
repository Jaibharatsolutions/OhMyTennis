import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PremiertournoiComponent } from "./premiertournoi.component";

describe("PremiertournoiComponent", () => {
  let component: PremiertournoiComponent;
  let fixture: ComponentFixture<PremiertournoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PremiertournoiComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiertournoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
