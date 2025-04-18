import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSubscriptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subs/all`);
  }

  getSubscription(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/subs/${id}`);
  }

  addSubscription(sub: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/subs/add`, sub);
  }

  updateSubscription(id: number, sub: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/subs/update/${id}`, sub);
  }

  deleteSubscription(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/subs/delete/${id}`, { responseType: 'text' });
  }

  createPayment(data: { subid: number; amount: string; currency: string; description: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/payment/create`, data, { responseType: 'text' });
  }

  getStatus(subid: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/subs/status/${subid}`, { responseType: 'text' });
  }
  cancelSubscription(subid: number, reason: string): Observable<any> {
    const body = { reason };  // Send the reason for cancellation (optional, if needed)
    return this.http.post<any>(`${this.apiUrl}/subs/cancel/${subid}`, body);  // Updated URL with path parameter
  }
}