import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../Services/rendez-vous.service';
import { RendezVous } from '../models/rendez-vous';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rendezvous-list',
  templateUrl: './rendezvous-list.component.html',
  styleUrls: ['./rendezvous-list.component.css']
})
export class RendezVousListComponent implements OnInit {
  rendezVousList: RendezVous[] = [];
  filteredRendezVous: RendezVous[] = [];
  searchStatus: string = '';
  sortOrder: 'asc' | 'desc' | 'none' = 'none';

  constructor(
    private rendezVousService: RendezVousService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRendezVous();
  }

  loadRendezVous(): void {
    this.rendezVousService.getAll().subscribe({
      next: (data) => {
        this.rendezVousList = data;
        this.applyFiltersAndSort(); // Apply filters and sorting after loading
      },
      error: (err) => console.error('Error loading rendez-vous:', err),
    });
  }

  editRendezVous(rendezVous: RendezVous): void {
    this.router.navigate(['/rendezvous-form'], { state: { rendezVous } });
  }

  deleteRendezVous(id: number | undefined): void {
    if (id === undefined) {
      console.error('Cannot delete rendez-vous: ID is undefined');
      return;
    }
    if (confirm('Are you sure you want to delete this rendez-vous?')) {
      this.rendezVousService.delete(id).subscribe({
        next: () => this.loadRendezVous(), // Refresh list after deletion
        error: (err) => console.error('Error deleting rendez-vous:', err),
      });
    }
  }

  // Filter by status
  filterByStatus(): void {
    if (!this.searchStatus.trim()) {
      this.filteredRendezVous = [...this.rendezVousList];
    } else {
      const term = this.searchStatus.toLowerCase();
      this.filteredRendezVous = this.rendezVousList.filter(rv =>
        rv.status.toLowerCase().includes(term)
      );
    }
    this.applySort(); // Re-apply sorting after filtering
  }

  // Sort by date
  applySort(): void {
    if (this.sortOrder === 'none') {
      this.filteredRendezVous = [...this.filteredRendezVous];
    } else {
      this.filteredRendezVous.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }
  }

  // Apply both filters and sorting
  applyFiltersAndSort(): void {
    this.filterByStatus();
    this.applySort();
  }

  // Handle status search input change
  onSearchStatusChange(): void {
    this.applyFiltersAndSort();
  }

  // Handle sort order change
  onSortChange(order: 'asc' | 'desc' | 'none'): void {
    this.sortOrder = order;
    this.applyFiltersAndSort();
  }
}