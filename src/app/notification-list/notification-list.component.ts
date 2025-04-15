import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { Notification } from '../models/notification';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];
  displayedColumns: string[] = ['id', 'message', 'status', 'createdAt', 'actions'];

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (data) => (this.notifications = data),
      error: () => this.snackBar.open('Error loading notifications', 'Close', { duration: 3000 })
    });
  }

  deleteNotification(id: number | undefined): void {
    if (id === undefined) return;
    if (confirm('Are you sure you want to delete this notification?')) {
      this.notificationService.deleteNotification(id).subscribe({
        next: () => {
          this.snackBar.open('Notification deleted', 'Close', { duration: 2000 });
          this.loadNotifications();
        },
        error: () => this.snackBar.open('Error deleting notification', 'Close', { duration: 3000 })
      });
    }
  }
}