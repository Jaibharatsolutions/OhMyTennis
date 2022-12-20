import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserparterComponent } from './userparter.component';

describe('UserparterComponent', () => {
  let component: UserparterComponent;
  let fixture: ComponentFixture<UserparterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserparterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserparterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
