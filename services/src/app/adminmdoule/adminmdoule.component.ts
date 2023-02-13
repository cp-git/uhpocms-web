import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authuser } from 'app/authuser/authuser';

@Component({
  selector: 'app-adminmdoule',
  templateUrl: './adminmdoule.component.html',
  styleUrls: ['./adminmdoule.component.css']
})
export class AdminmdouleComponent {





  constructor(private _route: Router) { }

  RedirectTOAuth() {
    this._route.navigate(['authuser']);
  }

  RedirectToInstituteAdminProfile() {
    this._route.navigate(['displayInstituteAdmin']);
  }

  RedirectToCourse() {
    this._route.navigate(['course']);
  }

  RedirectToAdminDept() {
    this._route.navigate(['department']);
  }

  RedirectTOLogin() {
    this._route.navigate(['authenticationlogin'])
  }



}
