import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Authuser } from './authuser';

@Injectable({
  providedIn: 'root'
})
export class AuthuserserviceService {

  constructor(private _http:HttpClient) { }
  
  authUserList():Observable<any>{
    return this._http.get<any>("http://localhost:8090/uhpocms/authuser?username=all");
  }

  addAuthUser(authuser:Authuser): Observable<any> {
    return this._http.post<any>("http://localhost:8090/uhpocms/authuser",authuser);
  }

 deleteAuthUser(authUserName: string): Observable<any> {
    return this._http.delete<any>("http://localhost:8090/uhpocms/authuser/"+authUserName);
  }

  getAuthUser(authUserName:string): Observable<any> {
    return this._http.get<any>("http://localhost:8090/uhpocms/authuser/"+authUserName);
  }

  updateAuthUser(authUserName:string,authuser:Authuser): Observable<any> {
    
    return this._http.put<any>("http://localhost:8090/uhpocms/authuser/"+authUserName,authuser);
  }
}
