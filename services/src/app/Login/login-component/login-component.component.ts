import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {



  constructor(private _route: Router) { }
  ngOnInit(): void {

  }

  RedirectRole() {
    this._route.navigate(['adminrole'])
  }

  RedirectTOAuth() {
    this._route.navigate(['authorizationAuth'])
  }

  RedirectTOInsProfile() {
    this._route.navigate(['displayInstituteAdmin'])
  }

  RedirectToAdminDept() {
    this._route.navigate(['department'])
  }


  RedirectToQuiz() {
    this._route.navigate(['quiz'])
  }



  RedirectToQuestion() {
    this._route.navigate(['question'])
  }

  RedirectToInstituteAdminProfile() {
    this._route.navigate(['displayInstituteAdmin'])
  }

  RedirectToEmailLogin() {
    this._route.navigate(['emaillogin'])
  }

  RedirectToEmail() {
    this._route.navigate(['email'])
  }

  RedirectToModule() {
    this._route.navigate(['authTeacher'])
  }
  _Back() {
    this._route.navigate([''])
  }
}
