import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AccessControl } from 'app/permissions/class/access-control';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { userPermission } from 'app/permissions/enum/user-permission.enum';
@Component({
  selector: 'app-module-checkbox',
  templateUrl: './module-checkbox.component.html',
  styleUrls: ['./module-checkbox.component.css']
})
export class ModuleCheckboxComponent implements OnInit {

  @Input() module: any;
  @Input() userPermissions: any;
  @Input() groupPermissions: any;
  @Input() assignPermissionTo: any;

  @Output() onChangePermissions: EventEmitter<any> = new EventEmitter();
  @Input() accessControl!: any;
  // accessControl: AccessControl;
  showInnerCheckboxes = false;
  userPermissionsIds: Set<number> = new Set<number>();
  groupPermissionsIds: Set<number> = new Set<number>();

  // permissions
  CREATE: any = userPermission.CREATE;
  DELETE: any = userPermission.DELETE;
  UPDATE: any = userPermission.UPDATE;
  ACTIVATE: any = userPermission.ACTIVATE;
  VIEW: any = userPermission.VIEW;

  masterPermission!: userPermission;
  constructor() {
    // this.accessControl = new AccessControl();
  }
  ngOnInit(): void {

    this.onSelectPermission();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userPermissions']) {
      this.userPermissionsIds.clear()
      this.userPermissions.forEach((permissions: { moduleId: any; permissionId: number; }) => {
        if (permissions.moduleId == this.module.id) {
          this.userPermissionsIds.add(permissions.permissionId);
        }
      })


    }
    if (changes['groupPermissions']) {
      this.groupPermissionsIds.clear()
      this.groupPermissions.forEach((permissions: { moduleId: any; permissionId: number; }) => {
        if (permissions.moduleId == this.module.id) {
          this.groupPermissionsIds.add(permissions.permissionId);
        }
      })


    }
  }

  toggleInnerCheckboxes(event: any) {
    this.showInnerCheckboxes = !this.showInnerCheckboxes

    // let checked = event.target.checked;
    // if (checked) {
    //   this.userPermissionsIds.push(permission);
    // } else {
    //   const index = this.userPermissionsIds.indexOf(permission);
    //   if (index !== -1) {
    //     this.userPermissionsIds.splice(index, 1);
    //   }
    // }
  }

  updatePermissions(event: any, permission: number) {


    let checked = event.target.checked;

    if (checked) {
      this.userPermissionsIds.add(permission);
      this.userPermissionsIds.add(this.VIEW)
    } else {
      const index = this.userPermissionsIds.delete(permission);
      // if (index !== -1) {
      //   this.userPermissionsIds.splice(index, 1);
      // }

      // if moudle/view is unchecked then all permission should be unchecked
      if (permission == this.VIEW) {
        this.userPermissionsIds.clear();
      }
    }
    this.onSelectPermission();
  }

  moduleAndPermissionIds: any;
  onSelectPermission() {


    this.moduleAndPermissionIds = {
      moduleId: this.module.id,
      permissionIds: Array.from(this.userPermissionsIds)
    };

    this.onChangePermissions.emit(this.moduleAndPermissionIds);
  }

  isAnyInnerCheckBoxChecked() {
    // Check if any of the inner checkboxes are checked
    return (
      this.userPermissionsIds.has(this.CREATE) ||
      this.userPermissionsIds.has(this.DELETE) ||
      this.userPermissionsIds.has(this.UPDATE) ||
      this.userPermissionsIds.has(this.ACTIVATE) ||
      this.groupPermissionsIds.has(this.CREATE) ||
      this.groupPermissionsIds.has(this.DELETE) ||
      this.groupPermissionsIds.has(this.UPDATE) ||
      this.groupPermissionsIds.has(this.ACTIVATE)
    );
  }


}
