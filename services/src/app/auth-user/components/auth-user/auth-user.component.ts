import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
// Module specific imports

import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { Authuser } from 'app/auth-user/class/auth-user';
import { AuthUserAllColumn, AuthUserColumn } from 'app/auth-user/column/auth-user-column';


@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.css']
})
export class AuthUserComponent implements OnInit {

  // title heading
  moduleName: string = "AuthUser Administration";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;
  // If all data is available or not
  dataAvailable: boolean = false;

  // adminRoleHeader: any; // header for minimum visible column data
  // adminRoleAllHeader: any;  // header for all visible column data

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'authUserId';

  // adminRoles: AdminRole[] = []; 
  allData: Authuser[] = []; // list of active auth user
  allInActiveData: Authuser[] = []; // list of inactive auth user

  emptyAuthUser: Authuser;  // empty auth user
  currentData!: Authuser;  // for update and view, to show existing data



  constructor(private service: AuthUserService, private location: Location) {

    // assigng headers
    // this.adminRoleHeader = AdminRoleColumn;
    // this.adminRoleAllHeader = AdminRoleAllColumn;

    this.columnNames = AuthUserColumn;
    this.allColumnNames = AuthUserAllColumn;

    // creating empty object
    this.emptyAuthUser = new Authuser();
  }

  ngOnInit(): void {
    this.getAllAuthUser();  // for getting all active auth user
    this.getInActiveAuthUser(); // for getting all inactive auth user
  }

  // back button functionality
  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;
    } else {
      this.location.back();
    }

  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all auth users screen 
    this.viewOne = true;
    this.viewAll = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Authuser): void {

    // hiding update screen and displaying all admin roles screen 
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Authuser): void {
    this.deleteAuthuser(objectReceived.authUserName);
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onChildActivateClick(objectReceived: Authuser): void {
    this.activateAuthuser(objectReceived.authUserId);
  }

  // for navigating to add screen
  onAddClick() {
    this.viewAll = false;
    this.viewAdd = true;
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
  }

  // on addComponents's submit button clicked
  onAddAuthUserSubmit(objectReceived: Authuser): void {
    this.addAuthuser(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateAuthUserSubmit(objectReceived: Authuser) {
    this.updateAuthuser(objectReceived);
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // For updating auth user
  private updateAuthuser(currentData: Authuser) {
    // calling service for updating data
    this.service.updateAuthUser(currentData.authUserName, currentData).subscribe(
      response => {
        alert(`Auth User updated successfully !`);
        this.back();
      },
      error => {
        alert(`AuthUser updation failed !`);
      }
    );
  }

  // For adding auth user
  private addAuthuser(currentData: Authuser) {

    currentData.authUserIsActive = true;  // setting active true

    // calling service for adding data
    this.service.addAuthUser(currentData).subscribe(
      (data) => {
        alert('AuthUser added Successfully');
        this.emptyAuthUser = {} as Authuser;
        this.ngOnInit();
        this.back();
      },
      (error) => {
        alert("Failed to add User");
      });
  }


  // for getting all auth user
  private getAllAuthUser() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service.authUserList().subscribe(
      response => {

        this.allData = response; //assign data to local variable

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

  // For deleting (soft delete) auth user using userName
  private deleteAuthuser(authUserName: string) {

    // calling service to soft delete
    this.service.deleteAuthUser(authUserName).subscribe(
      (response) => {
        alert('Auth user deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        alert('Auth user deletion failed');
      }
    );
  }

  // For getting all inactive auth user
  private getInActiveAuthUser() {

    // calling service to get all inactive record
    this.service.getAllInactiveAuthUsers().subscribe(
      response => {
        this.allInActiveData = response;
      },
      error => {
        console.log('No data in table ');
      }
    );

  }


  // For activating admin role using role id
  private activateAuthuser(authUserId: number) {

    // calling service to activating admin role
    this.service.activateAuthUserById(authUserId).subscribe(
      response => {
        alert("Activated auth user");
        this.ngOnInit();
      },
      error => {
        alert("Failed to activate");
      }
    );
  }

}


