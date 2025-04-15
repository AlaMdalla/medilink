export interface Notification {
    id?: number; // Optional for new notifications
    userId: number;
    message: string;
    status: NotificationStatus;
    createdAt?: string; // Assuming LocalDateTime is serialized as a string
  }
  export enum NotificationStatus {
    SENT = 'SENT',
    PENDING = 'PENDING'
  }