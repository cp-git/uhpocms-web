import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Email } from '../email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly baseURL = "http://localhost:8090/email/uhpocms/email";
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String = "uhpocadmin";
  public password: String = "P@55w0rd";
  constructor(private _http: HttpClient) { }

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
    alert(this.baseURL + '?title=all');
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
