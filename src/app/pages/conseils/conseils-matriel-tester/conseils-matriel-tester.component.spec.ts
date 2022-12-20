import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConseilsMatrielTesterComponent } from "./conseils-matriel-tester.component";

describe("ConseilsMatrielTesterComponent", () => {
  let component: ConseilsMatrielTesterComponent;
  let fixture: ComponentFixture<ConseilsMatrielTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConseilsMatrielTesterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConseilsMatrielTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
