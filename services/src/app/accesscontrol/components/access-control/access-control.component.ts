import { Component } from '@angular/core';
import { Accesscontrol } from 'app/accesscontrol/class/accesscontrol';
import { AccessControlAllColumn, AccessControlColumn, AccessControlUpdateColumn } from 'app/accesscontrol/column-names/accesscontrol-column';
import { AccesscontrolService } from 'app/accesscontrol/services/accesscontrol.service';
import { Authuser } from 'app/auth-user/class/auth-user';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { Location } from '@angular/common';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';
import { Router } from '@angular/router';
import { AuthModule } from 'app/permissions/class/auth-module';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { AuthModuleService } from 'app/permissions/services/authModule/auth-module.service';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';
import { AdminRole } from 'app/admin-role/class/admin-role';
import { AdminRoleService } from 'app/admin-role/services/admin-role.service';
import { AuthGroupPermissionService } from 'app/permissions/services/authGroupPermission/auth-group-permission.service';
import { AuthGroupPermission } from 'app/permissions/class/auth-group-permission';
import { AdvFilterPipe } from 'app/shared/pipes/adv-filter/adv-filter.pipe';
import { FilterPipe } from 'app/shared/pipes/filter/filter.pipe';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent {
  // title heading
  moduleName: string = "Access Control Administration";
  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = true;
  viewAll: boolean = false;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  // for buttons to view
  // currently no use (therfore, assigned to false) // removeve this comment if you are going to use following variables
  showAddButton: boolean = false;
  showActivateButton: boolean = false;

  // If all data is available or not
  dataAvailable: boolean = false;
  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data
  updateColumnNames: any; // header for updatio operation column data

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'adminId';

  allAccessControls: Accesscontrol[] = []; // list of access control

  emptyAccesscontrol: Accesscontrol;  // empty Profile
  currentData!: Accesscontrol;  // for update and view, to show existing data

  // other modules data
  authUsers: Authuser[] = [];
  profiles: Profile[] = [];
  institutions: AdminInstitution[] = [];
  departments: Department[] = [];
  roles: AdminRole[] = [];
  groupPermissions: AuthGroupPermission[] = [];

  sessionData: any;
  data: any;

  userId: any;
  userRoleId: any;
  selectedUserId: any = undefined;
  masterModules: AuthModule[] = [];
  userPermissions: AuthUserPermission[] = [];

  selectedInstitutionId!: any;
  selectedDepartmentId!: any;

  advFilterPipe!: AdvFilterPipe;
  filterPipe!: FilterPipe;
  constructor(
    private location: Location,
    private service: AccesscontrolService,
    private authUserService: AuthUserService,
    private profileService: ProfileService,
    private authModuleService: AuthModuleService,
    private userPermissionService: AuthUserPermissionService,
    private departmentService: DepartmentService,
    private adminRoleService: AdminRoleService,
    private groupPermissionService: AuthGroupPermissionService,
    private dialogboxService: DialogBoxService
  ) {

    this.advFilterPipe = new AdvFilterPipe();
    this.filterPipe = new FilterPipe();
    this.loadAdminRoles();

    // assigng Columns
    this.columnNames = AccessControlColumn;
    this.allColumnNames = AccessControlAllColumn;
    this.updateColumnNames = AccessControlUpdateColumn;
    // creating empty object
    this.emptyAccesscontrol = new Accesscontrol();

    this.userId = sessionStorage.getItem('userId');
    this.userRoleId = sessionStorage.getItem('userRoleId');
  }

  ngOnInit(): void {
    this.loadAdminInstitutions();
    this.loadDepartments();
    this.loadMasterModules();
    this.loadAllUserPermissions();
    this.loadActiveAuthUsers();
    // this.getAllAccessControls();
    this.getProfiles();

    this.loadAllGroupPermissions();
  }

  // back button functionality
  back() {
    // if (this.viewAll == false) {
    //   this.viewAll = true;
    //   this.viewOne = false;
    //   this.viewAdd = false;
    //   this.viewUpdate = false;
    //   this.viewActivate = false;

    //   this.showAddButton = true;
    //   this.showActivateButton = false;

    // } else {
    this.location.back();
    // }

  }


  // for navigating to add screen
  onAddClick() {
    this.viewAll = false;
    this.viewAdd = true;
    this.showAddButton = false;
    this.showActivateButton = false;
  }



  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
    this.showAddButton = false;
    this.showActivateButton = false;
  }


  // For navigate to view screen with data
  // function will call when child view button is clicked
  onChildViewClick(objectReceived: any): void {
    // changing column array
    // this.changePassingArray();
    // hiding view of all column and displaying all admin roles screen 
    this.viewOne = true;
    this.viewAll = false;
    this.showAddButton = false;
    this.showActivateButton = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
    console.log(this.currentData);
  }


  // For navigate to update screen with data
  // function will call when child update button is clicked
  onChildUpdateClick(objectReceived: Accesscontrol): void {
    // changing column array
    this.changeUpdatedPassingArray();
    // this.allColumnNames = ProfileAllColumnForUpdate;
    // hiding update screen and displaying all admin roles screen 
    this.viewAll = false;
    this.viewUpdate = true;
    this.showAddButton = false;
    this.showActivateButton = false;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }


  // For navigate to update screen with data
  // function will call when child update button is clicked
  onChildDeleteClick(objectReceived: Accesscontrol): void {
    this.deleteAccessControl(objectReceived);
  }
  // on addComponents's submit button clicked
  onAddAccessControlSubmit(objectReceived: Accesscontrol): void {
    this.addAccessControls(objectReceived);
  }
  // on updateComponents's submit button clicked
  onUpdateAccessControlSubmit(objectReceived: Accesscontrol) {
    // alert(JSON.stringify(objectReceived))
    this.updateAccessControls(objectReceived);
  }

  onClickAddOrUpdateAccessControl(objectReceived: Accesscontrol) {
    this.addOrUpdateAccessControls(objectReceived);
  }

  // filtering profile based on institution id
  filteredProfiles: Profile[] = [];

  onChangeInstitution() {
    // filtering profile based on institution id

    this.filteredProfiles = this.advFilterPipe.transform(this.profiles, 'institutionId', this.selectedInstitutionId)
    console.log(this.filteredProfiles);

    // setting value foir unselect dropdown
    this.selectedDepartmentId = undefined;
    this.selectedUserId = undefined;
    this.emptyAccesscontrol = {} as Accesscontrol;

  }
  onChangeDepartment() {
    // filtering profile based on institution id
    this.filteredProfiles = this.advFilterPipe.transform(this.profiles, 'adminDepartment', this.selectedDepartmentId)
    console.log(this.filteredProfiles);

    // setting value foir unselect dropdown
    this.selectedUserId = undefined;
    this.emptyAccesscontrol = {} as Accesscontrol;

  }

  onChangeUser() {
    // console.log(data);
    // let userId = data.userId;
    // this.selectedUserId = data.userId;
    this.emptyAccesscontrol = new Accesscontrol()
    console.log(this.selectedUserId);
    console.log(this.allAccessControls);
    console.log(this.emptyAccesscontrol);

    this.allAccessControls.forEach(control => {
      if (control.userId == this.selectedUserId) {
        this.emptyAccesscontrol = { ...control };
      }
    })
    console.log(this.emptyAccesscontrol);

  }



  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////


  // for getting all admin AccessControls
  private getAllAccessControls() {
    this.dataAvailable = true;
    // calling service to get all data
    this.service.getAllControls().subscribe(
      response => {
        this.allAccessControls = response; //assign data to local variable
        //alert(JSON.stringify(this.allAccessControls));
        // if no data available
        if (this.allAccessControls.length > 0) {
          this.dataAvailable = true;
        }
      },
      error => {
        console.log('No data in table ');
      }
    );
  }
  // For dropdown fetching active authusers required for update view and view all, view one screen
  private loadActiveAuthUsers() {
    this.authUserService.authUserList().subscribe(
      response => {
        this.authUsers = response;
        console.log(this.authUsers);
      }
    );
  }


  // adding profile by usign userId(foreign key from authuser)
  private addAccessControls(currentData: Accesscontrol) {
    this.service.addControls(currentData).subscribe(
      response => {
        alert('AccessControl alloted successfully');
        this.emptyAccesscontrol = {} as Accesscontrol;
        this.ngOnInit();
        this.back();
      },
      error => {
        alert("Failed to allot controls");
      }
    );
  }


  // updating profile by usign userId(foreign key from authuser)
  private updateAccessControls(currentData: Accesscontrol) {
    this.service.updateControls(currentData.id, currentData).subscribe(
      response => {
        alert('AccessControl updated successfully');
        // this.back();
      },
      error => {
        alert("Failed to update AccessControl");
      }
    );
  }
  // updating profile by usign userId(foreign key from authuser)
  private addOrUpdateAccessControls(currentData: Accesscontrol) {
    console.log(currentData);

    this.service.addOrUpdateAccessControles(this.selectedUserId, currentData).subscribe(
      response => {
        alert('AccessControl updated successfully');
        // this.back();
        this.ngOnInit();
      },
      error => {
        alert("Failed to update AccessControl");
      }
    );
  }

  // For deleting profile (soft delete)
  // temporary using saveOrUpdate() for soft deleting later on change with delete by Id
  //(aftering convertin gby Id please change function call and remove this comment)
  private deleteAccessControl(currentData: Accesscontrol) {
    this.service.deleteControls(currentData.id).subscribe(
      response => {
        alert('Control deleted successfully');
        this.ngOnInit();
      },
      error => {
        alert("Failed to delete access control");
      }
    );
  }


  // for getting all admin Profiles
  private getAdminAccessControlsById(currentData: Accesscontrol) {
    // calling service to get all data
    this.service.getAccessControlByUserId(currentData.id).subscribe(
      response => {
        this.currentData = response; //assign data to local variable
      },
      error => {
        console.log('No data in table ');
      }
    );
  }


  // for getting all admin Profiles by userId
  private getProfiles() {
    // calling service to get all data
    this.profileService.getAllProfiles().subscribe(
      response => {
        this.profiles = response; //assign data to local variable
        this.filteredProfiles = response;
        console.log(this.profiles);
      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  // loading admin roles for dropdown
  private loadAdminRoles() {
    this.adminRoleService.getAdminRoles().subscribe(
      response => {
        this.roles = response;
      },
      error => {
        console.log("Failed to get adminRoles");
      }
    );
  }


  ////////////////////////////////////////////
  // common
  ////////////////////////////////////////////

  // for loading adminInstitutitons from session data
  private loadAdminInstitutions() {
    try {
      this.sessionData = sessionStorage.getItem('admininstitution');
      //console.log(this.sessionData);
      this.data = JSON.parse(this.sessionData);
      if(this.institutions.length<=0){
        for (var inst in this.data) {
          this.institutions.push(this.data[inst]);
        }
      }
     
    }
    catch (err) {
      console.log("Error", err);
    }
  }

  // fetching department data
  private loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      response => {
        this.departments = response;
      },
      error => {
        console.log("failed to get departments");
      }
    )
  }


  isObjectComplete(profile: any): boolean {
    for (const key in profile) {
      if (profile.hasOwnProperty(key) && key !== 'activeUser') {
        if (profile[key] == null || profile[key] === undefined || profile[key] === '') {
          return false;
        }
      }
    }
    return true;
  }


  // For changing passing array while calling child component
  // description - for add functionality we requires inactive authusers and
  // for viewAll / viewOne we requires active authusers
  changePassingArray() {
    //Find the object with key 'userId'
    const authUserArray = this.allColumnNames.find((column: { key: string, arrayName: string; }) => {
      if (column.key === 'userId' && (this.viewAdd === false)) {
        column.arrayName = 'authUsers';
      }
      if (column.key === 'userId' && (this.viewAdd === true)) {
        column.arrayName = 'authUsers';
      }
    });
  }


  //code for update functionality ui
  changeUpdatedPassingArray() {
    // Find the object with key 'userId'
    const authUserArray = this.updateColumnNames.find((column: { key: string, arrayName: string; }) => {
      if (column.key === 'userId' && (this.viewAdd === false)) {
        column.arrayName = 'authUsers';
      }
      if (column.key === 'userId' && (this.viewAdd === true)) {
        column.arrayName = 'authUsers';
      }
    });
  }
  // for getting all admin Profiles by userId
  private getAdminAccessControlsByUserId(currentData: Accesscontrol) {
    // calling service to get all data
    this.service.getAccessControlByUserId(currentData.userId).subscribe(
      response => {
        this.currentData = response; //assign data to local variable
      },
      error => {
        console.log('No data in table ');
      }
    );
  }


  private loadMasterModules() {
    this.authModuleService.getAllAuthModules().subscribe(
      (response) => {
        this.masterModules = response;
        console.log(this.masterModules);

        // adding some parameter in master module array
        this.masterModules.forEach(module => {
          switch (module.moduleName) {
            case 'INSTITUTION':
              module.hasCreate = true;
              module.hasActivate = true;
              module.hasDelete = true;
              module.hasUpdate = false;
              module.hasView = true;
              break;
            case 'ASSIGN_TEACHERS':
              module.hasCreate = false;
              module.hasActivate = false;
              module.hasDelete = false;
              module.hasUpdate = false;
              module.hasView = true;
              break;
            case 'ENROLL_STUDENTS':
              module.hasCreate = false;
              module.hasActivate = false;
              module.hasDelete = false;
              module.hasUpdate = false;
              module.hasView = true;
              break;
            case 'ANNOUNCEMENT':
              module.hasCreate = true;
              module.hasActivate = false;
              module.hasDelete = false;
              module.hasUpdate = false;
              module.hasView = true;
              break;
            case 'LESSONS':
              module.hasCreate = false;
              module.hasActivate = false;
              module.hasDelete = false;
              module.hasUpdate = false;
              module.hasView = true;
              break;
            case 'REVIEW_ANSWERS':
              module.hasCreate = false;
              module.hasActivate = false;
              module.hasDelete = false;
              module.hasUpdate = false;
              module.hasView = true;
              break;
            case 'QUESTION_ANSWER':
              module.hasCreate = true;
              module.hasActivate = false;
              module.hasDelete = false;
              module.hasUpdate = false;
              module.hasView = true;
              break;
            default:
              module.hasCreate = true;
              module.hasActivate = true;
              module.hasDelete = true;
              module.hasUpdate = true;
              module.hasView = true;
              break;
          }
        })

      }
    );
  }

  private loadAllUserPermissions() {
    this.userPermissionService.getAllUserPermissions().subscribe(
      (response) => {
        this.userPermissions = response;
        // console.log(this.userPermissions);

      }
    );
  }

  private loadAllGroupPermissions() {
    this.groupPermissionService.getAllGroupPermissions().subscribe(
      (response) => {
        this.groupPermissions = response;
        console.log(this.groupPermissions);

      }
    )
  }

  onClickAssignPermissions(data: any) {
    console.log(data);

    let accessControlFor = data.access;
    let moduleAndPermissionsIds = data['permissionIds'];
    let userId = data['userId'];
    let userRoleId = data['userRoleId'];

    if (accessControlFor == 'USERS') {
      this.userPermissionService.assignPermissionsToUserId(userId, userRoleId, moduleAndPermissionsIds).subscribe(
        (response) => {
          //alert("Permissions Updated...");
          this.dialogboxService.open('Permissions updated', 'information');
          this.ngOnInit();
        }
      )
    } else if (accessControlFor == 'ROLES') {
      console.log("sending..");

      this.userPermissionService.assignPermissionsToRoleId(userRoleId, moduleAndPermissionsIds).subscribe(
        (response) => {
          this.dialogboxService.open('Permissions updated', 'information');
          this.ngOnInit();
        }
      )
    }
  }

  getSelectedOptionOfDropdown(data: any) {
    console.log(data);
    let userId = data.userId;
    this.selectedUserId = data.userId;
    this.emptyAccesscontrol = new Accesscontrol()
    console.log(userId);
    console.log(this.allAccessControls);
    console.log(this.emptyAccesscontrol);

    this.allAccessControls.forEach(control => {
      if (control.userId == userId) {
        this.emptyAccesscontrol = { ...control };
      }
    })
    console.log(this.emptyAccesscontrol);

  }

}
