import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ParrainerComponent } from "./parrainer.component";

describe("ParrainerComponent", () => {
  let component: ParrainerComponent;
  let fixture: ComponentFixture<ParrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParrainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
