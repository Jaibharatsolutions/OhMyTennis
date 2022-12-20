import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PremiermatchComponent } from "./premiermatch.component";

describe("PremiermatchComponent", () => {
  let component: PremiermatchComponent;
  let fixture: ComponentFixture<PremiermatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PremiermatchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiermatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
