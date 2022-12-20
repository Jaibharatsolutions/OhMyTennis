import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LexiqueatodComponent } from "./lexiqueatod.component";

describe("LexiqueatodComponent", () => {
  let component: LexiqueatodComponent;
  let fixture: ComponentFixture<LexiqueatodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LexiqueatodComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LexiqueatodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
