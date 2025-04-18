import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../Services/subscription.service';
import { Router } from '@angular/router';

interface Subscription {
  subid: number;
  typesub: string;
  subsDescription: string;
  subsDiscountedPrice: number;
  subsActualPrice: number;
  status: string | null;
}

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {
  subscriptions: Subscription[] = [];
  filteredSubscriptions: Subscription[] = [];
  searchType: string = '';
  sortOrder: 'asc' | 'desc' | 'none' = 'none';

  constructor(private subscriptionService: SubscriptionService, private router: Router) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe({
      next: (data: Subscription[]) => {
        this.subscriptions = data;
        this.applyFiltersAndSort(); // Apply filters and sorting after loading
      },
      error: (error) => console.error('Error loading subscriptions', error)
    });
  }

  editSubscription(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteSubscription(id: number) {
    if (confirm('Are you sure you want to delete this subscription?')) {
      this.subscriptionService.deleteSubscription(id).subscribe({
        next: () => this.loadSubscriptions(),
        error: (error) => console.error('Error deleting subscription', error)
      });
    }
  }

  payForSubscription(subid: number) {
    this.router.navigate(['/payment', subid]);
  }

  addNewSubscription() {
    this.router.navigate(['/add']);
  }

  // Filter by subscription type
  filterByType(): void {
    if (!this.searchType.trim()) {
      this.filteredSubscriptions = [...this.subscriptions];
    } else {
      const term = this.searchType.toLowerCase();
      this.filteredSubscriptions = this.subscriptions.filter(sub =>
        sub.typesub.toLowerCase().includes(term)
      );
    }
    this.applySort(); // Re-apply sorting after filtering
  }

  // Sort by actual price
  applySort(): void {
    if (this.sortOrder === 'none') {
      this.filteredSubscriptions = [...this.filteredSubscriptions];
    } else {
      this.filteredSubscriptions.sort((a, b) => {
        const priceA = a.subsActualPrice;
        const priceB = b.subsActualPrice;
        return this.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }
  }

  // Apply both filters and sorting
  applyFiltersAndSort(): void {
    this.filterByType();
    this.applySort();
  }

  // Handle type search input change
  onSearchTypeChange(): void {
    this.applyFiltersAndSort();
  }

  // Handle sort order change
  onSortChange(order: 'asc' | 'desc' | 'none'): void {
    this.sortOrder = order;
    this.applyFiltersAndSort();
  }
}