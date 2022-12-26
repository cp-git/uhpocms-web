import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Authuser } from './authuser';

@Injectable({
  providedIn: 'root'
})
export class AuthuserserviceService {

  constructor(private _http:HttpClient) { }
  
  fetchadminlist():Observable<any>{
    return this._http.get<any>("http://localhost:8090/uhpocms/authuser?username=all");
  }

  addAdminRole(authuser:Authuser): Observable<any> {
    return this._http.post<any>("http://localhost:8090/uhpocms/authuser",authuser);
  }

 deleteAdmin(authUserName: string): Observable<any> {
    return this._http.delete<any>("http://localhost:8090/uhpocms/authuser/"+authUserName);
  }

  getAdminlist(authUserName:string): Observable<any> {
    return this._http.get<any>("http://localhost:8090/uhpocms/authuser/"+authUserName);
  }

  updateadminlist(authUserName:string,authuser:Authuser): Observable<Object> {
    
    return this._http.put<any>("http://localhost:8090/uhpocms/authuser/"+authUserName,authuser);
  }
}
