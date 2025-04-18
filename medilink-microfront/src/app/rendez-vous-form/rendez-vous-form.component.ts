import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezVousService } from '../Services/rendez-vous.service';
import { RendezVous, Status } from '../models/rendez-vous';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rendez-vous-form',
  templateUrl: './rendez-vous-form.component.html',
  styleUrls: ['./rendez-vous-form.component.css'],
})
export class RendezVousFormComponent implements OnInit {
  form: FormGroup;
  statusOptions = Object.values(Status);
  isEditMode = false;
  rendezVousId?: number;

  constructor(
    private fb: FormBuilder,
    private rendezVousService: RendezVousService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      status: [Status.PENDING, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.rendezVousId = +id;
        this.rendezVousService.getById(this.rendezVousId).subscribe({
          next: (rendezVous) => {
            const date = new Date(rendezVous.date).toISOString().slice(0, 16);
            this.form.patchValue({ date, status: rendezVous.status });
          },
          error: () => this.snackBar.open('Error loading rendez-vous', 'Close', { duration: 3000 }),
        });
      } else {
        const now = new Date();
        const formattedNow = now.toISOString().slice(0, 16);
        this.form.patchValue({ date: formattedNow });
      }
    });
  }

  save(): void {
    if (this.form.valid) {
      const rendezVous: RendezVous = {
        ...this.form.value,
        date: new Date(this.form.value.date).toISOString(),
        id: this.rendezVousId,
      };

      const operation = this.isEditMode && this.rendezVousId
        ? this.rendezVousService.update(this.rendezVousId, rendezVous)
        : this.rendezVousService.create(rendezVous);

      operation.subscribe({
        next: () => {
          const message = this.isEditMode ? 'Rendez-Vous updated' : 'Rendez-Vous created';
          this.snackBar.open(message, 'Close', { duration: 2000 });
          this.router.navigate(['/rendezvous']);
        },
        error: () => {
          const errorMessage = this.isEditMode ? 'Error updating rendez-vous' : 'Error creating rendez-vous';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/rendezvous']);
  }
}