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


  ///////////////////////////////////// SERVICE - GET ALL EMAILS ///////////////////////////////////////
  getAllEmails() {
    return this.http.get<Email[]>(`${this.emailUrl}?title=all`);
  }


  ////////////////////////////// SERVICE - CREATE NEW EMAIL //////////////////////////////////////////
  insertEmail(email: Email) {
    return this.http.post<Email>(`${this.emailUrl}`, email);
  }


  /////////////////////////////  SERVICE -UPDATE EMAIL //////////////////////////////////////////////
  updateEmail(email: Email) {
    return this.http.put<Email>(`${this.emailUrl}/${email.title}`, email);
  }


  /////////////////////////// SERVICE -DELETE EMAIL  ///////////////////////////////////////////////
  deleteEmail(emailTitle: string) {
    return this.http.delete<Email>(`${this.emailUrl}/${emailTitle}`);
  }
}
