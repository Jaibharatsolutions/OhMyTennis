import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LexiqueetomComponent } from "./lexiqueetom.component";

describe("LexiqueetomComponent", () => {
  let component: LexiqueetomComponent;
  let fixture: ComponentFixture<LexiqueetomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LexiqueetomComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LexiqueetomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
