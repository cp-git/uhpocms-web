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




  ////////////////////////////////////// SERVICE  - FETCH ALL ADMIN ROLES ///////////////////////////////////////////////
  fetchadminlist(): Observable<any> {
    return this._http.get<any>(`${this.adminRoleUrl}/?name=all`);
  }


  ///////////////////////////////////  SERVICE - ADD ADMIN ROLE  ///////////////////////////////////////////
  addAdminRole(admin: Admin): Observable<any> {
    return this._http.post<any>(`${this.adminRoleUrl}`, admin);
  }


  ////////////////////////////////////// SERVICE - DELETE ADMIN ROLE  /////////////////////////////////////
  deleteAdmin(roleName: string): Observable<any> {
    return this._http.delete<any>(`${this.adminRoleUrl}/` + roleName);
  }

  ///////////////////////////////   SERVICE - GET ADMIN ROLE USING ROLE NAME /////////////////////////////////////////
  getAdminlist(roleName: string): Observable<any> {
    return this._http.get<any>(`${this.adminRoleUrl}/` + roleName);
  }


  //////////////////////////////////////  SERVICE -UPDATE ADMIN ROLE USING THE ROLENAME  //////////////////////////////
  updateadminlist(roleName: string, admin: Admin): Observable<Object> {
    return this._http.put<any>(`${this.adminRoleUrl}/` + roleName, admin);
  }


  //////////////////////////////   SERVICE - GET ADMIN ROLE USING ROLE NAME /////////////////////////////////////////
  getAdmin(roleName: string): Observable<Admin> {
    return this._http.get<Admin>(`${this.adminRoleUrl}/` + roleName);
  }


  ////////////////////////////////// SERVICE - GET ALL INACTIVE ADMIN ROLES /////////////////////////////////
  getAllDeactivatedRoles(): Observable<Admin[]> {
    return this._http.get<Admin[]>(`${this.adminRoleUrl}?name=inactive`);
  }

  ///////////////////////////////////   ACTIVATE ADMIN ROLE  USING ID ///////////////////////////////////////////
  activateAdminRole(roleId: number): Observable<Admin> {
    return this._http.patch<Admin>(`${this.adminRoleUrl}/activate/` + roleId, {});
  }
}
