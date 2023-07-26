import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Module specific imports
import { AdminRole } from 'app/admin-role/class/admin-role';
import { AdminRoleService } from 'app/admin-role/services/admin-role.service';
import { AdminRoleAllColumn, AdminRoleColumn } from 'app/admin-role/column-names/admin-role-column';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})
export class AdminRoleComponent implements OnInit {

  // title heading
  moduleName: string = "Role Administration";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  // for buttons to view
  // showAddButton: boolean = true;
  // showActivateButton: boolean = true;

  // If all data is available or not
  dataAvailable: boolean = false;

  // adminRoleHeader: any; // header for minimum visible column data
  // adminRoleAllHeader: any;  // header for all visible column data

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'roleId';

  // adminRoles: AdminRole[] = []; 
  allData: AdminRole[] = []; // list of active admin role
  allInActiveData: AdminRole[] = []; // list of inactive admin role

  emptyAdminRole: AdminRole;  // empty admin role
  currentData!: AdminRole;  // for update and view, to show existing data

  buttonsArray: any;
  userAndRolePermissions: AuthUserPermission[] = [];
  userModule = userModule;

  constructor(private service: AdminRoleService, 
    private location: Location,
    private dialogBoxService:DialogBoxService,
    private userPermissionService: AuthUserPermissionService,
    ) {

    // Assining default values
    this.buttonsArray = {
      showAddButton: false,
      showActivateButton: false,
      showUpdateButton: false,
      showDeleteButton: false
    }

    // assigng headers
    // this.adminRoleHeader = AdminRoleColumn;
    // this.adminRoleAllHeader = AdminRoleAllColumn;

    this.columnNames = AdminRoleColumn;
    this.allColumnNames = AdminRoleAllColumn;

    // creating empty object
    this.emptyAdminRole = new AdminRole();
  }

  ngOnInit(): void {
    this.loadAndLinkUserPermissions();

    this.getAllAdminRoles();  // for getting all active admin roles
    this.getInActiveAdminRoles(); // for getting all inactive admin roles
  }

  // this function for loading permission from session storage and link permission 
  // with buttons to show and hide based on permissions 
  private async loadAndLinkUserPermissions() {
    this.userAndRolePermissions = await this.userPermissionService.linkAndLoadPermissions(userModule.ROLE, this.userAndRolePermissions, this.buttonsArray);
    await this.userPermissionService.toggleButtonsPermissions(userModule.ROLE, this.userAndRolePermissions, this.buttonsArray);
  }

  // back button functionality
  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;

      // this.buttonsArray.showAddButton = true;
      // this.buttonsArray.showActivateButton = true;

      this.userPermissionService.toggleButtonsPermissions(userModule.ROLE, this.userAndRolePermissions, this.buttonsArray);
    } else {
      this.location.back();
    }

  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all admin roles screen 
    this.viewOne = true;
    this.viewAll = false;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: AdminRole): void {

    // hiding update screen and displaying all admin roles screen 
    this.viewAll = false;
    this.viewUpdate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: AdminRole): void {
    this.deleteAdminRole(objectReceived.roleName);
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onChildActivateClick(objectReceived: AdminRole): void {
    this.activateAdminRole(objectReceived.roleId);
  }

  // for navigating to add screen
  onAddClick() {
    this.viewAll = false;
    this.viewAdd = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // on addComponents's submit button clicked
  onAddAdminRoleSubmit(objectReceived: AdminRole): void {
    this.addRole(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateAdminRoleSubmit(objectReceived: AdminRole) {
    this.updateRole(objectReceived);
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // For updating admin role
  private updateRole(currentData: AdminRole) {
    // calling service for updating data
    this.service.updateAdminRole(currentData.roleName, currentData).subscribe(
      response => {
        this.dialogBoxService.open('Role Updated successfully', 'information');
        this.back();
      },
      error => {
        this.dialogBoxService.open('Role Updation Failed', 'warning');
      }
    );
  }

  // For adding admin role
  private addRole(currentData: AdminRole) {

    currentData.active = true;  // setting active true

    // calling service for adding data
    this.service.addAdminRole(currentData).subscribe(
      (data) => {
        this.dialogBoxService.open('Role Added Successfully', 'information');
        this.emptyAdminRole = {} as AdminRole;
        this.ngOnInit();
        this.back();
      },
      (error) => {
        this.dialogBoxService.open('Failed to Add Role', 'warning');
      });
  }


  // for getting all admin roles
  private getAllAdminRoles() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service.getAdminRoles().subscribe(
      response => {

        this.allData = response; //assign data to local variable
        this.allData.sort((a, b) => a.roleName.toLowerCase() > b.roleName.toLowerCase() ? 1 : -1) // order by alphabets for role name
        // if no data available
        if (this.allData.length > 0) {
          this.dataAvailable = true;
        }
      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  // For deleting (soft delete) admin role using role name
  private deleteAdminRole(roleName: string) {
    this.dialogBoxService.open('Are you sure you want to delete this Role ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        // calling service to soft delte
    this.service.deleteAdminRole(roleName).subscribe(
      (response) => {
        this.dialogBoxService.open('Role deleted successfully', 'information');
        this.ngOnInit();
      },
      (error) => {
        this.dialogBoxService.open('Role deletion Failed', 'warning');
      }
    );
  } else {
    console.log('User clicked Cancel');
    // Do something if the user clicked Cancel
  }
});
}

  // For getting all inactive admin roles
  private getInActiveAdminRoles() {

    // calling service to get all inactive record
    this.service.getAllDeactivatedRoles().subscribe(
      response => {
        this.allInActiveData = response;
        this.allInActiveData.sort((a, b) => a.roleName.toLowerCase() > b.roleName.toLowerCase() ? 1 : -1) // order by alphabets for role name
      },
      error => {
        console.log('No data in table ');
      }
    );

  }


  // For activating admin role using role id
  private activateAdminRole(roleId: number) {

    // calling service to activating admin role
    this.service.activateAdminRole(roleId).subscribe(
      response => {
        this.dialogBoxService.open('Role Activated successfully', 'information');
        this.ngOnInit();
      },
      error => {
        this.dialogBoxService.open('Failed to Activate ', 'warning');
      }
    );
  }

}

