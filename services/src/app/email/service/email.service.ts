import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Email } from '../email';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly baseURL = "http://localhost:8090/email/uhpocms/email";
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String = "uhpocadmin";
  public password: String = "P@55w0rd";
  constructor(private _http: HttpClient) { }

  private readonly emailUrl;

  constructor(private _http: HttpClient) {
    this.emailUrl = environment.emailUrl + "/email";
  }


  authenticationService(username: String, password: String) {
    return this._http.get(`http://localhost:8090/email/uhpocms/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: any, password: any) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    // this._route.navigate(['demo']);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username;
    this.password;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
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
