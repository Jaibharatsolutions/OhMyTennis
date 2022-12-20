import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OhMyEventComponent } from "./oh-my-event.component";

describe("OhMyEventComponent", () => {
  let component: OhMyEventComponent;
  let fixture: ComponentFixture<OhMyEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OhMyEventComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhMyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
