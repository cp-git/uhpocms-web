import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { AuthUser } from '../entity/auth-user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  currentAuthUserData: AuthUser;
  authUsers: AuthUser[] = [];

  private authUserUrl: string = `${environment.authUserUrl}/authuser`;
  constructor(private http: HttpClient) {
    this.currentAuthUserData = new AuthUser();
  }


  getAllAuthUsers(): Observable<any> {
    return this.http.get<any>(`${this.authUserUrl}?username=all`);
  }

  addAuthUser(authuser: AuthUser): Observable<any> {
    return this.http.post<any>(this.authUserUrl, authuser);
  }

  deleteAuthUser(authUserName: string): Observable<any> {
    return this.http.delete<any>(this.authUserUrl + authUserName);
  }

  getAuthUser(authUserName: string): Observable<any> {
    return this.http.get<any>(this.authUserUrl + authUserName);
  }

  updateAuthUser(authUserName: string, authuser: AuthUser): Observable<any> {
    return this.http.put<any>(this.authUserUrl + authUserName, authuser);
  }
}
