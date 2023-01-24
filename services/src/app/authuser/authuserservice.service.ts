import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Authuser } from './authuser';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthuserserviceService {

  private readonly authUserUrl: string = environment.authUserUrl;

  constructor(private _http: HttpClient) { }

  authUserList(): Observable<any> {
    return this._http.get<any>(`${this.authUserUrl}/authuser?username=all`);
  }

  addAuthUser(authuser: Authuser): Observable<any> {
    return this._http.post<any>(`${environment.authUserUrl}/authuser`, authuser);
  }

  deleteAuthUser(authUserName: string): Observable<any> {
    return this._http.delete<any>(`${this.authUserUrl}/authuser/` + authUserName);
  }

  getAuthUser(authUserName: string): Observable<any> {
    return this._http.get<any>(`${this.authUserUrl}/authuser/` + authUserName);
  }

  updateAuthUser(authUserName: string, authuser: Authuser): Observable<any> {

    return this._http.put<any>(`${this.authUserUrl}/authuser/` + authUserName, authuser);
  }

  loginDataAuthUser(authuser: Authuser): Observable<any> {
    return this._http.post<any>(`${this.authUserUrl}/login`, authuser);
  }
}
