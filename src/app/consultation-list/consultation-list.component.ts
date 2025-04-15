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
  displayedColumns: string[] = ['id', 'date', 'statut', 'description', 'actions'];

  constructor(
    private consultationService: ConsultationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.consultationService.getConsultations().subscribe({
      next: (data) => (this.consultations = data),
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
}