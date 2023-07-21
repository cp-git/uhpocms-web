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
  showAddButton: boolean = true;
  showActivateButton: boolean = true;

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
  constructor(
    private location: Location,
    private service: ProfileService,
    private departmentService: DepartmentService,
    private adminRoleService: AdminRoleService,
    private authUserService: AuthUserService,
    private http: HttpClient,
    private dialogBoxService: DialogBoxService
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
  }

  ngOnInit(): void {
    this.loadInactiveAuthUsers();
    this.loadActiveAuthUsers();
    this.getAllAdminProfiles();
    this.getInActiveProfiles();
    this.loadGenders();
    this.loadAdminRoles();

    this.displayUrl = this.profileUrl + '/getFileById';




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
    // this.changePassingArray();
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
    console.log(objectReceived);
    
    // changing column array
    // this.allColumnNames = ProfileAllColumnForUpdate;

    // changing column array
    // this.changePassingArray();

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
    // this.changePassingArray();
    // this.allColumnNames = ProfileAllColumnForUpdate;

    // hiding update screen and displaying all Profile's screen
    this.viewAll = false;
    this.viewUpdate = true;
    this.showAddButton = false;
    this.showActivateButton = false;
    // assingning data to current data for child component
    this.currentData = objectReceived;
    // this.getSelectedOptionOfDropdown({ currentData: this.currentData, key: 'userRoleId' })
    this.userRoles = this.userRoles.filter((role: { roleName: string; }) => role.roleName == this.currentData.userRole)
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
    //   console.log(objectReceived);

    //   this.addProfile(objectReceived);
    // }
    this.addProfile(objectReceived);

  }

  // on updateComponents's submit button clicked
  onUpdateProfileSubmit(objectReceived: Profile) {
    // console.log(JSON.stringify(objectReceived))
    // const selectedRole = this.adminRoles.find(role => role.roleId == objectReceived.userRoleId);

    // if (selectedRole) {
    //   objectReceived.userRole = selectedRole.roleName
    //   console.log(objectReceived);

    //   this.updateProfile(objectReceived);
    // }

    this.updateProfile(objectReceived);

  }

  getSelectedOptionOfDropdown(data: any) {

    const dataReceived = data.currentData;
    const key = data.key;
    console.log(key);

    if (key == 'userId') {
      this.cleanProfileObject(this.emptyProfile);
      this.service.getProfileByUserId(dataReceived.userId).subscribe(
        (data: Profile) => {
          console.log(data);
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

      console.log(selectedRole);
      if (userRole != undefined) {
        this.emptyProfile.userRole = userRole.roleName;
        this.currentData.userRole = userRole.roleName;
        this.userRoles = this.userRoles.filter((role: { roleName: string | undefined; }) => role.roleName == selectedRole?.roleName)
        console.log(this.userRoles);
      }
      else {
        this.userRoles = this.backupUserRoles;
        this.emptyProfile.userRole = '';
        this.currentData.userRole = ''
      }
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.emptyProfile.profilePics = this.file.name;
    console.log(this.file);

    const reader = new FileReader();
    reader.onload = () => {

      this.imagesUrl = reader.result;

    }

    reader.readAsDataURL(this.file);


  }





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

    const instituteJson = JSON.stringify(currentData);

    const blob = new Blob([instituteJson], {
      type: 'application/json'
    })

    let formData = new FormData();
    formData.append("file", this.file);
    formData.append("admin", new Blob([JSON.stringify(currentData)], { type: 'application/json' }));


    // this.service.addProfile(formData).subscribe(
    //   (response) => {
    //     console.log(response);
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

  // updating profile by usign userId(foreign key from authuser)
  private updateProfile(currentData: Profile) {

    const instituteJson = JSON.stringify(currentData);

    const blob = new Blob([instituteJson], {
      type: 'application/json'
    })

    let formData = new FormData();
    formData.append("file", this.file);
    formData.append("admin", new Blob([JSON.stringify(currentData)], { type: 'application/json' }));


    let varData = currentData.profilePics;
    console.log("var Data" + varData);


    if (varData === currentData.profilePics) {
      console.log("Data.." + varData);
      // formData.append("file", varData);
      this.service.updateProfileByAuthuser(currentData.userId, currentData).subscribe(
        response => {
          console.log("in services");

          this.dialogBoxService.open('Profile Updated Successfully', 'information')
          this.back();
        },
        error => {
          this.dialogBoxService.open('Failed to Update Profile', 'warning')
        }
      );

    }

    else {
      formData.append("file", this.file);
      this.service.updateProfileByActiveAuthuser(currentData.userId, formData).subscribe(
        response => {
          this.dialogBoxService.open('Profile Updated Successfully', 'information')
          this.back();
        },
        error => {
          this.dialogBoxService.open('Failed to Update Profile', 'warning')
        }
      );

    }

  }

  // For deleting profile (soft delete)
  // temporary using saveOrUpdate() for soft deleting later on change with delete by Id
  //(aftering convertin gby Id please change function call and remove this comment)

  private deleteProfile(currentData: Profile) {
    this.dialogBoxService.open('Are you sure you want to delete this Profile? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        // calling service to soft delete
        currentData.activeUser = false;
        this.service.deleteProfileByActiveAuthuser(currentData.userId, currentData).subscribe(
          response => {
            console.log(currentData);
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
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
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

  // changePassingArray() {
  //   // Find the object with key 'userId'
  //   const authUserArray = this.allColumnNames.find((column: { key: string, arrayName: string; }) => {
  //     if (column.key === 'userId' && (this.viewAdd === false)) {
  //       column.arrayName = 'activeAuthUsers';
  //     }
  //     if (column.key === 'userId' && (this.viewAdd === true)) {
  //       column.arrayName = 'inactiveAuthUsers';
  //     }
  //   });


  // }

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



  display(adminId: number) {

    this.service.getProfileByAdminId(adminId).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }



}
