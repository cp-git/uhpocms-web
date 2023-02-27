import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Authuser } from 'app/authuser/authuser';
import { AuthuserserviceService } from 'app/authuser/service/authuserservice.service';
import { Admin } from 'app/roleadmin/admin';
import { AdminroleserviceService } from 'app/roleadmin/adminroleservice.service';
import { AdminInstitution } from '../admin-institution';
import { InstituteAdmin } from '../institute-admin';
import { InstituteAdminServiceService } from '../institute-admin-service.service';

@Component({
  selector: 'app-insertinstituteadminprofile',
  templateUrl: './insertinstituteadminprofile.component.html',
  styleUrls: ['./insertinstituteadminprofile.component.css', '../../app.component.css']
})
export class InsertinstituteadminprofileComponent {
  _instituteAdmin = new InstituteAdmin();
  adminInstitutions: AdminInstitution[] = [];
  inactiveProfiles: InstituteAdmin[] = [];
  adminDepartments: Department[] = [];
  adminRoles: Admin[] = [];

  authUsersData: Authuser[] = [];
  currentAuthUser: Authuser;

  isDisabled = true;
  sessionData: any;
  data: any;
  foundMatch: boolean = false;
  submitButton: string = 'Save';
  constructor(
    private _instituteAdminService: InstituteAdminServiceService,
    private _route: Router,
    private authUserService: AuthuserserviceService,
    private departmentService: DepartmentService,
    private adminRoleService: AdminroleserviceService
  ) {
    this.loadAdminInstitutions();
    this.loadAdminRoles();
    this.loadAuthUsers();
    this.currentAuthUser = new Authuser();
    this.loadAdminDepartments();
    this.loadAllInactiveProfiles();
  }

  addInstituteAdmin() {
    this._instituteAdminService.saveOrUpdateProfile(this._instituteAdmin.userId, this._instituteAdmin).subscribe(
      response => {
        if (this._instituteAdmin.activeUser === true) {
          this.authUserService.activateAuthUserById(this._instituteAdmin.userId).subscribe(
            response => {
              alert('Profile added successfully');

            },
            error => {
              alert("Failed to add profile");
            }
          );
        } else {
          alert('Profile saved successfully. NOTE - Profile is not activated!');
        }
        this._route.navigate(['displayInstituteAdmin']);
      },
      error => {
        alert("Failed to add profile");
      });
    // this._instituteAdminService._addInstituteAdminList(this._instituteAdmin).subscribe(
    //   response => {
    //     if (this._instituteAdmin.activeUser === true) {
    //       this.authUserService.activateAuthUserById(this._instituteAdmin.userId).subscribe(
    //         response => {
    //           alert('Profile added successfully');
    //           this._route.navigate(['displayInstituteAdmin']);
    //         },
    //         error => {
    //           alert("Failed to add profile");
    //         }
    //       );
    //     } else {
    //       alert('Profile saved successfully. NOTE - Profile is not activated!');
    //     }
    //   },
    //   error => {
    //     alert("Failed to add profile");
    //   });
  }

  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
  }

  private loadAdminRoles() {
    this.adminRoleService.fetchadminlist().subscribe(
      response => {
        this.adminRoles = response;
      },
      error => {
        console.log(error);

      }
    );
  }

  private loadAuthUsers() {
    this.authUserService.getAllInactiveAuthUsers().subscribe(
      response => {
        this.authUsersData = response;
      }
    );
  }

  getCurrentAuthUser(id: any) {
    // alert(id)

    this.inactiveProfiles.forEach(profile => {
      // alert("check " + profile.userId + " " + parseInt(id) + (profile.userId === parseInt(id)))
      if (profile.userId === parseInt(id)) {
        // alert(JSON.stringify(profile))
        this._instituteAdmin = Object.assign({}, profile);
        this.foundMatch = true;
        return;
      }
    });
    if (!this.foundMatch) {
      this._instituteAdmin = {} as InstituteAdmin;
    }

    this.authUsersData.forEach(user => {
      if (user.authUserId == id) {
        this.currentAuthUser = user;
        this._instituteAdmin.userId = this.currentAuthUser.authUserId;
        this._instituteAdmin.firstName = this.currentAuthUser.authUserFirstName;
        this._instituteAdmin.lastName = this.currentAuthUser.authUserLastName;
        this._instituteAdmin.adminEmail = this.currentAuthUser.authUserEmail;
      }
    })
  }

  loadAdminDepartments() {
    this.departmentService.fetchAllDepartments().subscribe(
      response => {
        this.adminDepartments = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadAllInactiveProfiles() {
    this._instituteAdminService.getAllDeactivatedInstituteProfiles().subscribe(
      response => {
        this.inactiveProfiles = response;
      },
      error => {
        alert("Failed to fetch data")
      }
    );

  }

  onChangeUserRole() {
    alert(this._instituteAdmin.userId);
    this.inactiveProfiles.forEach(profile => {
      if (profile.userId === this._instituteAdmin.userId) {
        console.log(profile);
      }
    });
  }



  backToDisplayScreen() {
    this._route.navigate(['displayInstituteAdmin']);
  }

  onFileSelected(event: any) {
    this._instituteAdmin.profilePics = event.target.files[0].name;
  }

  onChangeIsActive() {
    if (this._instituteAdmin.activeUser) {
      this.submitButton = 'Submit & Activate';
    } else {
      this.submitButton = 'Save';
    }

  }



}