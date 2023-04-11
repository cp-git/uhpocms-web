import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Profile } from 'app/profiles/class/profile';
import { ProfileAllColumn, ProfileColumn } from 'app/profiles/column-names/profile-column';
import { ProfileService } from 'app/profiles/services/profile.service';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';
import { AdminRole } from 'app/admin-role/class/admin-role';
import { AdminRoleService } from 'app/admin-role/services/admin-role.service';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { Authuser } from 'app/auth-user/class/auth-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // title heading
  moduleName: string = "Profile's Administration";

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

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'adminId';

  allData: Profile[] = []; // list of active Profiles
  allInActiveData: Profile[] = []; // list of inactive Profile

  emptyProfile: Profile;  // empty Profile
  currentData!: Profile;  // for update and view, to show existing data

  adminInstitutions: AdminInstitution[] = [];
  departments: Department[] = [];
  adminRoles: AdminRole[] = [];
  inactiveAuthUsers: Authuser[] = [];
  activeAuthUsers: Authuser[] = [];
  genders: any;
  sessionData: any;
  data: any;

  foundMatch: boolean = false;

  constructor(
    private location: Location,
    private service: ProfileService,
    private departmentService: DepartmentService,
    private adminRoleService: AdminRoleService,
    private authUserService: AuthUserService
  ) {
    // assigng Columns
    this.columnNames = ProfileColumn;
    this.allColumnNames = ProfileAllColumn;

    // creating empty object
    this.emptyProfile = new Profile();

    this.loadAdminInstitutions();
    this.loadDepartments();


  }

  ngOnInit(): void {
    this.loadInactiveAuthUsers();
    this.loadActiveAuthUsers();
    this.getAllAdminProfiles();
    this.getInActiveProfiles();
    this.loadGenders();
    this.loadAdminRoles();
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
    // changing column array
    // this.allColumnNames = ProfileAllColumn;

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
    // this.allColumnNames = ProfileAllColumnForUpdate;

    // changing column array
    this.changePassingArray();

    // hiding view of all column and displaying all Profile's screen
    this.viewOne = true;
    this.viewAll = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Profile): void {

    // changing column array
    this.changePassingArray();
    // this.allColumnNames = ProfileAllColumnForUpdate;

    // hiding update screen and displaying all Profile's screen
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Profile): void {
    this.deleteProfile(objectReceived);
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onChildActivateClick(objectReceived: Profile): void {
    this.activateProfile(objectReceived);
  }

  // on addComponents's submit button clicked
  onAddProfileSubmit(objectReceived: Profile): void {
    this.addProfile(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateProfileSubmit(objectReceived: Profile) {
    // alert(JSON.stringify(objectReceived))
    this.updateProfile(objectReceived);
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // for getting all admin Profiles
  private getAllAdminProfiles() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service.getAllProfiles().subscribe(
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


  // fetching institutions data from session storage
  private loadAdminInstitutions() {

    try {
      this.sessionData = sessionStorage.getItem('admininstitution');
      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.adminInstitutions.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err)
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


  // loading admin roles for dropdown
  private loadAdminRoles() {
    this.adminRoleService.getAdminRoles().subscribe(
      response => {
        this.adminRoles = response;
      },
      error => {
        console.log("Failed to get adminRoles");
      }
    );
  }

  // For dropdown fetching inactive authusers required for add screen
  private loadInactiveAuthUsers() {
    this.authUserService.getAllInactiveAuthUsers().subscribe(
      response => {
        this.inactiveAuthUsers = response;
      }
    );
  }


  // For dropdown fetching active authusers required for update view and view all, view one screen
  private loadActiveAuthUsers() {
    this.authUserService.authUserList().subscribe(
      response => {
        this.activeAuthUsers = response;
      }
    );
  }


  // for genders dropdown
  private loadGenders() {
    this.genders = [
      { "value": 'male', "name": "Male" },
      { "value": 'female', "name": "Female" },
      { "value": 'other', "name": "Other" }]
  }

  // adding profile by usign userId(foreign key from authuser)
  private addProfile(currentData: Profile) {
    this.service.saveOrUpdateProfile(currentData.userId, currentData).subscribe(
      response => {
        if (currentData.activeUser === true) {
          this.authUserService.activateAuthUserById(currentData.userId).subscribe(
            response => {
              alert('Profile added successfully');
              this.emptyProfile = {} as Profile;
              this.ngOnInit();
              this.back();
            },
            error => {
              alert("Failed to add profile");
            }
          );
        } else {
          alert('Profile saved successfully. NOTE - Profile is not activated!');
        }

      },
      error => {
        alert("Failed to add profile");
      });
  }

  // updating profile by usign userId(foreign key from authuser)
  private updateProfile(currentData: Profile) {
    this.service.saveOrUpdateProfile(currentData.userId, currentData).subscribe(
      response => {
        alert('Profile updated successfully');
        this.back();
      },
      error => {
        alert("Failed to update profile");
      }
    );
  }

  // For deleting profile (soft delete)
  // temporary using saveOrUpdate() for soft deleting later on change with delete by Id
  //(aftering convertin gby Id please change function call and remove this comment)

  private deleteProfile(currentData: Profile) {
    currentData.activeUser = false;
    this.service.saveOrUpdateProfile(currentData.userId, currentData).subscribe(
      response => {
        console.log(currentData);
        this.activeAuthUsers.find(authUser => {
          if (authUser.authUserId == currentData.userId) {
            this.authUserService.deleteAuthUser(authUser.authUserName).subscribe(
              response => {
                alert('Profile deleted successfully');
                this.ngOnInit();
              }
            );
          }
        })
      },
      error => {
        alert("Failed to delete profile");
      }
    );
  }

  // For getting all inactive admin roles
  private getInActiveProfiles() {

    // calling service to get all inactive record
    this.service.getAllDeactivatedProfiles().subscribe(
      response => {
        this.allInActiveData = response;

      },
      error => {
        console.log('No data in table ');
      }
    );

  }


  // for activate profile by using admin id
  activateProfile(profile: Profile) {
    // if (this.isObjectComplete(profile)) {
    this.service.activateProfile(profile.adminId).subscribe(
      response => {
        this.authUserService.activateAuthUserById(profile.userId).subscribe(
          response => {
            alert('Profile activated successfully');
            this.ngOnInit();
          },
          error => {
            alert("Failed to activate profile");
          }
        );

      },
      error => {
        alert("Profile activation failed");
      }
    );
    // } else {
    //   alert("profile is incomplete to activate!");
    // }

  }


  // getCurrentAuthUser(id: any) {
  //   // alert(id)

  //   this.allInActiveData.forEach(profile => {
  //     // alert("check " + profile.userId + " " + parseInt(id) + (profile.userId === parseInt(id)))
  //     if (profile.userId === parseInt(id)) {
  //       // alert(JSON.stringify(profile))
  //       this.emptyProfile = Object.assign({}, profile);
  //       this.foundMatch = true;
  //       return;
  //     }
  //   });
  //   if (!this.foundMatch) {
  //     this.emptyProfile = {} as InstituteAdmin;
  //   }

  //   this.activeAuthUsers.forEach(user => {
  //     if (user.authUserId == id) {
  //       this.currentAuthUser = user;
  //       this.emptyProfile.userId = this.currentAuthUser.authUserId;
  //       this.emptyProfile.firstName = this.currentAuthUser.authUserFirstName;
  //       this.emptyProfile.lastName = this.currentAuthUser.authUserLastName;
  //       this.emptyProfile.adminEmail = this.currentAuthUser.authUserEmail;
  //     }
  //   })
  // }

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
  // for viewAll / viewOne / Update we requires active authusers

  changePassingArray() {
    // Find the object with key 'userId'
    const authUserArray = this.allColumnNames.find((column: { key: string, arrayName: string; }) => {
      if (column.key === 'userId' && (this.viewAdd === false)) {
        column.arrayName = 'activeAuthUsers';
      }
      if (column.key === 'userId' && (this.viewAdd === true)) {
        column.arrayName = 'inactiveAuthUsers';
      }
    });

  }



}
