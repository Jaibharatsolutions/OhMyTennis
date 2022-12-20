import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OhMyCoachNewComponent } from "./oh-my-coach-new.component";

describe("OhMyCoachNewComponent", () => {
  let component: OhMyCoachNewComponent;
  let fixture: ComponentFixture<OhMyCoachNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OhMyCoachNewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhMyCoachNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
