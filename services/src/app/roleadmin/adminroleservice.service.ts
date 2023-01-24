import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Admin } from './admin';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AdminroleserviceService {

  private readonly adminRoleUrl: string = environment.adminRoleUrl + "/role";
  constructor(private _http: HttpClient) { }

  fetchadminlist(): Observable<any> {
    return this._http.get<any>(`${this.adminRoleUrl}/?name=all`);
  }

  addAdminRole(admin: Admin): Observable<any> {
    return this._http.post<any>(`${this.adminRoleUrl}`, admin);
  }

  deleteAdmin(roleName: string): Observable<any> {
    return this._http.delete<any>(`${this.adminRoleUrl}/` + roleName);
  }

  getAdminlist(roleName: string): Observable<any> {
    return this._http.get<any>(`${this.adminRoleUrl}/` + roleName);
  }

  updateadminlist(roleName: string, admin: Admin): Observable<Object> {

    return this._http.put<any>(`${this.adminRoleUrl}/` + roleName, admin);
  }

  getAdmin(roleName: string): Observable<Admin> {
    return this._http.get<Admin>(`${this.adminRoleUrl}/` + roleName);
  }
}
