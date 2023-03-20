import { Component } from '@angular/core';
import { Router } from '@angular/router';

//import { AuthuserserviceService } from 'app/authuser/authuserservice.service';

import { AuthuserserviceService } from 'app/authuser/service/authuserservice.service';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { InstituteAdminServiceService } from 'app/instituteadminprofile/institute-admin-service.service';

import { AuthService } from '../service/auth.service';
import { Authuser } from '../class/authuser';

@Component({
  selector: 'app-loginauth',
  templateUrl: './loginauth.component.html',
  styleUrls: ['./loginauth.component.css'],
})
export class LoginauthComponent {
  username!: string;
  password!: string;
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;

  authUser = new Authuser();
  _instituteadminprofile = new InstituteAdmin();

  firstName!: string;



  constructor(
    private _auth: AuthuserserviceService,
    private _route: Router,
    private authenticationService: AuthService,
    private _service: InstituteAdminServiceService
  ) { }

  ngOnInit(): void {

  }

  userLogin() {
    this._auth.loginDataAuthUser(this.authUser).subscribe(
      (data) => {
        alert('User Successfully Logged In..');
        this._route.navigate(['adminrole']);
      },
      (error) => console.log(error)
    );

  }




  handleLogin() {
    this.authenticationService
      .authenticationService(this.username, this.password)
      .subscribe(
        (result) => {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
          this._route.navigate(['authenticationlogin']);
        },
        () => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
      );
  }
  back() {
    this._route.navigate(['home']);
  }
}