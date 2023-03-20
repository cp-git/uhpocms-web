import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../class/email';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class EmailService {

  private readonly emailUrl;

  constructor(private http: HttpClient) {
    this.emailUrl = `${environment.emailUrl}/email`;
  }

  // api call for fetching all emails 
  fetchAllEmails() {
    return this.http.get<Email[]>(`${this.emailUrl}?title=all`);
  }

  // api call for inserting new email
  insertEmail(email: Email) {
    return this.http.post<Email>(`${this.emailUrl}`, email);
  }

  // api call for update email by title
  updateEmail(email: Email) {
    return this.http.put<Email>(`${this.emailUrl}/${email.title}`, email);
  }

  // api call for delete email by title
  deleteEmail(emailTitle: string) {
    return this.http.delete<Email>(`${this.emailUrl}/${emailTitle}`);
  }
}
