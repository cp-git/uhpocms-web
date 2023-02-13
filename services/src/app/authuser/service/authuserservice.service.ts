import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Authuser } from '../authuser';

@Injectable({
  providedIn: 'root',
})
export class AuthuserserviceService {
  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String = 'uhpocadmin';
  public password: String = 'P@55w0rd';
  _baseUrl: string;
  _authUrl: string;

  _loginUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = `${environment.authUserUrl}/authuser`;
    this._authUrl = `${environment.authUserUrl}/basicauth`;
    this._loginUrl = `${environment.authUserUrl}/login`;
  }

  authUserList(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '?username=all');
  }

  addAuthUser(authuser: Authuser): Observable<any> {
    return this._http.post<any>(this._baseUrl, authuser);
  }

  deleteAuthUser(authUserName: string): Observable<any> {
    return this._http.delete<any>(this._baseUrl + authUserName);
  }

  getAuthUser(authUserName: string): Observable<any> {
    return this._http.get<any>(this._baseUrl + authUserName);
  }

  updateAuthUser(authUserName: string, authuser: Authuser): Observable<any> {
    return this._http.put<any>(this._baseUrl + authUserName, authuser);
  }

  loginDataAuthUser(authuser: Authuser): Observable<any> {
    return this._http.post<any>("http://localhost:8090/authuser/uhpocms/login", authuser);
  }

  authenticationService(username: String, password: String) {
    return this._http
      .get(this._authUrl, {
        headers: {
          authorization: this.createBasicAuthToken(username, password),
        },
      })
      .pipe(
        map((res) => {
          this.username = username;
          this.password = password;
          this.registerSuccessfulLogin(username, password);
        })
      );
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username: any, password: any) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    // this._route.navigate(['demo']);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username;
    this.password;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    return user;
  }
}
