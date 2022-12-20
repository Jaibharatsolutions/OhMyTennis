import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PetticesComponent } from "./pettices.component";

describe("PetticesComponent", () => {
  let component: PetticesComponent;
  let fixture: ComponentFixture<PetticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetticesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
