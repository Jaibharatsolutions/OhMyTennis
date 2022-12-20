import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { dynamicMenuFormComponent } from "./dynamicMenuForm.component";

describe("dynamicMenuFormComponent", () => {
  let component: dynamicMenuFormComponent;
  let fixture: ComponentFixture<dynamicMenuFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [dynamicMenuFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dynamicMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
