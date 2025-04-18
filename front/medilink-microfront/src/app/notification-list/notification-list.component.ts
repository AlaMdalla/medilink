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
  filteredNotifications: Notification[] = [];
  displayedColumns: string[] = ['id', 'message', 'status', 'createdAt', 'actions'];
  searchMessage: string = '';
  sortOrder: 'asc' | 'desc' | 'none' = 'none';

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.applyFiltersAndSort(); // Apply filters and sorting after loading
      },
      error: () => this.snackBar.open('Error loading notifications', 'Close', { duration: 3000 })
    });
  }

  deleteNotification(id: number | undefined): void {
    if (id === undefined) {
      console.error('Cannot delete notification: ID is undefined');
      return;
    }
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

  // Filter by message
  filterByMessage(): void {
    if (!this.searchMessage.trim()) {
      this.filteredNotifications = [...this.notifications];
    } else {
      const term = this.searchMessage.toLowerCase();
      this.filteredNotifications = this.notifications.filter(notification =>
        notification.message.toLowerCase().includes(term)
      );
    }
    this.applySort(); // Re-apply sorting after filtering
  }

  // Sort by createdAt
  applySort(): void {
    if (this.sortOrder === 'none') {
      this.filteredNotifications = [...this.filteredNotifications];
    } else {
      this.filteredNotifications.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }
  }

  // Apply both filters and sorting
  applyFiltersAndSort(): void {
    this.filterByMessage();
    this.applySort();
  }

  // Handle message search input change
  onSearchMessageChange(): void {
    this.applyFiltersAndSort();
  }

  // Handle sort order change
  onSortChange(order: 'asc' | 'desc' | 'none'): void {
    this.sortOrder = order;
    this.applyFiltersAndSort();
  }
}