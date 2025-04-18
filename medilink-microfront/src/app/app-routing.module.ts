// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';



import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { adminGuard, usersGuard } from './Services/users.guard';
import { UpdateuserComponent } from './shared/updateuser/updateuser.component';

import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';

import { UserSubscriptionViewComponent } from './shared/user-subscription-view/user-subscription-view.component';
import { PaymentComponent } from './shared/payment/payment.component';
import { SuccessComponent } from './shared/success/success.component';
import {RendezVousListComponent   } from './rendezvous-list/rendezvous-list.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { RendezVousFormComponent } from './rendez-vous-form/rendez-vous-form.component'; // Import here
import { PrescriptionListComponent } from './prescription-list/prescription-list.component';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
import { ConsultationFormComponent } from './consultation-form/consultation-form.component';
import { ConsultationListComponent } from './consultation-list/consultation-list.component';
const routes: Routes = [

  
    { path: 'listsub', component: SubscriptionListComponent },
    { path: 'user', component: UserSubscriptionViewComponent },
    { path: 'add', component: SubscriptionFormComponent },
    { path: 'edit/:id', component: SubscriptionFormComponent },
    { path: 'payment/:subid', component: PaymentComponent },
    { path: 'success', component: SuccessComponent },
    { path: 'rendvous', component: RendezVousListComponent },
  { path: 'rendezvous-form', component: RendezVousFormComponent },
  { path: 'rendezvous-form/:id', component: RendezVousFormComponent },
    { path: 'consultations', component: ConsultationListComponent },
    { path: 'consultation-form', component: ConsultationFormComponent },
    { path: 'consultation-form/:id', component: ConsultationFormComponent },
    { path: 'prescriptions', component: PrescriptionListComponent }, // Changed from /not
    { path: 'prescription-form', component: PrescriptionFormComponent }, // Changed from /notif
    { path: 'prescription-form/:id', component: PrescriptionFormComponent }, // Added for edit
    { path: 'ordelist', component: NotificationListComponent },
    { path: 'ordonform', component: NotificationFormComponent },
    { path: 'ordonform/:id', component: NotificationFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'update/:id', component: UpdateuserComponent, canActivate: [usersGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: LoginComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }