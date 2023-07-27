import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Profile } from 'app/profiles/class/profile';
import { AuthModule } from 'app/permissions/class/auth-module';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Department } from 'app/department/class/department';
import { AdminRole } from 'app/admin-role/class/admin-role';
import { AuthGroupPermission } from 'app/permissions/class/auth-group-permission';
import { AccessControl } from 'app/permissions/class/access-control';

@Component({
  selector: 'app-add-update-controls',
  templateUrl: './add-update-controls.component.html',
  styleUrls: ['./add-update-controls.component.css']
})
export class AddUpdateControlsComponent implements OnInit {

  @Input() profiles: Profile[] = [];
  @Input() institutions: AdminInstitution[] = [];
  @Input() departments: Department[] = [];
  @Input() roles: AdminRole[] = [];

  @Input() masterModules: AuthModule[] = [];
  @Input() userPermissions: AuthUserPermission[] = [];
  @Input() groupPermissions: AuthGroupPermission[] = [];

  @Input() allAccessControls: AccessControl[] = [];

  @Output() onClickAssignPermissions: EventEmitter<any> = new EventEmitter();

  moduleAndPermissionsIds: any[] = [];
  userId: any = 0;
  institutionId: any = undefined;
  departmentId: any = undefined;
  roleId: any = 0;
  controlBasedOn: any = ['USERS', 'ROLES'];
  selectedOptionForAccess: any;
  userRoleId: any = undefined;

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {

  }

  emptyValues() {
    this.institutionId = undefined;
    this.userId = 0;
    this.departmentId = undefined;
    this.roleId = 0;
    this.userRoleId = undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['masterModules']) {
      this.masterModules = this.masterModules;
      // this.userId = sessionStorage.getItem('selectedUserId')
      console.log(this.userId);
      this.emptyValues();

    }

    if (changes['userPermissions']) {
      this.userPermissions = this.userPermissions;
      this.emptyValues();
    }

    if (changes['groupPermissions']) {
      this.groupPermissions = this.groupPermissions;
      this.emptyValues();
    }
  }

  back() {
    this.location.back();
  }

  // data is in form of module Id and permissions ids
  onChangePermissions(data: any) {
    console.log(data);
    console.log(this.moduleAndPermissionsIds);

    const index = this.moduleAndPermissionsIds.findIndex((permissions: { moduleId: any; }) => permissions.moduleId == data.moduleId);
    console.log(index);

    if (index !== -1) {
      this.moduleAndPermissionsIds.splice(index, 1);
    }
    if (data.permissionIds.length > 0) {
      this.moduleAndPermissionsIds.push(data);
    }

    console.log(JSON.stringify(this.moduleAndPermissionsIds));
  }

  onChangeUser() {
    // this.moduleAndPermissionsIds = [];
    // console.log(this.moduleAndPermissionsIds);
    this.profiles.forEach(profile => {

      if (profile.userId == this.userId) {
        this.userRoleId = profile.userRoleId
        this.roleId = profile.userRoleId
        // sessionStorage.setItem('selectedUserId', profile.userId.toString());

      }
      // console.log(profile);

    });


  }

  onChangeInstitution() {
    this.userId = 0;
    this.roleId = 0;
    this.departmentId = undefined;
    this.userRoleId = undefined;
  }
  onChangeDepartment() {
    this.userId = 0;
    this.roleId = 0;
    this.userRoleId = undefined
  }

  onClickSubmit() {

    console.log(this.moduleAndPermissionsIds);
    let selectedUserRoleId: number = 0;

    if (this.userRoleId > 0) {
      selectedUserRoleId = this.userRoleId;
    } else if (this.roleId > 0) {
      selectedUserRoleId = this.roleId;
    }

    console.log(selectedUserRoleId);

    let data: any = {
      access: this.selectedOptionForAccess,
      permissionIds: this.moduleAndPermissionsIds,
      userId: this.userId,
      userRoleId: selectedUserRoleId
    }
    console.log(data);

    this.onClickAssignPermissions.emit(data);
  }

  onChangeRole() {
    this.institutionId = undefined;
    this.userId = 0;
    this.departmentId = undefined;
    this.userRoleId = undefined;
  }

  onChangeUserRole() {
    this.userId = 0;
    this.roleId = 0;
  }

  onChangeControl() {
    this.institutionId = undefined;
    this.userId = 0;
    this.departmentId = undefined;
    this.roleId = 0;
    this.userRoleId = undefined;
  }


}
