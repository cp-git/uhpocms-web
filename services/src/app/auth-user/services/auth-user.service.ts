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
    this._baseUrl = `${environment.authUserUrl}/authuser`;
    this._authUrl = `${environment.authUserUrl}/basicauth`;
    this._loginUrl = `${environment.authUserUrl}/login`;
  }


  ////////////////  SERVICE -FETCHING AUTH USER LIST  ///////////////////////////

  authUserList(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '?username=all');
  }



  //////////////  SERVICE -INSERTION OF AUTH USER ///////////////////////////////

  addAuthUser(authuser: Authuser): Observable<any> {
    return this._http.post<any>(this._baseUrl, authuser);
  }


  ////////////  SERVICE - DELETE AUTH USER  ////////////////////////////////////
  deleteAuthUser(authUserName: string): Observable<any> {
    return this._http.delete<any>(this._baseUrl + "/" + authUserName);
  }



  /////////// SERVICE -GET AUTH USER NAME   ///////////////////////////////////////

  getAuthUser(authUserName: string): Observable<any> {
    return this._http.get<any>(this._baseUrl + "/" + authUserName);
  }



  ////////// SERVICE - UPDATE THE AUTH USER ///////////////////////////////////////

  updateAuthUser(authUserName: string, authuser: Authuser): Observable<any> {
    return this._http.put<any>(this._baseUrl + "/" + authUserName, authuser);
  }



  ////////// SERVICE API -LOGIN USING AUTH USER ///////////////////////////////////


  loginDataAuthUser(authuser: Authuser): Observable<any> {
    return this._http.post<any>(this._loginUrl, authuser);
  }


  ////////////////////// BASIC AUTHORIZATION ///////////////////////////////////////

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


  ////////////////////////  END OF BASIC AUTHORIZATION /////////////////////////




  //////////////////////  SERCVICE - GETTING INACTIVE AUTH USER ////////////////////////////

  getAllInactiveAuthUsers(): Observable<Authuser[]> {
    return this._http.get<Authuser[]>(this._baseUrl + '?username=inactiveprofile');
  }




  ///////////////////// SERVICE - ACTIVATE AUTH USER //////////////////////////
  activateAuthUserById(authUserId: number): Observable<any> {
    return this._http.patch<any>(`${this._baseUrl}/activate/` + authUserId, {});
  }



  /////////////////////// SERVICE - GET AUTH USER  API USED IN PROFILE COMPONENT /////////////
  getAuthUserById(authUserId: number): Observable<any> {
    return this._http.get<any>(`${this._baseUrl}/user?id=${authUserId}`);
  }
}
