// src/app/app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './shared/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';



import { MatTableModule } from '@angular/material/table'; // Ensure this is present
import { UserSubscriptionViewComponent } from './shared/user-subscription-view/user-subscription-view.component';
import { PaymentComponent } from './shared/payment/payment.component';
import { SuccessComponent } from './shared/success/success.component';
import { RendezVousListComponent } from './rendezvous-list/rendezvous-list.component';

import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';

import { RendezVousFormComponent } from './rendez-vous-form/rendez-vous-form.component';
import { ConsultationListComponent } from './consultation-list/consultation-list.component';
import { ConsultationFormComponent } from './consultation-form/consultation-form.component'; // Import here
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserSubscriptionViewComponent,
    SubscriptionFormComponent,
    PaymentComponent,
    SuccessComponent,
    RendezVousFormComponent,
    NotificationListComponent,
    NotificationFormComponent,
    SubscriptionListComponent,
    RendezVousFormComponent,

    ConsultationListComponent,
    ConsultationFormComponent,
    PrescriptionListComponent,
    PrescriptionFormComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule, // Must be included
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatMenuModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }