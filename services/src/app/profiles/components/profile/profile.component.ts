import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Profile } from 'app/profiles/class/profile';
import { ProfileAllColumn, ProfileColumn, ProfileUpdateColumn, ProfileViewOneColumn } from 'app/profiles/column-names/profile-column';
import { ProfileService } from 'app/profiles/services/profile.service';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';
import { AdminRole } from 'app/admin-role/class/admin-role';
import { AdminRoleService } from 'app/admin-role/services/admin-role.service';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { Authuser } from 'app/auth-user/class/auth-user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // title heading
  moduleName: string = "Profile Administration";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  file!: File;

  imageUrl!: any;

  // for buttons to view
  // showAddButton: boolean = true;
  // showActivateButton: boolean = true;

  // If all data is available or not
  dataAvailable: boolean = false;

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data
  viewOneColumnNames: any;
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

  instituteId!: number;

  private profileUrl!: string;

  displayUrl!: any;

  imagesUrl!: any;
  userRoles: any;
  backupUserRoles: any;

  // for user Permissions
  buttonsArray: any;
  userAndRolePermissions: AuthUserPermission[] = [];
  userModule = userModule;

  constructor(
    private location: Location,
    private service: ProfileService,
    private departmentService: DepartmentService,
    private adminRoleService: AdminRoleService,
    private authUserService: AuthUserService,
    private http: HttpClient,
    private dialogBoxService: DialogBoxService,
    private userPermissionService: AuthUserPermissionService
  ) {
    // assigng Columns
    this.columnNames = ProfileColumn;
    this.allColumnNames = ProfileAllColumn;
    this.updateColumn = ProfileUpdateColumn;
    this.viewOneColumnNames = ProfileViewOneColumn;
    // creating empty object
    this.emptyProfile = new Profile();

    this.loadAdminInstitutions();
    this.loadDepartments();

    this.profileUrl = `${environment.instituteAdminUrl}/profile`;

    this.userRoles = [{ roleName: 'admin' }, { roleName: 'student' }, { roleName: 'teacher' }];
    this.backupUserRoles = [...this.userRoles];

    // Assining default values
    this.buttonsArray = {
      showAddButton: false,
      showActivateButton: false,
      showUpdateButton: false,
      showDeleteButton: false
    }
  }

  ngOnInit(): void {
    this.loadAndLinkUserPermissions();
    this.loadInactiveAuthUsers();
    this.loadActiveAuthUsers();
    this.getAllAdminProfiles();
    this.getInActiveProfiles();
    this.loadGenders();
    this.loadAdminRoles();

    this.displayUrl = this.profileUrl + '/getFileById';




  }

  // this function for loading permission from session storage and link permission 
  // with buttons to show and hide based on permissions 
  private async loadAndLinkUserPermissions() {
    this.userAndRolePermissions = await this.userPermissionService.linkAndLoadPermissions(userModule.PROFILE, this.userAndRolePermissions, this.buttonsArray);
    await this.userPermissionService.toggleButtonsPermissions(userModule.PROFILE, this.userAndRolePermissions, this.buttonsArray);
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

      this.userPermissionService.toggleButtonsPermissions(userModule.PROFILE, this.userAndRolePermissions, this.buttonsArray);

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
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;

    // changing column array
    // this.changePassingArray();
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {


    // changing column array
    // this.allColumnNames = ProfileAllColumnForUpdate;

    // changing column array
    // this.changePassingArray();

    // hiding view of all column and displaying all Profile's screen
    this.viewOne = true;
    this.viewAll = false;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Profile): void {

    // changing column array
    // this.changePassingArray();
    // this.allColumnNames = ProfileAllColumnForUpdate;

    // hiding update screen and displaying all Profile's screen
    this.viewAll = false;
    this.viewUpdate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
    // assingning data to current data for child component
    this.currentData = objectReceived;
    // this.getSelectedOptionOfDropdown({ currentData: this.currentData, key: 'userRoleId' })
    this.userRoles = this.backupUserRoles.filter((role: { roleName: string; }) => role.roleName == this.currentData.userRole)
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
    // const selectedRole = this.adminRoles.find(role => role.roleId == objectReceived.userRoleId);

    // if (selectedRole) {
    //   objectReceived.userRole = selectedRole.roleName


    //   this.addProfile(objectReceived);
    // }
    this.addProfile(objectReceived);

  }

  // on updateComponents's submit button clicked
  onUpdateProfileSubmit(objectReceived: Profile) {

    // const selectedRole = this.adminRoles.find(role => role.roleId == objectReceived.userRoleId);

    // if (selectedRole) {
    //   objectReceived.userRole = selectedRole.roleName


    //   this.updateProfile(objectReceived);
    // }

    this.updateProfile(objectReceived);

  }



  ///////////////////// DISPLAY THE DROPDOWN AUTH USER DATA /////////////////////
  getSelectedOptionOfDropdown(data: any) {

    const dataReceived = data.currentData;
    const key = data.key;


    if (key == 'userId') {
      this.cleanProfileObject(this.emptyProfile);
      this.service.getProfileByUserId(dataReceived.userId).subscribe(
        (data: Profile) => {

          // this.emptyProfile = data;
          this.emptyProfile.institutionId = data.institutionId;
          this.emptyProfile.adminDepartment = data.adminDepartment;
          this.emptyProfile.userRole = data.userRole;
          this.emptyProfile.userRoleId = data.userRoleId;
          this.emptyProfile.dob = data.dob;
          this.emptyProfile.adminGender = data.adminGender;
          this.emptyProfile.mobilePhone = data.mobilePhone;
          this.emptyProfile.adminAddress1 = data.adminAddress1;
          this.emptyProfile.adminAddress2 = data.adminAddress2;
          this.emptyProfile.adminState = data.adminState;
          this.emptyProfile.adminCity = data.adminCity;
          this.emptyProfile.adminZip = data.adminZip;
          this.emptyProfile.profilePics = data.profilePics;
          this.emptyProfile.activeUser = data.activeUser;

        }
      );

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

    if (key == 'userRoleId') {


      this.userRoles = this.backupUserRoles;
      const selectedRole = this.adminRoles.find(role => role.roleId == dataReceived.userRoleId);
      const userRole = this.backupUserRoles.find((role: { roleName: string | undefined; }) => role.roleName == selectedRole?.roleName)



      if (userRole != undefined) {
        this.emptyProfile.userRole = userRole.roleName;
        if (this.viewUpdate) {
          this.currentData.userRole = userRole.roleName;
        }
        this.userRoles = this.userRoles.filter((role: { roleName: string | undefined; }) => role.roleName == selectedRole?.roleName)

      }
      else {
        this.userRoles = this.backupUserRoles;
        this.emptyProfile.userRole = '';
        this.currentData.userRole = ''
      }
    }
  }


  ////////////////////////// CODE FOR WHEN IMAGE IS SELECTED //////////////////////////////////////////////
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.emptyProfile.profilePics = this.file.name;



    const reader = new FileReader();
    reader.onload = () => {

      this.imagesUrl = reader.result;

    }

    reader.readAsDataURL(this.file);


  }





  // Funcation calls specific to this module
  ///////////////////////////////////////////


  //////////////////////////////// GETTING ALL PROFILE DATA ////////////////////////////////////////

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







  //////////////////////// FETCHING THE ADMIN INSTITUTION FROM SESSION STORAGE /////////////////////////////
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


  //////////////////////// FETCHING ADMIN DEPARTMENT FROM SESSION STORAGE ////////////////////////////////// 
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


  /////////////////////// FETCHING THE ADMIN ROLE FROM SESSION STORAGE //////////////////////////////////////
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

  ///////////////////// FETCH ALL INACTIVE AUTH USER /////////////////////////////////////////////////////
  private loadInactiveAuthUsers() {
    this.authUserService.getAllInactiveAuthUsersProfile().subscribe(
      response => {
        this.inactiveAuthUsers = response;


        let name;
        for (let j = 0; j <= this.inactiveAuthUsers.length; j++) {

        }

      }
    );
  }


  //////////////////// FETCH ACTIVE AUTH USER ///////////////////////////////////////////////////////////
  private loadActiveAuthUsers() {
    this.authUserService.authUserList().subscribe(
      (response: Authuser[]) => {
        this.activeAuthUsers = response;
      }
    );
  }


  //////////////////////// SELECT THE GENDER ///////////////////////////////////////////////////////
  private loadGenders() {
    this.genders = [
      { "value": 'male', "name": "Male" },
      { "value": 'female', "name": "Female" },
      { "value": 'other', "name": "Other" }]
  }

  /////////////////////// INSERTING THE PROFILE USER ALONG WITH FORMDATA /////////////////////////
  private addProfile(currentData: Profile) {

    const instituteJson = JSON.stringify(currentData);

    const blob = new Blob([instituteJson], {
      type: 'application/json'
    })

    let formData = new FormData();
    formData.append("file", this.file);
    formData.append("admin", new Blob([JSON.stringify(currentData)], { type: 'application/json' }));


    // this.service.addProfile(formData).subscribe(
    //   (response) => {

    //     this.ngOnInit();
    //     this.back();


    //   }
    // )


    this.service.saveProfileByActiveAuthuser(currentData.userId, formData).subscribe(
      response => {
        if (currentData.activeUser === true) {
          this.authUserService.activateAuthUserById(currentData.userId).subscribe(
            response => {
              this.dialogBoxService.open("Profile Added Successfully", 'information').then((response) => {
                if (response) {
                  location.reload(); // Refresh the page
                }

              });
              this.emptyProfile = {} as Profile;
              this.ngOnInit();
              this.back();

            },
            error => {
              this.dialogBoxService.open('Failed to Add Profile ', 'warning')
            }
          );
        } else {
          this.dialogBoxService.open('Profile saved successfully. NOTE - Profile is not activated!', 'information')
          this.emptyProfile = {} as Profile;
          this.ngOnInit();
          this.back();
        }
      },
      error => {
        this.dialogBoxService.open('Failed to Add Profile ', 'warning')
      }
    );
  }

  ////////////////////  UPDATE THE PROFILE DATA USING FORMDATA AND JSON DATA /////////////////////////
  private updateProfile(currentData: Profile) {

    const instituteJson = JSON.stringify(currentData);

    const blob = new Blob([instituteJson], {
      type: 'application/json'
    });

    if (this.file == null) {


      this.service.updateProfileByAuthuser(currentData.userId, currentData).subscribe(
        response => {


          this.dialogBoxService.open("Profile Updated Successfully", 'information').then((response) => {
            if (response) {
              location.reload(); // Refresh the page
            }
          });

          this.back();
        },
        error => {
          this.dialogBoxService.open('Failed to Update Profile', 'warning');
        }
      );

    } else {


      let formData = new FormData();

      formData.append("file", this.file);
      currentData.profilePics = this.file.name;

      formData.append("admin", new Blob([JSON.stringify(currentData)], { type: 'application/json' }));

      this.service.updateProfileByActiveAuthuser(currentData.userId, formData).subscribe(
        response => {
          this.dialogBoxService.open('Profile Updated Successfully', 'information');
          location.reload();
          this.back();
        },
        error => {
          this.dialogBoxService.open('Failed to Update Profile', 'warning');
        }
      );
    }
  }


  /////////////////////////// DELETE THE PROFILE DATA ///////////////////////////////////


  private deleteProfile(currentData: Profile) {
    this.dialogBoxService.open('Are you sure you want to delete this Profile? ', 'decision').then((response) => {
      if (response) {

        // Do something if the user clicked OK
        // calling service to soft delete
        currentData.activeUser = false;
        this.service.deleteProfileByActiveAuthuser(currentData.userId, currentData).subscribe(
          response => {

            this.activeAuthUsers.find(authUser => {
              if (authUser.authUserId == currentData.userId) {
                this.authUserService.deleteAuthUser(authUser.authUserName).subscribe(
                  (response: any) => {
                    this.dialogBoxService.open('Profile deleted Successfully', 'information');
                    this.ngOnInit();
                  }
                );
              }
            })
          },
          (error) => {
            this.dialogBoxService.open('Profile deletion Failed', 'warning');
          }
        );
      } else {

        // Do something if the user clicked Cancel
      }
    });
  }

  ///////////////////////////////// GET ALL INACTIVE PROFILE DATA ///////////////////////////////////////
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


  /////////////////////// ACTIVATE THE PROFILE DATA USING ADMIN ID ////////////////////////////////////
  activateProfile(profile: Profile) {
    // if (this.isObjectComplete(profile)) {
    this.service.activateProfile(profile.adminId).subscribe(
      response => {
        this.authUserService.activateAuthUserById(profile.userId).subscribe(
          response => {
            this.dialogBoxService.open('Profile activated successfully', 'information');
            this.ngOnInit();
          },
          error => {
            this.dialogBoxService.open('Failed to activate Profile', 'warning');
          }
        );

      },
      error => {
        this.dialogBoxService.open('Profile activation Failed', 'warning');
      }
    );
    // } else {
    //  
    // }

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


  cleanProfileObject(object: any) {
    this.emptyProfile.institutionId = 0;
    this.emptyProfile.adminDepartment = 0;
    this.emptyProfile.userRole = '';
    this.emptyProfile.dob = '';
    this.emptyProfile.adminGender = '';
    this.emptyProfile.mobilePhone = '';
    this.emptyProfile.adminAddress1 = '';
    this.emptyProfile.adminAddress2 = '';
    this.emptyProfile.adminState = '';
    this.emptyProfile.adminCity = '';
    this.emptyProfile.adminZip = '';
    this.emptyProfile.profilePics = '';
    this.emptyProfile.activeUser = false;
    this.emptyProfile.userRoleId = 0;
    this.emptyProfile.firstName = '';
    this.emptyProfile.lastName = '';
    this.emptyProfile.adminEmail = '';
  }



  ////////////////////////////////////  FETCHING THE DATA USING ADMIN ID ///////////////////////////////
  display(adminId: number) {

    this.service.getProfileByAdminId(adminId).subscribe(
      (response) => {

      }
    )
  }



}
