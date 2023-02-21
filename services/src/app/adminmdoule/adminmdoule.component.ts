import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authuser } from 'app/authuser/authuser';
import { AuthuserserviceService } from 'app/authuser/authuserservice.service';

@Component({
  selector: 'app-adminmdoule',
  templateUrl: './adminmdoule.component.html',
  styleUrls: ['./adminmdoule.component.css']
})
export class AdminmdouleComponent {


  authUser = new Authuser();

  role: string | undefined;


  constructor(private _route: Router, private _auth: AuthuserserviceService) { }

  RedirectTOAuth() {
    this._route.navigate(['authuser']);

  }

  RedirectToInstituteAdminProfile() {
    this._route.navigate(['displayInstituteAdmin']);

  }

  RedirectToCourse() {
    this.role = 'admin';
    this._route.navigate(['course/userrole/', this.role]);

  }

  RedirectToAdminDept() {
    this._route.navigate(['department']);
  }

  RedirectTOLogin() {
    this._route.navigate(['authenticationlogin'])
  }

  RedirectToAdminInstitution() {
    this._route.navigate(['displayinstitute'])
  }






}
