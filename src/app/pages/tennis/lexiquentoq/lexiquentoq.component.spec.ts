import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LexiquentoqComponent } from "./lexiquentoq.component";

describe("LexiquentoqComponent", () => {
  let component: LexiquentoqComponent;
  let fixture: ComponentFixture<LexiquentoqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LexiquentoqComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LexiquentoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
