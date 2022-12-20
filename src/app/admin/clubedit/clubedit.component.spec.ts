import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubeditComponent } from './clubedit.component';

describe('ClubeditComponent', () => {
  let component: ClubeditComponent;
  let fixture: ComponentFixture<ClubeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
