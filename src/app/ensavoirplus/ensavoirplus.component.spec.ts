import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsavoirplusComponent } from './ensavoirplus.component';

describe('EnsavoirplusComponent', () => {
  let component: EnsavoirplusComponent;
  let fixture: ComponentFixture<EnsavoirplusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsavoirplusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsavoirplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
