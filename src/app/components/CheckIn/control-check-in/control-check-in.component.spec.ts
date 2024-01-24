import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCheckInComponent } from './control-check-in.component';

describe('ControlCheckInComponent', () => {
  let component: ControlCheckInComponent;
  let fixture: ComponentFixture<ControlCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlCheckInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
