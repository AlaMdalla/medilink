import { Component, OnInit } from '@angular/core';
import { ConsultationService } from '../Services/consultation.service';
import { Consultation } from '../models/consultation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.css']
})
export class ConsultationListComponent implements OnInit {
  consultations: Consultation[] = [];
  filteredConsultations: Consultation[] = [];
  displayedColumns: string[] = ['id', 'date', 'statut', 'description', 'actions'];
  searchDescription: string = '';
  sortOrder: 'asc' | 'desc' | 'none' = 'none';

  constructor(
    private consultationService: ConsultationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.consultationService.getConsultations().subscribe({
      next: (data) => {
        this.consultations = data;
        this.applyFiltersAndSort(); // Apply filters and sorting after loading
      },
      error: () => this.snackBar.open('Error loading consultations', 'Close', { duration: 3000 })
    });
  }

  deleteConsultation(id: number): void {
    if (confirm('Are you sure you want to delete this consultation?')) {
      this.consultationService.deleteConsultation(id).subscribe({
        next: () => {
          this.snackBar.open('Consultation deleted', 'Close', { duration: 2000 });
          this.loadConsultations();
        },
        error: () => this.snackBar.open('Error deleting consultation', 'Close', { duration: 3000 })
      });
    }
  }

  // Filter by description
  filterByDescription(): void {
    if (!this.searchDescription.trim()) {
      this.filteredConsultations = [...this.consultations];
    } else {
      const term = this.searchDescription.toLowerCase();
      this.filteredConsultations = this.consultations.filter(consultation =>
        consultation.description.toLowerCase().includes(term)
      );
    }
    this.applySort(); // Re-apply sorting after filtering
  }

  // Sort by dateConsultation
  applySort(): void {
    if (this.sortOrder === 'none') {
      this.filteredConsultations = [...this.filteredConsultations];
    } else {
      this.filteredConsultations.sort((a, b) => {
        const dateA = new Date(a.dateConsultation).getTime();
        const dateB = new Date(b.dateConsultation).getTime();
        return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }
  }

  // Apply both filters and sorting
  applyFiltersAndSort(): void {
    this.filterByDescription();
    this.applySort();
  }

  // Handle description search input change
  onSearchDescriptionChange(): void {
    this.applyFiltersAndSort();
  }

  // Handle sort order change
  onSortChange(order: 'asc' | 'desc' | 'none'): void {
    this.sortOrder = order;
    this.applyFiltersAndSort();
  }
}