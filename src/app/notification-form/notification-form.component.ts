import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../Services/notification.service';
import { Notification } from '../models/notification';
import { NotificationStatus } from '../models/notification-status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.css']
})
export class NotificationFormComponent implements OnInit {
  notificationForm: FormGroup;
  notificationStatus = NotificationStatus;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.notificationForm = this.fb.group({
      userId: [1, [Validators.required, Validators.min(1)]],
      message: ['', Validators.required],
      status: [NotificationStatus.PENDING, Validators.required]
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.notificationForm.valid) {
      const notification: Notification = this.notificationForm.value;
      this.notificationService.createNotification(notification).subscribe({
        next: () => this.router.navigate(['/ordelist']),
        error: (err) => console.error('Error creating notification:', err)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/ordelist']);
  }
}