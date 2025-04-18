import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from '../Services/consultation.service';
import { Consultation, StatutConsultation } from '../models/consultation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultation-form',
  templateUrl: './consultation-form.component.html',
  styleUrls: ['./consultation-form.component.css']
})
export class ConsultationFormComponent implements OnInit {
  consultationForm: FormGroup;
  isEditMode = false;
  consultationId?: number;
  statutOptions = Object.values(StatutConsultation);

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.consultationForm = this.fb.group({
      dateConsultation: ['', Validators.required],
      statut: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.consultationId = +id;
        this.consultationService.getConsultationById(this.consultationId).subscribe({
          next: (consultation) => this.consultationForm.patchValue(consultation),
          error: () => this.snackBar.open('Error loading consultation', 'Close', { duration: 3000 })
        });
      }
    });
  }

  onSubmit(): void {
    if (this.consultationForm.valid) {
      const consultation: Consultation = this.consultationForm.value;
      if (this.isEditMode && this.consultationId) {
        this.consultationService.updateConsultation(this.consultationId, consultation).subscribe({
          next: () => {
            this.snackBar.open('Consultation updated', 'Close', { duration: 2000 });
            this.router.navigate(['/consultations']);
          },
          error: () => this.snackBar.open('Error updating consultation', 'Close', { duration: 3000 })
        });
      } else {
        this.consultationService.createConsultation(consultation).subscribe({
          next: () => {
            this.snackBar.open('Consultation created', 'Close', { duration: 2000 });
            this.router.navigate(['/consultations']);
          },
          error: () => this.snackBar.open('Error creating consultation', 'Close', { duration: 3000 })
        });
      }
    }
  }
  onCancel(): void {
    this.router.navigate(['/consultations']);
  }
}