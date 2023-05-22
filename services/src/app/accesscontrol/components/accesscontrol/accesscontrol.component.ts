

import { Component } from '@angular/core';
import { Accesscontrol } from 'app/accesscontrol/class/accesscontrol';
import { AccessControlAllColumn, AccessControlColumn, AccessControlUpdateColumn } from 'app/accesscontrol/column-names/accesscontrol-column';
import { AccesscontrolService } from 'app/accesscontrol/services/accesscontrol.service';
import { Authuser } from 'app/auth-user/class/auth-user';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { Location } from '@angular/common';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';


@Component({
  selector: 'app-accesscontrol',
  templateUrl: './accesscontrol.component.html',
  styleUrls: ['./accesscontrol.component.css']
})
export class AccesscontrolComponent {
  // title heading
  moduleName: string = "Access Control Administration";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;
  // If all data is available or not
  dataAvailable: boolean = false;

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data
  updateColumnNames: any; // header for updatio operation column data
  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'adminId';

  allData: Accesscontrol[] = []; // list of active Profiles
  allInActiveData: Accesscontrol[] = []; // list of inactive Profile

  emptyAccesscontrol: Accesscontrol;  // empty Profile
  currentData!: Accesscontrol;  // for update and view, to show existing data

  users: Authuser[] = [];
  profiles: Profile[] = [];

  sessionData: any;
  data: any;

  foundMatch: boolean = false;

  constructor(
    private location: Location,
    private service: AccesscontrolService,
    private authUserService: AuthUserService,
    private profileService: ProfileService
  ) {
    // assigng Columns
    this.columnNames = AccessControlColumn;
    this.allColumnNames = AccessControlAllColumn;
    this.updateColumnNames = AccessControlUpdateColumn;
    // creating empty object
    this.emptyAccesscontrol = new Accesscontrol();




  }

  ngOnInit(): void {

    this.loadActiveAuthUsers();
    this.getAllAccessControls();
    this.getUserRoles();



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

  // for navigating to add screen
  onAddClick() {


    this.viewAll = false;
    this.viewAdd = true;
    // changing column array
    this.changePassingArray();
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // changing column array
    this.changePassingArray();

    // hiding view of all column and displaying all Access Control's screen
    this.viewOne = true;
    this.viewAll = false;

    this.currentData = objectReceived;    // assingning data to current data for child component

    console.log(this.currentData);
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Accesscontrol): void {

    // changing column array
    this.changeUpdatedPassingArray();
    // this.allColumnNames = ProfileAllColumnForUpdate;

    // hiding update screen and displaying all Access Controls's screen
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Accesscontrol): void {
    this.deleteAccessControl(objectReceived);
  }



  // on addComponents's submit button clicked
  onAddProfileSubmit(objectReceived: Accesscontrol): void {
    this.addAccessControls(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateProfileSubmit(objectReceived: Accesscontrol) {
    // alert(JSON.stringify(objectReceived))
    this.updateAccessControls(objectReceived);
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // for getting all admin Profiles
  private getAllAccessControls() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service.getAllControls().subscribe(
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



  // For dropdown fetching active authusers required for update view and view all, view one screen
  private loadActiveAuthUsers() {
    this.authUserService.authUserList().subscribe(
      response => {
        this.users = response;
        console.log(this.users);
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
        this.back();
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
    this.service.getControlsById(currentData.id).subscribe(
      response => {
        this.currentData = response; //assign data to local variable  
      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  // for getting all admin Profiles by userId
  private getUserRoles() {

    // calling service to get all data
    this.profileService.getAllProfiles().subscribe(
      response => {

        this.profiles = response; //assign data to local variable  
        console.log(this.profiles);
      },
      error => {
        console.log('No data in table ');
      }
    );
  }


  ////////////////////////////////////////////
  // common
  ////////////////////////////////////////////
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
        column.arrayName = 'users';
      }
      if (column.key === 'userId' && (this.viewAdd === true)) {
        column.arrayName = 'users';
      }
    });


  }
//added sample comment
  //code for update functionality ui
  changeUpdatedPassingArray() {
    // Find the object with key 'userId'
    const authUserArray = this.updateColumnNames.find((column: { key: string, arrayName: string; }) => {
      if (column.key === 'userId' && (this.viewAdd === false)) {
        column.arrayName = 'users';
      }
      if (column.key === 'userId' && (this.viewAdd === true)) {
        column.arrayName = 'users';
      }
    });

  }
}
