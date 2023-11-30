import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationserviceService {

  private userName = new BehaviorSubject('');
  currentUserName = this.userName.asObservable();
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String = 'uhpocadmin';
  public password: String = 'P@55w0rd';
  _authUrl: string;

  constructor(private http: HttpClient, private _route: Router) {
    // this._authUrl = `${environment.authUserUrl}/basicauth`;
    this._authUrl = `${environment.authUserUrl}/basicauth`;
  }

  updateUserName(authusername: string) {
    this.userName.next(authusername);
  }

  // authenticationService(username: String, password: String) {
  //   return this.http
  //     .get(this._authUrl, {
  //       headers: {
  //         authorization: this.createBasicAuthToken(username, password),
  //       },
  //     })
  //     .pipe(
  //       map((res) => {
  //         this.username = username;
  //         this.password = password;
  //         this.registerSuccessfulLogin(username, password);
  //       })
  //     );
  // }

  // createBasicAuthToken(username: String, password: String) {
  //   return 'Basic ' + window.btoa(username + ':' + password);
  // }

  registerSuccessfulLogin(username: any) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    // this._route.navigate(['demo']);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = '';
    this.password = '';
    this._route.navigate(['/login']);
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
