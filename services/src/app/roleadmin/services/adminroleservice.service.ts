import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Admin } from '../class/admin';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AdminroleserviceService {
  private readonly adminRoleUrl: string;
  constructor(private _http: HttpClient) {

    this.adminRoleUrl = "http://localhost:8090/adminrole/uhpocms/role"
  }

  fetchadminlist(): Observable<any> {
    return this._http.get<any>(`${this.adminRoleUrl}/?name=all`);
  }

  addAdminRole(admin: Admin): Observable<any> {
    return this._http.post<any>(`${this.adminRoleUrl}`, admin);
  }


  //delete by roleName
  deleteAdmin(roleName: string): Observable<any> {
    return this._http.delete<any>(`${this.adminRoleUrl}/` + roleName);
  }

  ///list of roles
  getAdminlist(roleName: string): Observable<any> {
    return this._http.get<any>(`${this.adminRoleUrl}/` + roleName);
  }


  //update role by role name
  updateadminlist(roleName: string, admin: Admin): Observable<Object> {
    return this._http.put<any>(`${this.adminRoleUrl}/` + roleName, admin);
  }


  //get role by role Name
  getAdmin(roleName: string): Observable<Admin> {
    return this._http.get<Admin>(`${this.adminRoleUrl}/` + roleName);
  }


  //get deactivated roles
  getAllDeactivatedRoles(): Observable<Admin[]> {
    return this._http.get<Admin[]>(`${this.adminRoleUrl}?name=inactive`);
  }

  //get activated roles 
  activateAdminRole(roleId: number): Observable<Admin> {
    return this._http.patch<Admin>(`${this.adminRoleUrl}/activate/` + roleId, {});
  }
}
