import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Profile } from 'app/profiles/class/profile';
import { AuthService } from '../service/auth.service';
import { Authuser } from '../class/authuser';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';


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
  _instituteadminprofile = new Profile();

  firstName!: string;



  constructor(
    private _auth: AuthUserService,
    private _route: Router,
    private authenticationService: AuthService,
  ) { }

  ngOnInit(): void {

  }

  userLogin() {
    this._auth.loginDataAuthUser(this.authUser).subscribe(
      (data) => {
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