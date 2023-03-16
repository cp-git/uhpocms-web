import { Injectable } from '@angular/core';
import { AdminRole } from '../admin-role';
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


  getAdminRoles(): Observable<any> {
    return this.http.get<any>(`${this.adminRoleUrl}?name=all`);
  }

  addAdminRole(admin: AdminRole): Observable<any> {
    return this.http.post<any>(`${this.adminRoleUrl}`, admin);
  }

  deleteAdminRole(roleName: string): Observable<any> {
    return this.http.delete<any>(`${this.adminRoleUrl}/` + roleName);
  }

  updateAdminRole(roleName: string, admin: AdminRole): Observable<Object> {
    return this.http.put<any>(`${this.adminRoleUrl}/` + roleName, admin);
  }

  getAllDeactivatedRoles(): Observable<AdminRole[]> {
    return this.http.get<AdminRole[]>(`${this.adminRoleUrl}?name=inactive`);
  }

  activateAdminRole(roleId: number): Observable<AdminRole> {
    return this.http.patch<AdminRole>(`${this.adminRoleUrl}/activate/` + roleId, {});
  }

}
