import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactnewComponent } from './contactnew.component';

describe('ContactnewComponent', () => {
  let component: ContactnewComponent;
  let fixture: ComponentFixture<ContactnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
