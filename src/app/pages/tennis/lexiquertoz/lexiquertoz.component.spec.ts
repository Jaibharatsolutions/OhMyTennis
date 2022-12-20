import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LexiquertozComponent } from "./lexiquertoz.component";

describe("LexiquertozComponent", () => {
  let component: LexiquertozComponent;
  let fixture: ComponentFixture<LexiquertozComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LexiquertozComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LexiquertozComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
