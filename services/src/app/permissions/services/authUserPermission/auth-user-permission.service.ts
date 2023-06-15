import { Injectable } from '@angular/core';
import { AccessControl } from 'app/permissions/class/access-control';
import { AuthGroupPermission } from 'app/permissions/class/auth-group-permission';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { userModule } from 'app/permissions/enum/user-module.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthUserPermissionService {

  moduleNames: any;
  permissions: any;
  accessControl!: AccessControl;

  rolePermissions!: AuthGroupPermission;
  userPermissions!: AuthUserPermission;
  userAndRolePermissions: AuthUserPermission[] = [];

  constructor() { }

  getAllPermissions() {
    let data: any = [
      {
        "id": 1,
        "permissionName": "CREATE"
      },
      {
        "id": 2,
        "permissionName": "DELETE"
      },
      {
        "id": 3,
        "permissionName": "UPDATE"
      },
      {
        "id": 4,
        "permissionName": "ACTIVATE"
      }
    ]
    console.log(data);
    this.permissions = data;
    return data;
  }

  getAllModules() {
    let data: any = [
      {
        "id": 1,
        "moduleName": "INSTITUTION"
      },
      {
        "id": 2,
        "moduleName": "DEPARTMENT"
      },
      {
        "id": 3,
        "moduleName": "COURSE"
      },
      {
        "id": 4,
        "moduleName": "ANNOUNCEMENT"
      }
    ]

    this.moduleNames = data;
    return data;
  }

  getAllPermissionsByRoleIdAndUserId(userRoleId: any, userId: any) {
    console.log(userId);
    let data: AuthUserPermission[] = [];

    data[0] = {
      "id": 1,
      "userId": userId,
      "moduleId": 3,
      "permissionId": 1
    };

    data[2] = {
      "id": 2,
      "userId": userId,
      "moduleId": 3,
      "permissionId": 2
    };

    data[3] = {
      "id": 3,
      "userId": userId,
      "moduleId": 3,
      "permissionId": 3
    };

    data[4] = {
      "id": 4,
      "userId": userId,
      "moduleId": 2,
      "permissionId": 1
    };

    data[5] = {
      "id": 5,
      "userId": userId,
      "moduleId": 2,
      "permissionId": 2
    };

    data[6] = {
      "id": 5,
      "userId": userId,
      "moduleId": 2,
      "permissionId": 3
    };

    data[7] = {
      "id": 5,
      "userId": userId,
      "moduleId": 2,
      "permissionId": 4
    }


    this.userAndRolePermissions = data;
    console.log(this.userAndRolePermissions);

    return this.userAndRolePermissions;
  }


  // linkPermissions(userAndRolePermissions: AuthUserPermission[], moduleName: string, buttonArray: any[]) {
  //   let data: any = moduleName.toUpperCase;
  //   let module: any = userModule[data];
  //   userAndRolePermissions = userAndRolePermissions.filter(item =>
  //     item.moduleId == module
  //   );
  //   console.log(userAndRolePermissions);

  //   userAndRolePermissions.forEach(element => {
  //     if (element.moduleId == userModule.DEPARMTMENT && element.permissionId == userPermission.CREATE) {
  //       console.log("CREATE");
  //       buttonArray.showAddButton = true;
  //     }

  //     if (element.moduleId == userModule.DEPARMTMENT && element.permissionId == userPermission.DELETE) {
  //       console.log("DELETE");
  //       this.deleteButton = true;
  //     }

  //     if (element.moduleId == userModule.DEPARMTMENT && element.permissionId == userPermission.UPDATE) {
  //       console.log("UPDATE");
  //       this.updateButton = true;
  //     }

  //     if (element.moduleId == userModule.DEPARMTMENT && element.permissionId == userPermission.ACTIVATE) {
  //       console.log("ACTIVATE");
  //       this.showActivateButton = true;
  //     }
  //   })
  // }
}
