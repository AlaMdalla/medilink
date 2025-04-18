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
  filteredPrescriptions: Prescription[] = [];
  displayedColumns: string[] = ['id', 'doctorId', 'patientId', 'date', 'medicationList', 'actions'];
  searchMedication: string = '';
  sortOrder: 'asc' | 'desc' | 'none' = 'none';

  constructor(
    private prescriptionService: PrescriptionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {
    this.prescriptionService.getPrescriptions().subscribe({
      next: (data) => {
        this.prescriptions = data;
        this.applyFiltersAndSort(); // Apply filters and sorting after loading
      },
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

  // Filter by medication
  filterByMedication(): void {
    if (!this.searchMedication.trim()) {
      this.filteredPrescriptions = [...this.prescriptions];
    } else {
      const term = this.searchMedication.toLowerCase();
      this.filteredPrescriptions = this.prescriptions.filter(prescription =>
        prescription.medicationList.toLowerCase().includes(term)
      );
    }
    this.applySort(); // Re-apply sorting after filtering
  }

  // Sort by date
  applySort(): void {
    if (this.sortOrder === 'none') {
      this.filteredPrescriptions = [...this.filteredPrescriptions];
    } else {
      this.filteredPrescriptions.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }
  }

  // Apply both filters and sorting
  applyFiltersAndSort(): void {
    this.filterByMedication();
    this.applySort();
  }

  // Handle medication search input change
  onSearchMedicationChange(): void {
    this.applyFiltersAndSort();
  }

  // Handle sort order change
  onSortChange(order: 'asc' | 'desc' | 'none'): void {
    this.sortOrder = order;
    this.applyFiltersAndSort();
  }
}