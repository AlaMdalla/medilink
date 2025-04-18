import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../Services/subscription.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {
  subscription: any = { typesub: '', subsDescription: '', subsDiscountedPrice: 0, subsActualPrice: 0 };
  id: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')! || null;
    if (this.id) {
      this.subscriptionService.getSubscription(this.id).subscribe(
        data => this.subscription = data,
        error => this.errorMessage = 'Failed to load subscription: ' + error.message
      );
    }
  }

  saveSubscription() {
    if (this.id) {
      this.subscriptionService.updateSubscription(this.id, this.subscription).subscribe(
        () => this.router.navigate(['/']),
        error => this.errorMessage = error.error || 'Failed to update subscription'
      );
    } else {
      this.subscriptionService.addSubscription(this.subscription).subscribe(
        () => this.router.navigate(['/']),
        error => this.errorMessage = error.error || 'Failed to add subscription'
      );
    }
  }

  cancel() {
    this.router.navigate(['/listsub']);
  }
}