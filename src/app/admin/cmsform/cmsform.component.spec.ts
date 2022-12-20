import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CmsformComponent } from "./cmsform.component";

describe("CmsformComponent", () => {
  let component: CmsformComponent;
  let fixture: ComponentFixture<CmsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CmsformComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
