import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideDesTerrainsPratiqueComponent } from './guide-des-terrains-pratique.component';

describe('GuideDesTerrainsPratiqueComponent', () => {
  let component: GuideDesTerrainsPratiqueComponent;
  let fixture: ComponentFixture<GuideDesTerrainsPratiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideDesTerrainsPratiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideDesTerrainsPratiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
