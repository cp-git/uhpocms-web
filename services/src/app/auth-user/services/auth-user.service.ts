import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Authuser } from '../class/auth-user';


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String = 'uhpocadmin';
  public password: String = 'P@55w0rd';
  _baseUrl: string;
  _authUrl: string;

  _loginUrl: string;

  constructor(private _http: HttpClient) {
    //  this._baseUrl = `${environment.authUserUrl}/authuser`;
    this._authUrl = `${environment.authUserUrl}/basicauth`;
    this._loginUrl = `${environment.authUserUrl}/login`;


    this._baseUrl = "http://localhost:8090/authuser/uhpocms/authuser";
  }


  //Fetching the Auth User List
  authUserList(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '?username=all');
  }

  //Adding Auth User
  addAuthUser(authuser: Authuser): Observable<any> {
    return this._http.post<any>(this._baseUrl, authuser);
  }

  //Deleting the Auth User
  deleteAuthUser(authUserName: string): Observable<any> {
    return this._http.delete<any>(this._baseUrl + "/" + authUserName);
  }


  //Get Authuser by Auth User Name
  getAuthUser(authUserName: string): Observable<any> {
    return this._http.get<any>(this._baseUrl + "/" + authUserName);
  }


  //Update AuthUser
  updateAuthUser(authUserName: string, authuser: Authuser): Observable<any> {
    return this._http.put<any>(this._baseUrl + "/" + authUserName, authuser);
  }

  //Login Service Using the DB
  loginDataAuthUser(authuser: Authuser): Observable<any> {
    return this._http.post<any>(this._loginUrl, authuser);
  }


  //Authorization
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


  //Get All Inactive Auth Users
  getAllInactiveAuthUsers(): Observable<Authuser[]> {
    return this._http.get<Authuser[]>(`${this._baseUrl}?username=inactive`);
  }


  //Activate Auth Users
  activateAuthUserById(authUserId: number): Observable<any> {
    return this._http.patch<any>(`${this._baseUrl}/activate/` + authUserId, {});
  }
}
