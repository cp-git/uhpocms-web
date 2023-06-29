import { Injectable } from '@angular/core';
import { AuthUserPermission } from '../../class/auth-user-permission';
import { AuthGroupPermission } from '../../class/auth-group-permission';
import { AccessControl } from '../../class/access-control';
import { AuthPermission } from 'app/permissions/class/auth-permission';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { environment } from 'environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthPermissionService {
  private authPermissionUrl: string;

  moduleNames: any;
  permissions: AuthPermission[] = [];
  accessControl!: AccessControl;

  rolePermissions!: AuthGroupPermission;
  userPermissions!: AuthUserPermission;
  userAndRolePermissions: AuthUserPermission[] = [];

  constructor(private http: HttpClient) {
    this.authPermissionUrl = `${environment.accessPrivilegeUrl}`;
  }

  getAllPermissions(): Observable<AuthPermission[]> {
    return this.http.get<AuthPermission[]>(`${this.authPermissionUrl}/permission`);
    // this.permissions = data;
    // return of(data);
  }


  addAuthPermission(authPermission: AuthPermission): Observable<AuthPermission[]> {
    return this.http.post<AuthPermission[]>(`${this.authPermissionUrl}/permissions`, authPermission);
  }

  updateAuthPermission(permissionId: number, authPermission: AuthPermission): Observable<AuthPermission[]> {
    return this.http.post<AuthPermission[]>(`${this.authPermissionUrl}/permissions`, authPermission);
  }

  deleteAuthPermission(permissionId: number): Observable<AuthPermission[]> {
    return this.http.delete<AuthPermission[]>(`${this.authPermissionUrl}/permissions/${permissionId}`);
  }
}
