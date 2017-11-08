import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayComplaintComponent } from './display-complaint.component';

describe('DisplayComplaintComponent', () => {
  let component: DisplayComplaintComponent;
  let fixture: ComponentFixture<DisplayComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayComplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
