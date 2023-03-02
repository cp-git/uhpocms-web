import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Admin } from './admin';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AdminroleserviceService {
  private readonly adminRoleUrl: string;
  constructor(private _http: HttpClient) {
    this.adminRoleUrl = environment.adminRoleUrl + '/role';
  }

  fetchadminlist(): Observable<any> {
    return this._http.get<any>("http://localhost:8090/adminrole/uhpocms/role?name=all");
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

  getAllDeactivatedRoles(): Observable<Admin[]> {
    return this._http.get<Admin[]>(`${this.adminRoleUrl}?name=inactive`);
  }
  activateAdminRole(roleId: number): Observable<Admin> {
    return this._http.patch<Admin>(`${this.adminRoleUrl}/activate/` + roleId, {});
  }
}
