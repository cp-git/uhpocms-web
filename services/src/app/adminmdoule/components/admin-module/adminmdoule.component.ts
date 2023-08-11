import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accesscontrol } from 'app/accesscontrol/class/accesscontrol';
import { AccesscontrolService } from 'app/accesscontrol/services/accesscontrol.service';
import { Authuser } from 'app/auth-user/class/auth-user';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { AuthenticationserviceService } from 'app/authenticationlogin/service/authenticationservice.service';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-adminmdoule',
  templateUrl: './adminmdoule.component.html',
  styleUrls: ['./adminmdoule.component.css']
})
export class AdminmdouleComponent {

  authUser = new Authuser();
  role: string | undefined;
  userName!: string;
  adminId: any;
  userId: any;
  userRoleId: any;
  // accessControlData: Accesscontrol;

  userPermissions: AuthUserPermission[] = [];;
  modulePermissionIds: Set<number> = new Set<number>();
  authModule = userModule;
  actualUserRole: any;
  constructor(private _route: Router, private _auth: AuthUserService, private _authenticationService: AuthenticationserviceService, private _activatedRoute: ActivatedRoute,
    private accessControlService: AccesscontrolService,
    private userPermissionService: AuthUserPermissionService, private _location: Location
  ) {
    // this.accessControlData = new Accesscontrol();

    // Calling function to get permissions from session storage
    this.loadAllPermissions();
  }

  ngOnInit(): void {
    if (!this._auth.isUserLoggedIn()) {
      this._route.navigate(['authenticationlogin']);
    }
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    this.userId = sessionStorage.getItem('userId')
    console.log(this.userId)
    this.userRoleId = sessionStorage.getItem('userRoleId');
    // this.loadAccessControl();
    this.userPermissionService.getAllPermissionsByRoleIdAndUserId(this.userRoleId, this.userId)
    this.actualUserRole = sessionStorage.getItem('actualUserRole')
  }

  // function for loading permissions from session storage
  loadAllPermissions() {
    try {
      let sessionData: any;
      sessionData = sessionStorage.getItem('permissions');
      // console.log(sessionData);

      // converting string json into json object
      let data = JSON.parse(sessionData);
      this.userPermissions = data;

      // adding module ids in array ( module ids which are accessible to user)
      this.userPermissions.forEach(permission => {
        this.modulePermissionIds.add(permission.moduleId);
      });
      // console.log(this.modulePermissionIds);

    }
    catch (err) {
      console.log("Error", err);
    }

  }

  // loadAccessControl() {
  //   console.log(this.accessControlData);

  //   this.accessControlService.getAccessControlByUserId(this.userId).subscribe(
  //     (response) => {
  //       this.accessControlData = response;
  //     }
  //   );

  //   // if (this.accessControlData.userId != this.userId || (this.accessControlData == undefined || this.accessControlData == null)) {
  //   //   this.accessControlData = this.accessControlService.accessControlData;
  //   console.log(this.accessControlData);
  //   // }
  // }

  RedirectToAuth() {
    this._route.navigate(['AuthUser', this.userName]);

  }
  RedirectToAssignTeacher() {
    this._route.navigate(['assignteacher', this.userName]);

  }

  RedirectToInstituteAdminProfile() {
    this._route.navigate(['Profile', this.userName]);

  }

  RedirectToCourse() {

    this._route.navigate(['Courses']);

  }

  RedirectToAdminDept() {
    this._route.navigate(['Department', this.userName]);
  }

  RedirectTOLogin() {
    this._auth.logout()
    this._route.navigate(['authenticationlogin']);
  }


  RedirectToEnrollStudent() {

    this._route.navigate(['enrollstudent', this.userName])

  }

  RedirectToAdminInstitution() {
    this._route.navigate(['displayinstitute', this.userName])
  }

  RedirectToRole() {
    this._route.navigate(['AdminRole', this.userName])
  }

  RedirectToAnnouncement() {
    this._route.navigate(['announcement/admin', { id: this.adminId }])
  }


  AdminAnalytics() {
    this._route.navigate(['analytics']);
  }

  RedirectToCategory() {
    this._route.navigate(['category']);
  }




}
