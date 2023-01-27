import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthuserserviceService } from 'app/authuser/service/authuserservice.service';

import { AuthService } from '../auth.service';
import { Authuser } from '../authuser';

@Component({
  selector: 'app-loginauth',
  templateUrl: './loginauth.component.html',
  styleUrls: ['./loginauth.component.css']
})
export class LoginauthComponent {

  username!: string;
  password!: string;
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;

  authUser = new Authuser();
  constructor(private _auth: AuthuserserviceService, private _route: Router, private authenticationService: AuthService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  userLogin() {

    this._auth.loginDataAuthUser(this.authUser)
      .subscribe(data => {
        console.log(data)
        alert("User Successfully Logged In..");
        this._route.navigate(['demo']);

      }, error => console.log(error));


  }


  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this._route.navigate(['demo']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

}
