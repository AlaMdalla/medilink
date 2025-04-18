import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from 'src/app/Services/subscription.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  subid!: number;
  subscription: any = {};
  paymentData: any = { currency: 'USD' };
  errorMessage: string | null = null;
  isRetrying: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subid = +this.route.snapshot.paramMap.get('subid')!;
    console.log('PaymentComponent initialized for subid:', this.subid);

    this.route.queryParams.subscribe(params => {
      console.log('Query params:', params);
      if (params['retry'] === 'true') {
        console.log('Retry flag detected. Initiating retry.');
        this.isRetrying = true;
        this.errorMessage = 'The previous payment link expired. Retrying with a new link...';
        this.loadSubscriptionAndRetry();
      } else {
        console.log('No retry flag. Loading subscription normally.');
        this.loadSubscription();
      }
    });
  }

  loadSubscription() {
    console.log('Loading subscription for subid:', this.subid);
    this.subscriptionService.getSubscription(this.subid).subscribe(
      data => {
        console.log('Subscription loaded:', data);
        this.subscription = data;
        this.paymentData = {
          subid: this.subid,
          amount: data.subsDiscountedPrice.toFixed(2),
          currency: 'USD',
          description: data.subsDescription
        };
        this.checkStatus();
      },
      error => {
        this.errorMessage = 'Failed to load subscription: ' + error.message;
        console.error('Error loading subscription', error);
      }
    );
  }

  loadSubscriptionAndRetry() {
    console.log('Loading subscription for retry, subid:', this.subid);
    this.subscriptionService.getSubscription(this.subid).subscribe(
      data => {
        console.log('Subscription loaded for retry:', data);
        this.subscription = data;
        this.paymentData = {
          subid: this.subid,
          amount: data.subsDiscountedPrice.toFixed(2),
          currency: 'USD',
          description: data.subsDescription
        };
        console.log('Starting payment retry with data:', this.paymentData);
        this.startPayment();
      },
      error => {
        this.errorMessage = 'Failed to load subscription for retry: ' + error.message;
        console.error('Error loading subscription for retry', error);
        this.isRetrying = false;
        this.router.navigate(['/error'], { queryParams: { reason: 'Failed to load subscription for retry' } });
      }
    );
  }

  startPayment() {
    if (!this.subscription.subid) {
      this.errorMessage = 'Subscription not loaded yet. Please wait.';
      console.warn('Attempted to start payment before subscription loaded.');
      return;
    }
    console.log('Initiating payment with data:', this.paymentData);
    this.subscriptionService.createPayment(this.paymentData).subscribe(
      (response: string) => {
        console.log('Redirecting to PayPal:', response);
        window.location.href = response;
      },
      error => {
        this.errorMessage = 'Payment initiation failed: ' + error.message;
        console.error('Payment initiation failed', error);
        this.isRetrying = false;
        this.router.navigate(['/error'], { queryParams: { reason: 'Payment initiation failed' } });
      }
    );
  }

  checkStatus() {
    console.log('Checking status for subid:', this.subid);
    this.subscriptionService.getStatus(this.subid).subscribe(
      (status: string) => {
        console.log('Subscription status:', status);
        if (status === 'success') {
          this.router.navigate(['/success']);
        } else if (status === 'cancelled' || status === 'failed') {
          this.router.navigate(['/error'], { queryParams: { reason: 'Payment was cancelled or failed' } });
        }
      },
      error => {
        this.errorMessage = 'Status check failed: ' + error.message;
        console.error('Status check failed', error);
      }
    );
  }

  cancelRetry() {
    this.isRetrying = false;
    this.router.navigate(['/']);
  }
}