import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly baseURL = "http://localhost:8090/email/uhpocms/email";
  constructor(private _http: HttpClient) { }

  fetchAllEmails() {
    return this._http.get<Email[]>(this.baseURL + '?title=all');
  }

  insertEmail(email: Email) {
    return this._http.post<Email>(this.baseURL, email);
  }

  updateEmail(email: Email) {
    return this._http.put<Email>(this.baseURL + '/' + email.title, email);
  }

  deleteEmail(emailTitle: string) {
    return this._http.delete<Email>(this.baseURL + '/' + emailTitle);
  }
}
