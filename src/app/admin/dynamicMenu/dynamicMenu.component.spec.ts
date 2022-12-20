import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { dynamicMenuComponent } from "./dynamicMenu.component";

describe("dynamicMenuComponent", () => {
  let component: dynamicMenuComponent;
  let fixture: ComponentFixture<dynamicMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [dynamicMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dynamicMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
