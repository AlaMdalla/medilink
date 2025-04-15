export interface Consultation {
    idConsultation?: number;
    dateConsultation: string; // ISO date string, e.g., '2025-04-14'
    statut: StatutConsultation;
    description?: string; // Optional field, adjust as per actual entity
  }
  
  export enum StatutConsultation {
    PLANIFIEE = 'PLANIFIEE',
    EN_COURS = 'EN_COURS',
    TERMINEE = 'TERMINEE',
    ANNULEE = 'ANNULEE'
  }