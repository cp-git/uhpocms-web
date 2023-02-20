import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authuser } from 'app/authuser/authuser';
import { AuthuserserviceService } from 'app/authuser/service/authuserservice.service';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { InstituteAdminServiceService } from 'app/instituteadminprofile/institute-admin-service.service';

@Component({
  selector: 'app-authenticationlogin',
  templateUrl: './authenticationlogin.component.html',
  styleUrls: ['./authenticationlogin.component.css']
})
export class AuthenticationloginComponent {

  authUser = new Authuser();
  profile_id: number;
  _instituteAdminArray: InstituteAdmin[] = [];
  constructor(
    private _auth: AuthuserserviceService,
    private _route: Router,
    private route: ActivatedRoute,
    private _instituteadminprofile: InstituteAdminServiceService

  ) {
    this._getAllList();
    this.profile_id = 0;
  }


  userLogin() {
    this._auth.loginDataAuthUser(this.authUser).subscribe(
      (data) => {

        this._instituteadminprofile
          ._getAllInstituteAdminList()
          .subscribe((data) => {
            this._instituteAdminArray = data;
            console.log(data);

            for (let i = 0; i <= this._instituteAdminArray.length; i++) {

              //console.log(this._authList[i].authUserId);

              if (this._instituteAdminArray[i].userId === this.authUser.authUserId) {
                console.log(this._instituteAdminArray[i].userId + "authuser_id in instituteadmin profile..")
                console.log(this.authUser.authUserId + "authuser_id in Auth User profile..")
                //alert(this._instituteAdminArray[i].userRole);

                if (this._instituteAdminArray[i].userRole == 'admin') {
                  this._route.navigate(['adminmodule'])
                }
                else if (this._instituteAdminArray[i].userRole == 'teacher') {
                  this._route.navigate(['teacherdisplay'])
                }
                else if (this._instituteAdminArray[i].userRole == 'student') {
                  // alert(this._instituteAdminArray[i].adminId);
                  // alert({ state: { id: this._instituteAdminArray[i].adminId } });

                  this._route.navigate(['studentdata', { id: this._instituteAdminArray[i].adminId }]);

                }


              }
            }


          });


        this.authUser = data;
        console.log(this.authUser.authUserId);
        alert('User Successfully Logged In..');
        //this._route.navigate(['demo']);
      },
      (error) => console.log(error)
    );

  }



  _getAllList() {
    this._instituteadminprofile
      ._getAllInstituteAdminList()
      .subscribe((data1) => {
        this._instituteAdminArray = data1;
        console.log(data1);
      });


  }









  back() {
    this._route.navigate(['home']);
  }

}
