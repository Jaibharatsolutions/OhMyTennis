import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormephysiqueComponent } from "./formephysique.component";

describe("FormephysiqueComponent", () => {
  let component: FormephysiqueComponent;
  let fixture: ComponentFixture<FormephysiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormephysiqueComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormephysiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
