import { Component } from '@angular/core';
import { AuthPermission } from 'app/permissions/class/auth-permission';
import { PermissionColumn } from 'app/permissions/columns-name/permission-column';
import { AuthPermissionService } from 'app/permissions/services/permission/auth-permission.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent {

  // title heading
  moduleName: string = "Master-Permission Administration";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  // for buttons to view
  showAddButton: boolean = false;
  showActivateButton: boolean = false;
  updateButton: boolean = false;
  deleteButton: boolean = false;

  columnNames: any; // header for column data
  // allColumnNames: any

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'id';

  // authPermissions: AuthPermission[] = []; 
  allData: AuthPermission[] = []; // list of active Auth Permission
  allInActiveData: AuthPermission[] = []; // list of inactive Auth Permission

  emptyAuthPermission: AuthPermission;  // empty AuthPermission
  currentData!: AuthPermission;  // for update and view, to show existing data

  constructor(private service: AuthPermissionService, private location: Location) {

    this.columnNames = PermissionColumn;
    // this.allColumnNames = PermissionColumn;

    // creating empty object
    this.emptyAuthPermission = new AuthPermission();
  }

  ngOnInit(): void {
    this.getAllAuthPermissions();  // for getting all active Auth Permissions
    // this.getInActiveAuthPermissions(); // for getting all inactive Auth Permissions
  }

  // back button functionality
  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;

      this.showAddButton = false;
      this.showActivateButton = false;

    } else {
      this.location.back();
    }

  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all Auth Permissions screen 
    this.viewOne = true;
    this.viewAll = false;
    this.showAddButton = false;
    this.showActivateButton = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: AuthPermission): void {

    // hiding update screen and displaying all Auth Permissions screen 
    this.viewAll = false;
    this.viewUpdate = true;
    this.showAddButton = false;
    this.showActivateButton = false;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: AuthPermission): void {
    this.deleteAuthPermission(objectReceived.id);
  }

  // // For navigate to activate screen with data
  // // function will call when child update button is clicked 
  // onChildActivateClick(objectReceived: AuthPermission): void {
  //   this.activateAuthPermission(objectReceived.id);
  // }

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

  // on addComponents's submit button clicked
  onAddAuthPermissionSubmit(objectReceived: AuthPermission): void {
    this.addPermission(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateAuthPermissionSubmit(objectReceived: AuthPermission) {
    this.updatePermission(objectReceived);
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // For updating Auth Permission
  private updatePermission(currentData: AuthPermission) {
    // calling service for updating data
    this.service.updateAuthPermission(currentData.id, currentData).subscribe(
      response => {
        console.log(`AuthPermission updated successfully !`);
        this.back();
      },
      error => {
        console.log(`AuthPermission updation failed !`);
      }
    );
  }

  // For adding Auth Permission
  private addPermission(currentData: AuthPermission) {

    // calling service for adding data
    this.service.addAuthPermission(currentData).subscribe(
      (data) => {
        console.log('Permission added Successfully');
        this.emptyAuthPermission = {} as AuthPermission;
        this.ngOnInit();
        this.back();
      },
      (error) => {
        console.log("Failed to add Permission");
      });
  }


  // for getting all Auth Permissions
  private getAllAuthPermissions() {

    // calling service to get all data
    this.service.getAllPermissions().subscribe(
      response => {
        console.log(response);

        this.allData = response; //assign data to local variable
      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  // For deleting (soft delete) Auth Permission using Permission name
  private deleteAuthPermission(id: number) {

    // calling service to soft delte
    this.service.deleteAuthPermission(id).subscribe(
      (response) => {
        console.log('Admin Permission deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        console.log('Admin Permission deletion failed');
      }
    );
  }

}
