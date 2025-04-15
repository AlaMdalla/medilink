import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../Services/rendez-vous.service';
import { RendezVous } from '../models/rendez-vous';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rendezvous-list',
  templateUrl: './rendezvous-list.component.html',
  styleUrls: ['./rendezvous-list.component.css']
})
export class RendezVousListComponent implements OnInit {
  rendezVousList: RendezVous[] = [];

  constructor(
    private rendezVousService: RendezVousService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRendezVous();
  }

  loadRendezVous(): void {
    this.rendezVousService.getAll().subscribe({
      next: (data) => (this.rendezVousList = data),
      error: (err) => console.error('Error loading rendez-vous:', err),
    });
  }

  editRendezVous(rendezVous: RendezVous): void {
    this.router.navigate(['/rendezvous-form'], { state: { rendezVous } });
  }

  deleteRendezVous(id: number): void {
    if (confirm('Are you sure you want to delete this rendez-vous?')) {
      this.rendezVousService.delete(id).subscribe({
        next: () => this.loadRendezVous(), // Refresh list after deletion
        error: (err) => console.error('Error deleting rendez-vous:', err),
      });
    }
  }
}