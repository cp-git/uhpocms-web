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
    throw new Error('Method not implemented.');
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
