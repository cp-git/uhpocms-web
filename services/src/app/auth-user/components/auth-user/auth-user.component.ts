import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Module specific imports

import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { Authuser } from 'app/auth-user/class/auth-user';

import { AuthUserAllColumn, AuthUserColumn, AuthUserUpdateColumn, AuthUserViewOneColumn } from 'app/auth-user/column/auth-user-column';
import { ProfileService } from 'app/profiles/services/profile.service';
import { json } from 'body-parser';
import { Profile } from 'app/profiles/class/profile';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';

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

  // for buttons to view
  showAddButton: boolean = true;
  showActivateButton: boolean = true;

  // adminRoleHeader: any; // header for minimum visible column data
  // adminRoleAllHeader: any;  // header for all visible column data

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data
  viewOneColumn: any;
  updateColumnNames: any;

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'authUserId';

  // adminRoles: AdminRole[] = []; 
  allData: Authuser[] = []; // list of active auth user
  allInActiveData: Authuser[] = []; // list of inactive auth user

  emptyAuthUser: Authuser;  // empty auth user
  currentData!: Authuser;  // for update and view, to show existing data



  constructor(private service: AuthUserService, private profileService: ProfileService, private location: Location, private dialogBoxService: DialogBoxService) {

    // assigng headers
    // this.adminRoleHeader = AdminRoleColumn;
    // this.adminRoleAllHeader = AdminRoleAllColumn;

    this.columnNames = AuthUserColumn;
    this.allColumnNames = AuthUserAllColumn;
    this.updateColumnNames = AuthUserUpdateColumn;
    this.viewOneColumn = AuthUserViewOneColumn;
    // creating empty object
    this.emptyAuthUser = new Authuser();
  }

  ngOnInit(): void {
    this.getAllAuthUser();  // for getting all active auth user
    this.getInActiveAuthUser(); // for getting all inactive auth user
    this.fetchProfileData();
  }

  // back button functionality
  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;

      this.showAddButton = true;
      this.showActivateButton = true;
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
    this.showAddButton = false;
    this.showActivateButton = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Authuser): void {

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
  onAddAuthUserSubmit(objectReceived: Authuser): void {
    this.addAuthuser(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateAuthUserSubmit(objectReceived: Authuser) {
    this.updateAuthuser(objectReceived);
  }
  private profile: Profile = {} as Profile;  // Declare the profile property
  private fetchProfileData() {
    // Fetch the profile data and assign it to this.profile
    this.profileService.getAllProfiles().subscribe(
      profileResponse => {
        this.profiles = profileResponse; // Assign the fetched profile data to this.profile
      },
      error => {
        console.log('Error retrieving profile data!');
      }
    );
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////
  profiles: Profile[] = [];

  private updateAuthuser(currentData: Authuser) {
    // Calling service for updating data
    this.service.updateAuthUser(currentData.authUserName, currentData).subscribe(
      response => {
        this.dialogBoxService.open("user updated successfully", 'information');
        // Check if Authuser ID and profile user ID are the same
        const matchingProfile = this.profiles.find(profile => profile.userId === currentData.authUserId);

        // (JSON.stringify(matchingProfile));
        if (matchingProfile) {
          this.profileService.getProfileByUserId(currentData.authUserId).subscribe(
            profileResponse => {
              const profileData = profileResponse; // Assuming profileResponse is the existing profile object
              // Update the necessary fields in the profile
              profileData.firstName = currentData.authUserFirstName;
              profileData.lastName = currentData.authUserLastName;
              profileData.adminEmail = currentData.authUserEmail;

              // Save the updated profile
              this.profileService.updateProfileByActiveAuthuser(currentData.authUserId, profileData).subscribe(
                profileUpdateResponse => {
                  console.log(`Profile updated successfully!`);
                  this.back();
                },
                profileUpdateError => {
                  console.log(`Profile updation failed!`);
                }
              );
            },
            profileError => {
              console.log(`Error retrieving profile data!`);
            }
          );
        } else {
          this.back();
        }
      },
      error => {
        this.dialogBoxService.open("User Updation Failed", 'warning');
      }
    );
  }



  currentDate = new Date();

  // For adding auth user
  private addAuthuser(currentData: Authuser) {

    currentData.authUserLastLogin = this.currentDate;
    currentData.authUserIsActive = false;  // setting active true

    // calling service for adding data

    //alert(JSON.stringify(currentData));

    this.service.addAuthUser(currentData).subscribe(
      (data) => {
        // alert('AuthUser added Successfully');
        //console.log('User added Successfully');
        this.dialogBoxService.open("user added successfully, but their status is currently listed as inactive.", 'information');
        this.emptyAuthUser = {} as Authuser;
        this.ngOnInit();
        this.back();
      },
      (error) => {
        //alert("Failed to add User");
        this.dialogBoxService.open("Failed to Add user", 'warning');
      });
  }


  // for getting all auth user
  private getAllAuthUser() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service.authUserList().subscribe(
      response => {

        this.allData = response; //assign data to local variable
        this.allData.sort((a, b) => a.authUserName.toLowerCase() > b.authUserName.toLowerCase() ? 1 : -1) // order by alphabets for authusername
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
    this.dialogBoxService.open('Are you sure you want to delete this User ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        // calling service to soft delete
        this.service.deleteAuthUser(authUserName).subscribe(
          (response) => {
            // alert('Auth user deleted successfully');
            this.dialogBoxService.open('User deleted successfully ', 'information')
            this.ngOnInit();
          },
          (error) => {
            this.dialogBoxService.open('User deletion Failed', 'warning');
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

  // For getting all inactive auth user
  private getInActiveAuthUser() {

    // calling service to get all inactive record
    this.service.getAllInactiveAuthUsers().subscribe(
      response => {
        this.allInActiveData = response;
        this.allInActiveData.sort((a, b) => a.authUserName.toLowerCase() > b.authUserName.toLowerCase() ? 1 : -1) // order by alphabets for authuser name
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
        // alert("Activated auth user");
        console.log("Activated auth user");
        this.ngOnInit();
      },
      error => {
        // alert("Failed to activate");
        console.log("Failed to activate");
      }
    );
  }

}


