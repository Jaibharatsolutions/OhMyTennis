import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LacharteComponent } from "./lacharte.component";

describe("LacharteComponent", () => {
  let component: LacharteComponent;
  let fixture: ComponentFixture<LacharteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LacharteComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LacharteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
