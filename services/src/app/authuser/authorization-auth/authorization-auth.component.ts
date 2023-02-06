import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeServiceService } from '../authorize-service.service';
import { AuthuserserviceService } from '../authuserservice.service';

@Component({
  selector: 'app-authorization-auth',
  templateUrl: './authorization-auth.component.html',
  styleUrls: ['./authorization-auth.component.css'],
})
export class AuthorizationAuthComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(
    private _auth: AuthuserserviceService,
    private _route: Router,
    private authenticationService: AuthorizeServiceService
  ) {}

  username!: string;
  password!: string;
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;

  handleLogin() {
    this.authenticationService
      .authenticationService(this.username, this.password)
      .subscribe(
        (result) => {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
          this._route.navigate(['authuser']);
        },
        () => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
      );
  }
}
