import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFormViewComponent } from './patient-form-view.component';

describe('PatientFormViewComponent', () => {
  let component: PatientFormViewComponent;
  let fixture: ComponentFixture<PatientFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientFormViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
