import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private _route: Router, private authenticationService: QuestionService) { }

  username!: string;
  password!: string;
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;

  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      console.log(this.loginSuccess)
      this._route.navigate(['question']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
