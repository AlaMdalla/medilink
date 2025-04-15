import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionService } from '../Services/prescription.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit {
  prescriptionForm: FormGroup;
  isEditMode = false;
  prescriptionId?: number;

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.prescriptionForm = this.fb.group({
      doctorId: ['', Validators.required],
      patientId: ['', Validators.required],
      date: ['', Validators.required],
      medicationList: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.prescriptionId = +id;
        this.prescriptionService.getPrescriptionById(this.prescriptionId).subscribe({
          next: (prescription) => {
            this.prescriptionForm.patchValue(prescription);
          },
          error: () => this.snackBar.open('Error loading prescription', 'Close', { duration: 3000 })
        });
      }
    });
  }

  onSubmit(): void {
    if (this.prescriptionForm.valid) {
      const prescription = this.prescriptionForm.value;
      if (this.isEditMode && this.prescriptionId) {
        this.prescriptionService.updatePrescription(this.prescriptionId, prescription).subscribe({
          next: () => {
            this.snackBar.open('Prescription updated', 'Close', { duration: 2000 });
            this.router.navigate(['/prescriptions']);
          },
          error: () => this.snackBar.open('Error updating prescription', 'Close', { duration: 3000 })
        });
      } else {
        this.prescriptionService.createPrescription(prescription).subscribe({
          next: () => {
            this.snackBar.open('Prescription created', 'Close', { duration: 2000 });
            this.router.navigate(['/prescriptions']);
          },
          error: () => this.snackBar.open('Error creating prescription', 'Close', { duration: 3000 })
        });
      }
    }
  }
  onCancel(): void {
    this.router.navigate(['/prescriptions']);
  }
}