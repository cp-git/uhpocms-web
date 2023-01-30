import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Authuser } from '../authuser';


@Injectable({
  providedIn: 'root'
})
export class AuthuserserviceService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String = "uhpocadmin";
  public password: String = "P@55w0rd";

  constructor(private _http: HttpClient) { }

  authUserList(): Observable<any> {
    return this._http.get<any>("http://localhost:8090/authuser/uhpocms/authuser?username=all");
  }

  addAuthUser(authuser: Authuser): Observable<any> {
    return this._http.post<any>("http://localhost:8090/authuser/uhpocms/authuser", authuser);
  }

  deleteAuthUser(authUserName: string): Observable<any> {
    return this._http.delete<any>("http://localhost:8090/authuser/uhpocms/authuser/" + authUserName);
  }

  getAuthUser(authUserName: string): Observable<any> {
    return this._http.get<any>("http://localhost:8090/authuser/uhpocms/authuser/" + authUserName);
  }

  updateAuthUser(authUserName: string, authuser: Authuser): Observable<any> {

    return this._http.put<any>("http://localhost:8090/authuser/uhpocms/authuser/" + authUserName, authuser);
  }

  loginDataAuthUser(authuser: Authuser): Observable<any> {
    return this._http.post<any>("http://localhost:8090/authuser/uhpocms/login", authuser);
  }


  authenticationService(username: String, password: String) {
    return this._http.get(`http://localhost:8090/authuser/uhpocms/basicauth`,
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

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }



}
