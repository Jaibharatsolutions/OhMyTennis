import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CoachPasswordComponent } from "./coach-password.component";

describe("CoachPasswordComponent", () => {
  let component: CoachPasswordComponent;
  let fixture: ComponentFixture<CoachPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoachPasswordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
