import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { ProfileService } from 'app/profiles/services/profile.service';
import { Profile } from 'app/profiles/class/profile';
import { Authuser } from 'app/auth-user/class/auth-user';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { AuthenticationserviceService } from 'app/authenticationlogin/service/authenticationservice.service';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { AuthPermissionService } from 'app/permissions/services/permission/auth-permission.service';
import { AccessControlService } from 'app/permissions/services/accessControl/access-control.service';
@Component({
  selector: 'app-authenticationlogin',
  templateUrl: './authenticationlogin.component.html',
  styleUrls: ['./authenticationlogin.component.css']
})
export class AuthenticationloginComponent {

  authUser = new Authuser();

  _instituteAdminArray: Profile[] = [];
  constructor(
    private _auth: AuthUserService,
    private _route: Router,
    private _instituteadminprofile: ProfileService,
    private authenticationService: AuthenticationserviceService,
    private userPermissionService: AuthUserPermissionService,
    private accessControlService: AccessControlService,

  ) {
    this._getAllList();
  }


  userLogin() {

    // this._auth.loginDataAuthUser(this.authUser).subscribe(
    //   (data) => {
    //     const userName = data.authUserFirstName;
    //     this._instituteadminprofile
    //       ._getAllInstituteAdminList()
    //       .subscribe((data) => {
    //         this._instituteAdminArray = data;
    //         console.log(data);

    //         for (let i = 0; i <= this._instituteAdminArray.length; i++) {

    //           //console.log(this._authList[i].authUserId);

    //           if (this._instituteAdminArray[i].userId === this.authUser.authUserId) {
    //             console.log(this._instituteAdminArray[i].userId + "authuser_id in instituteadmin profile..")
    //             console.log(this.authUser.authUserId + "authuser_id in Auth User profile..")
    //             console.log(this._instituteAdminArray[i].userRole);

    //             if (this._instituteAdminArray[i].userRole == 'admin') {
    //               this._route.navigate(['adminmodule/admin/', userName])
    //             }
    //             else if (this._instituteAdminArray[i].userRole == 'teacher') {
    //               this._route.navigate(['teacherdisplay/teacher/', userName])
    //             }
    //             else if (this._instituteAdminArray[i].userRole == 'student') {
    //               this._route.navigate(['studentdata/student/', userName]);
    //             }


    //           }
    //         }


    //       },
    //         (error) => console.log("error"));


    //     this.authUser = data;
    //     console.log(this.authUser.authUserId);
    //     console.log('User Successfully Logged In..');
    //     //this._route.navigate(['demo']);
    //   },
    //   (error) => console.log(error)
    // );

    this._auth.loginDataAuthUser(this.authUser).subscribe(
      (data) => {
        console.log(data);

        const userName = data.authUserFirstName + " " + data.authUserLastName;
        this._instituteadminprofile.getAllProfiles().subscribe((data) => {
          this._instituteAdminArray = data;
          console.log(data);

          for (let i = 0; i < this._instituteAdminArray.length; i++) {

            //console.log(this._authList[i].authUserId);

            if (this._instituteAdminArray[i].userId == this.authUser.authUserId) {
              //console.log(this._instituteAdminArray[i].userId + "authuser_id in instituteadmin profile..")
              //console.log(this.authUser.authUserId + "authuser_id in Auth User profile..")
              // console.log(this._instituteAdminArray[i].userRole);

              let modules: any = JSON.stringify(this.userPermissionService.getAllModules());
              sessionStorage.setItem('modules', modules);

              if (this._instituteAdminArray[i].userRole == 'admin') {

                this.accessControlService.getAccessControlByUserId(this._instituteAdminArray[i].userId);
                this.userPermissionService.getAllPermissionsByRoleIdAndUserId(this._instituteAdminArray[i].userRole, this._instituteAdminArray[i].userId);

                this._route.navigate(['adminmodule/admin', userName]);
              }
              else if (this._instituteAdminArray[i].userRole == 'teacher') {

                this.accessControlService.getAccessControlByUserId(this._instituteAdminArray[i].userId);
                this.userPermissionService.getAllPermissionsByRoleIdAndUserId(this._instituteAdminArray[i].userRole, this._instituteAdminArray[i].userId);
                // sessionStorage.setItem('permissions', JSON.stringify(this.permissionService.getAllPermissionsByRoleIdAndUserId()));

                this._route.navigate(['teacherdisplay/teacher', userName, { id: this._instituteAdminArray[i].adminId }]);
              }
              else if (this._instituteAdminArray[i].userRole == 'student') {

                this.accessControlService.getAccessControlByUserId(this._instituteAdminArray[i].userId);
                this.userPermissionService.getAllPermissionsByRoleIdAndUserId(this._instituteAdminArray[i].userRole, this._instituteAdminArray[i].userId);

                this._route.navigate(['studentdata/student', userName, { id: this._instituteAdminArray[i].adminId }]);
              }

              sessionStorage.setItem('userRole', this._instituteAdminArray[i].userRole);
              sessionStorage.setItem('profileId', this._instituteAdminArray[i].adminId.toString());
              sessionStorage.setItem('userId', this._instituteAdminArray[i].userId.toString());
              this.authenticationService.registerSuccessfulLogin(userName);
            }
          }


        });


        this.authUser = data;
        //console.log(this.authUser.authUserId);
        // console.log('User Successfully Logged In..');
        //this._route.navigate(['demo']);
      },
      (error) => console.log(error)
    );


  }

  _getAllList() {
    this._instituteadminprofile.getAllProfiles().subscribe((data1) => {
      this._instituteAdminArray = data1;
      // console.log(data1);
    });

    //get all institution ids

    //  if (this._instituteAdminArray.length > 0) {
    //     this.isHidden = true;
    //  }
    // },
    //  )
  }









  back() {
    this._route.navigate(['home']);
  }

}
