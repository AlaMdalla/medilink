export interface Prescription {
    id?: number;
    doctorId: number;
    patientId: number;
    date: string; // ISO date string, e.g., '2025-04-14'
    medicationList: string; // Simplified to a single string
  }