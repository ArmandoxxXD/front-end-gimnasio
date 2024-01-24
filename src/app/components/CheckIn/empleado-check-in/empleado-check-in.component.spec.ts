import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoCheckInComponent } from './empleado-check-in.component';

describe('EmpleadoCheckInComponent', () => {
  let component: EmpleadoCheckInComponent;
  let fixture: ComponentFixture<EmpleadoCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoCheckInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
