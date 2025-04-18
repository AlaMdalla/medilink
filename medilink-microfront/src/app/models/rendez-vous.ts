export enum Status {
  PENDING = 'Pending',
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface RendezVous {
  id?: number;
  date: string | Date;
  status: Status;
}