import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CmsFrontComponent } from "./cms-front.component";

describe("CmsFrontComponent", () => {
  let component: CmsFrontComponent;
  let fixture: ComponentFixture<CmsFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CmsFrontComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
