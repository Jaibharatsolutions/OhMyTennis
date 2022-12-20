import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertopnavbarComponent } from './usertopnavbar.component';

describe('UsertopnavbarComponent', () => {
  let component: UsertopnavbarComponent;
  let fixture: ComponentFixture<UsertopnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertopnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertopnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
