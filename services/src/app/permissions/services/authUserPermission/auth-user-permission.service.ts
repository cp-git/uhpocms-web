import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessControl } from 'app/permissions/class/access-control';
import { AuthGroupPermission } from 'app/permissions/class/auth-group-permission';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { userPermission } from 'app/permissions/enum/user-permission.enum';
import { environment } from 'environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserPermissionService {

  moduleNames: any;
  permissions: any;
  accessControl!: AccessControl;

  rolePermissions!: AuthGroupPermission;
  // userPermissions!: AuthUserPermission;
  userAndRolePermissions: AuthUserPermission[] = [];
  accessPrivilegeUrl = environment.accessPrivilegeUrl;
  userPermissions: any;

  constructor(private http: HttpClient) { }

  getAllPermissionsByRoleIdAndUserId(userRoleId: any, userId: any): Observable<AuthUserPermission[]> {
    return this.http.get<AuthUserPermission[]>(`${this.accessPrivilegeUrl}/permissions?userId=${userId}&roleId=${userRoleId}`)
      .pipe(
        tap((permissions: AuthUserPermission[]) => {
          this.userPermissions = permissions;
        })

      );
  }

  getAllUserPermissions(): Observable<AuthUserPermission[]> {
    return this.http.get<AuthUserPermission[]>(`${this.accessPrivilegeUrl}/userpermission?user=all`)

  }


  linkPermissions(moduleId: number, userAndRolePermissions: AuthUserPermission[], buttonArray: any) {
    // let data: any = moduleName.toUpperCase;
    // let module: any = userModule[data];
    console.log(userAndRolePermissions);

    userAndRolePermissions = userAndRolePermissions.filter(item =>
      item.moduleId == moduleId
    );
    console.log(userAndRolePermissions);

    userAndRolePermissions.forEach(element => {
      if (element.permissionId == userPermission.CREATE) {
        console.log("CREATE");
        buttonArray.showAddButton = true;
      }

      if (element.permissionId == userPermission.DELETE) {
        console.log("DELETE");
        buttonArray.deleteButton = true;
      }

      if (element.permissionId == userPermission.UPDATE) {
        console.log("UPDATE");
        buttonArray.updateButton = true;
      }

      if (element.permissionId == userPermission.ACTIVATE) {
        console.log("ACTIVATE");
        buttonArray.showActivateButton = true;
      }
    })
  }

  assignPermissionsToUserId(userId: any, userRoleId: any, moduleAndPermissionsIds: any): Observable<AuthUserPermission[]> {
    return this.http.post<AuthUserPermission[]>(`${this.accessPrivilegeUrl}/user/${userId}/role/${userRoleId}`, moduleAndPermissionsIds)
  }

  assignPermissionsToRoleId(userRoleId: any, moduleAndPermissionsIds: any): Observable<AuthGroupPermission[]> {
    return this.http.post<AuthGroupPermission[]>(`${this.accessPrivilegeUrl}/role/${userRoleId}`, moduleAndPermissionsIds)
  }
}
