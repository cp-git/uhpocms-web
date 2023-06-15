import { Injectable } from '@angular/core';
import { AuthUserPermission } from '../../class/auth-user-permission';
import { AuthGroupPermission } from '../../class/auth-group-permission';
import { AccessControl } from '../../class/access-control';
import { AuthPermission } from 'app/permissions/class/auth-permission';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthPermissionService {

  moduleNames: any;
  permissions: AuthPermission[] = [];
  accessControl!: AccessControl;

  rolePermissions!: AuthGroupPermission;
  userPermissions!: AuthUserPermission;
  userAndRolePermissions: AuthUserPermission[] = [];

  constructor() { }

  getAllPermissions(): Observable<AuthPermission[]> {
    let data: AuthPermission[] = [];
    data[0] =
    {
      "id": 1,
      "permissionName": "CREATE"
    };

    data[1] = {
      "id": 2,
      "permissionName": "DELETE"
    };

    data[2] = {
      "id": 3,
      "permissionName": "UPDATE"
    };

    data[3] = {
      "id": 4,
      "permissionName": "ACTIVATE"
    }

    console.log(data);
    this.permissions = data;
    return of(data);
  }


  addAuthPermission(authPermission: AuthPermission): Observable<AuthPermission[]> {
    this.permissions.push(authPermission);
    return of(this.permissions);
  }

  updateAuthPermission(permissionId: number, authPermission: AuthPermission): Observable<AuthPermission[]> {
    return of(this.permissions);
  }

  deleteAuthPermission(permissionId: number): Observable<AuthPermission[]> {
    return of(this.permissions);
  }
}
