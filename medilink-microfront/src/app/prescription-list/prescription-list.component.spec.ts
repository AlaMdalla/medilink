import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionListComponent } from './prescription-list.component';

describe('PrescriptionListComponent', () => {
  let component: PrescriptionListComponent;
  let fixture: ComponentFixture<PrescriptionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescriptionListComponent]
    });
    fixture = TestBed.createComponent(PrescriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
