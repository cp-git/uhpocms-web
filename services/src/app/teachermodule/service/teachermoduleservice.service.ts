import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Module } from '../module';
import { environment } from 'environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class TeachermoduleserviceService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String = "uhpocadmin";
  public password: String = "P@55w0rd";
  private _baseUrl: string;
  _loginUrl: string;


  constructor(private _http: HttpClient) { 
    this._baseUrl = `${environment.moduleUrl}/module`;
    this._loginUrl = `${environment.moduleUrl}/basicauth`;

  }

  fetchModuleList(): Observable<any> {
    return this._http.get<any>( this._baseUrl+"?name=all");
  }

  addTeacherModule(module: Module): Observable<any> {
    return this._http.post<any>(this._baseUrl, module);
  }

  deleteModule(moduleName: string): Observable<any> {
    return this._http.delete<any>(this._baseUrl+"/" + moduleName);
  }

  getModuleList(moduleName: string): Observable<any> {
    return this._http.get<any>(this._baseUrl+"/" + moduleName);
  }

  updateModuleList(moduleName: string, module: Module): Observable<any> {

    return this._http.put<any>(this._baseUrl+"/" + moduleName, module);
  }

  getModule(moduleName: string): Observable<Module> {
    return this._http.get<Module>(this._baseUrl+"/" + moduleName);
  }

  authenticationService(username: String, password: String) {
    return this._http.get(this._loginUrl,
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
