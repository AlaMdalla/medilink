import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../Services/prescription.service';
import { Prescription } from '../models/prescription';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  prescriptions: Prescription[] = [];
  displayedColumns: string[] = ['id', 'doctorId', 'patientId', 'date', 'medicationList', 'actions'];

  constructor(
    private prescriptionService: PrescriptionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {
    this.prescriptionService.getPrescriptions().subscribe({
      next: (data) => (this.prescriptions = data),
      error: () => this.snackBar.open('Error loading prescriptions', 'Close', { duration: 3000 })
    });
  }

  deletePrescription(id: number): void {
    if (confirm('Are you sure you want to delete this prescription?')) {
      this.prescriptionService.deletePrescription(id).subscribe({
        next: () => {
          this.snackBar.open('Prescription deleted', 'Close', { duration: 2000 });
          this.loadPrescriptions();
        },
        error: () => this.snackBar.open('Error deleting prescription', 'Close', { duration: 3000 })
      });
    }
  }
}