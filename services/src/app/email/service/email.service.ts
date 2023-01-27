import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../email';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly emailUrl;

  constructor(private _http: HttpClient) {
    this.emailUrl = environment.emailUrl + "/email";
  }

  fetchAllEmails() {
    return this._http.get<Email[]>(`${this.emailUrl}?title=all`);
  }

  insertEmail(email: Email) {
    return this._http.post<Email>(`${this.emailUrl}`, email);
  }

  updateEmail(email: Email) {
    return this._http.put<Email>(`${this.emailUrl}/` + email.title, email);
  }

  deleteEmail(emailTitle: string) {
    return this._http.delete<Email>(`${this.emailUrl}/` + emailTitle);
  }
}
