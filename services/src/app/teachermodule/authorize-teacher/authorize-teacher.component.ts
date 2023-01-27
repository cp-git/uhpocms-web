import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TeachermoduleserviceService } from '../service/teachermoduleservice.service';



@Component({
  selector: 'app-authorize-teacher',
  templateUrl: './authorize-teacher.component.html',
  styleUrls: ['./authorize-teacher.component.css']
})
export class AuthorizeTeacherComponent {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private _route: Router, private authenticationService: TeachermoduleserviceService) { }

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
      this._route.navigate(['teachermodule']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }


}
