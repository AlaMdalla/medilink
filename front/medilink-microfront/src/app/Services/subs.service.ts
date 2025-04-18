import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subs } from '../models/subs.model';
import { Urls } from '../config/Urls';

@Injectable({
  providedIn: 'root'
})
export class SubsService {
  private apiUrl = Urls.Subs;

  constructor(private http: HttpClient) { }

  // Get all subscriptions
  getAllSubscriptions(): Observable<Subs[]> {
    return this.http.get<Subs[]>(`${this.apiUrl}/all`);
  }

  // Add a new subscription
  addSubscription(subs: Subs): Observable<Subs> {
    return this.http.post<Subs>(`${this.apiUrl}/add`, subs);
  }

  // Get a subscription by ID
  getSubscriptionById(id: number): Observable<Subs> {
    return this.http.get<Subs>(`${this.apiUrl}/${id}`);
  }

  // Update an existing subscription
  updateSubscription(id: number, subs: Subs): Observable<Subs> {
    return this.http.put<Subs>(`${this.apiUrl}/update/${id}`, subs);
  }

  // Delete a subscription
  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}