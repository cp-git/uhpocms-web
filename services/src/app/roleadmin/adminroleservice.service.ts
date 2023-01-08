import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class AdminroleserviceService {

  constructor(private _http: HttpClient) { }

  fetchadminlist(): Observable<any> {
    return this._http.get<any>("http://localhost:8090/adminrole/uhpocms/role?name=all");
  }

  addAdminRole(admin: Admin): Observable<any> {
    return this._http.post<any>("http://localhost:8090/adminrole/uhpocms/role", admin);
  }

  deleteAdmin(roleName: string): Observable<any> {
    return this._http.delete<any>("http://localhost:8090/adminrole/uhpocms/role/" + roleName);
  }

  getAdminlist(roleName: string): Observable<any> {
    return this._http.get<any>("http://localhost:8090/adminrole/uhpocms/role/" + roleName);
  }

  updateadminlist(roleName: string, admin: Admin): Observable<Object> {

    return this._http.put<any>("http://localhost:8090/adminrole/uhpocms/role/" + roleName, admin);
  }

  getAdmin(roleName: string): Observable<Admin> {
    return this._http.get<Admin>("http://localhost:8090/adminrole/uhpocms/role/" + roleName);
  }
}
