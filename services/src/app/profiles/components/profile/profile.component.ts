import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Profile } from 'app/profiles/class/profile';
import { ProfileAllColumn, ProfileColumn, ProfileUpdateColumn } from 'app/profiles/column-names/profile-column';
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

  // for buttons to view
  showAddButton: boolean = true;
  showActivateButton: boolean = true;

  // If all data is available or not
  dataAvailable: boolean = false;

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data
  updateColumn: any;
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
    this.updateColumn = ProfileUpdateColumn;
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

      this.showAddButton = true;
      this.showActivateButton = true;
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
    this.showAddButton = false;
    this.showActivateButton = false;

    // changing column array
    this.changePassingArray();
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
    // this.allColumnNames = ProfileAllColumnForUpdate;

    // changing column array
    this.changePassingArray();

    // hiding view of all column and displaying all Profile's screen
    this.viewOne = true;
    this.viewAll = false;
    this.showAddButton = false;
    this.showActivateButton = false;

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
    this.showAddButton = false;
    this.showActivateButton = false;
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
    // console.log(JSON.stringify(objectReceived))
    this.updateProfile(objectReceived);
  }

  getSelectedOptionOfDropdown(dataReceived: Profile) {
    this.authUserService.getAuthUserById(dataReceived.userId).subscribe(
      (data: Authuser) => {
        this.emptyProfile.firstName = data.authUserFirstName;
        this.emptyProfile.lastName = data.authUserLastName;
        this.emptyProfile.adminEmail = data.authUserEmail;
      },
      (error) => {
        console.log("failed to fetch auth user");

      }
    )
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
        this.allData.sort((a, b) => a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1) // order by alphabets for first name
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



  //   // Assuming you have a function to retrieve all profiles
  // getAllProfilesByInstitution(institutionName) {
  //   const profiles = this.getAllAdminProfiles(); // Replace with your function to retrieve all profiles
  //   const activeInstitutionProfiles = profiles.filter((profile:any) => {
  //     return profile.institution === institutionName && profile.institution.isActive;
  //   });

  //   return activeInstitutionProfiles;
  // }

  // const institutionName = "exampleInstitution";
  // const activeInstitutionProfiles = getAllProfilesByInstitution(institutionName);

  // console.log(activeInstitutionProfiles);


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
      (response: Authuser[]) => {
        this.inactiveAuthUsers = response;
      }
    );
  }


  // For dropdown fetching active authusers required for update view and view all, view one screen
  private loadActiveAuthUsers() {
    this.authUserService.authUserList().subscribe(
      (response: Authuser[]) => {
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
              console.log('Profile added successfully');
              this.emptyProfile = {} as Profile;
              this.ngOnInit();
              this.back();
            },
            error => {
              console.log("Failed to add profile");
            }
          );
        } else {
          console.log('Profile saved successfully. NOTE - Profile is not activated!');
          this.emptyProfile = {} as Profile;
          this.ngOnInit();
          this.back();
        }

      },
      error => {
        console.log("Failed to add profile");
      });
  }

  // updating profile by usign userId(foreign key from authuser)
  private updateProfile(currentData: Profile) {
    this.service.saveOrUpdateProfile(currentData.userId, currentData).subscribe(
      response => {
        console.log('Profile updated successfully');
        this.back();
      },
      error => {
        console.log("Failed to update profile");
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
              (response: any) => {
                console.log('Profile deleted successfully');
                this.ngOnInit();
              }
            );
          }
        })
      },
      error => {
        console.log("Failed to delete profile");
      }
    );
  }

  // For getting all inactive admin roles
  private getInActiveProfiles() {

    // calling service to get all inactive record
    this.service.getAllDeactivatedProfiles().subscribe(
      response => {
        this.allInActiveData = response;
        this.allInActiveData.sort((a, b) => a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1) // order by alphabets for first name
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
            console.log('Profile activated successfully');
            this.ngOnInit();
          },
          error => {
            console.log("Failed to activate profile");
          }
        );

      },
      error => {
        console.log("Profile activation failed");
      }
    );
    // } else {
    //   console.log("profile is incomplete to activate!");
    // }

  }


  // getCurrentAuthUser(id: any) {
  //   // console.log(id)

  //   this.allInActiveData.forEach(profile => {
  //     // console.log("check " + profile.userId + " " + parseInt(id) + (profile.userId === parseInt(id)))
  //     if (profile.userId === parseInt(id)) {
  //       // console.log(JSON.stringify(profile))
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
