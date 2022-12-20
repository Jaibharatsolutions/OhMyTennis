import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { JeuxconcourComponent } from "./jeuxconcour.component";

describe("JeuxconcourComponent", () => {
  let component: JeuxconcourComponent;
  let fixture: ComponentFixture<JeuxconcourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JeuxconcourComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeuxconcourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
