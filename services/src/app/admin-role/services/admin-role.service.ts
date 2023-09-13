import { Injectable } from '@angular/core';
import { AdminRole } from '../class/admin-role';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AdminRoleService {

  // currentRoleData!: AdminRole;
  // adminRoles: AdminRole[] = []

  readonly adminRoleUrl: any;

  constructor(private http: HttpClient) {
    this.adminRoleUrl = `${environment.adminRoleUrl}/role`
  }


  //USED
  getAdminRoles(): Observable<any> {
    return this.http.get<any>(`${this.adminRoleUrl}?name=all`);
  }

  //USED
  addAdminRole(admin: AdminRole): Observable<any> {
    return this.http.post<any>(`${this.adminRoleUrl}`, admin);
  }


  //USED
  deleteAdminRole(roleName: string): Observable<any> {
    return this.http.delete<any>(`${this.adminRoleUrl}/` + roleName);
  }


  //USED
  updateAdminRole(roleName: string, admin: AdminRole): Observable<Object> {
    return this.http.put<any>(`${this.adminRoleUrl}/` + roleName, admin);
  }


  //USED
  getAllDeactivatedRoles(): Observable<AdminRole[]> {
    return this.http.get<AdminRole[]>(`${this.adminRoleUrl}?name=inactive`);
  }

  //USED
  activateAdminRole(roleId: number): Observable<AdminRole> {
    return this.http.patch<AdminRole>(`${this.adminRoleUrl}/activate/` + roleId, {});
  }

}
