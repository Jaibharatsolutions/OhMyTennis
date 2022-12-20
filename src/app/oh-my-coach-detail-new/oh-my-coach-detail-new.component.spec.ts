import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OhMyCoachDetailNewComponent } from "./oh-my-coach-detail-new.component";

describe("OhMyCoachDetailNewComponent", () => {
  let component: OhMyCoachDetailNewComponent;
  let fixture: ComponentFixture<OhMyCoachDetailNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OhMyCoachDetailNewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhMyCoachDetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
