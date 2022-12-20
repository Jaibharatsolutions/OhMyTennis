import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { editDynamicMenuComponent } from "./editDynamicMenu.component";

describe("editDynamicMenuComponent", () => {
  let component: editDynamicMenuComponent;
  let fixture: ComponentFixture<editDynamicMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [editDynamicMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(editDynamicMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
