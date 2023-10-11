import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccesscontrolService } from 'app/accesscontrol/services/accesscontrol.service';
import { AdminRole } from 'app/admin-role/class/admin-role';
import { AdminRoleService } from 'app/admin-role/services/admin-role.service';
import { Authuser } from 'app/auth-user/class/auth-user';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { AuthenticationserviceService } from 'app/authenticationlogin/service/authenticationservice.service';
import { AuthService } from 'app/authlogin/service/auth.service';
import { AuthModuleService } from 'app/permissions/services/authModule/auth-module.service';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { EmailRequest } from 'app/profiles/class/emailrequest';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
// import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    './assets/css/style.css',
    './assets/vendor/aos/aos.css',
    './assets/vendor/bootstrap-icons/bootstrap-icons.css',
    './assets/vendor/bootstrap/css/bootstrap.min.css',
    './assets/vendor/boxicons/css/boxicons.min.css',
    './assets/vendor/glightbox/css/glightbox.min.css',
    './assets/vendor/swiper/swiper-bundle.min.css',
  ],
})
export class HomeComponent {
  username!: string;
  password!: string;

  invalidLogin = false;
  successMessage!: string;
  loginSuccess = false;
  displayStyle = "none";
  displayFpStyle = "none";

  authUser = new Authuser();
  adminRoles: AdminRole[] = []
  _instituteAdminArray: Profile[] = [];
  constructor(private _route: Router, private _auth: AuthUserService,

    private actRoute: ActivatedRoute,
    private _instituteadminprofile: ProfileService,
    private authenticationService: AuthenticationserviceService,
    private userPermissionService: AuthUserPermissionService,
    private accessControlService: AccesscontrolService,
    private authModuleService: AuthModuleService,
    private adminRoleService: AdminRoleService,
    private dialogBoxService: DialogBoxService
    // this._route.params.subscribe(params => {
    //   const email = params['email'];

    // });
  ) {
    this.loadAdminRoles();
    this._getAllList();
    this.actRoute.params.subscribe(params => {
      const email = params['email'];
      // Now you can use the email ID in your component logic
    });
  }


  // public src="assets/videos/university_video.mp4"
  public src = 'assets/videos/university_video.mp4';
  _redirectToLogin() {
    this._route.navigate(['login']);
  }


  userLogin() {

    this._auth.loginDataAuthUser(this.authUser).subscribe(
      (data) => {

        const userName = data.authUserFirstName + " " + data.authUserLastName;
        this._instituteadminprofile.getAllProfiles().subscribe(async (data) => {

          console.log(data)
          this._instituteAdminArray = data;


          for (let i = 0; i < this._instituteAdminArray.length; i++) {



            if (this._instituteAdminArray[i].userId == this.authUser.authUserId) {

              // getting permissions for modules for user using role and user id
              await this.getAllPermissionsByRoleIdAndUserId(this._instituteAdminArray[i].userRoleId, this._instituteAdminArray[i].userId);

              let modules: any = JSON.stringify(this.authModuleService.getAllAuthModules());
              sessionStorage.setItem('modules', modules);

              if (this._instituteAdminArray[i].userRole == 'admin') {
                this._route.navigate(['adminmodule/admin', userName]);
              }
              else if (this._instituteAdminArray[i].userRole == 'teacher') {
                this._route.navigate(['teacherdisplay/teacher', userName, { id: this._instituteAdminArray[i].adminId }]);
              }
              else if (this._instituteAdminArray[i].userRole == 'student') {
                this._route.navigate(['studentdata/student', userName, { id: this._instituteAdminArray[i].adminId }]);
              }

              this.setValuesInSessionStorage(this._instituteAdminArray[i]);
              // adding ids in session storage like user role id, profile id, user id

              this.authenticationService.registerSuccessfulLogin(userName);

            }
          }


        });


        this.authUser = data;

        //this._route.navigate(['demo']);
      },
      (error) => console.log(error)
    );


  }

  forgotPass(email: any) {

    let emailReq: EmailRequest = new EmailRequest();

    emailReq.subject = "Request to change password\n";
    emailReq.text = "We got your request to change the password:\n\n"
      + "Please click on below link to change password\n"

      + "http://localhost:4200/#/profile/" + email;


    // +`https://example.com/reset-password?email=${encodeURIComponent(encryptedEmail)}`;





    emailReq.to = email;
    this._instituteadminprofile.sendEmail(emailReq).subscribe(response => {
      console.log("Email Sent")
      this.dialogBoxService.open('Please check your email to change the password', 'information');
      this.displayFpStyle = "none";
    })

  }
  navigateToProfile(email: string) {
    this._route.navigate(['/profile', email]);
  }

  _getAllList() {
    this._instituteadminprofile.getAllProfiles().subscribe((data1) => {
      this._instituteAdminArray = data1;

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

  async getAllPermissionsByRoleIdAndUserId(userRoleId: number, userId: any) {
    try {
      const response = await this.userPermissionService.getAllPermissionsByRoleIdAndUserId(
        userRoleId,
        userId
      ).toPromise();

      const userPermissions = response;

      sessionStorage.setItem('permissions', JSON.stringify(userPermissions));
    } catch (error) {
      // Handle any errors that occurred during the asynchronous call
      console.error('Error:', error);
    }
  }


  private setValuesInSessionStorage(profile: Profile) {
    sessionStorage.setItem('userRole', profile.userRole);
    sessionStorage.setItem('profileId', profile.adminId.toString());
    sessionStorage.setItem('userId', profile.userId.toString());
    sessionStorage.setItem('userRoleId', profile.userRoleId.toString());


    const actualUserRole = this.adminRoles.find(role => role.roleId == profile.userRoleId);
    if (actualUserRole != undefined)
      sessionStorage.setItem('actualUserRole', actualUserRole.roleName);
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


  openPopup() {

    this.displayStyle = "block";
    this.displayFpStyle = "none";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  openPassPopup() {
    this.displayFpStyle = "block";
    this.displayStyle = "none";
  }
  closePassPopup() {
    this.displayFpStyle = "none";
  }


}
