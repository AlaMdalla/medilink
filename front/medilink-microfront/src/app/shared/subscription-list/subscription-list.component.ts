import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {
  subscriptions: any[] = [];

  constructor(private subscriptionService: SubscriptionService, private router: Router) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe(
      (data: any[]) => this.subscriptions = data,
      error => console.error('Error loading subscriptions', error)
    );
  }

  editSubscription(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteSubscription(id: number) {
    if (confirm('Are you sure you want to delete this subscription?')) {
      this.subscriptionService.deleteSubscription(id).subscribe(
        () => this.loadSubscriptions(),
        error => console.error('Error deleting subscription', error)
      );
    }
  }

  payForSubscription(subid: number) {
    this.router.navigate(['/payment', subid]);
  }

  addNewSubscription() {
    this.router.navigate(['/add']);
  }
}