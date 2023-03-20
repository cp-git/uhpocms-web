import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationserviceService } from 'app/authenticationlogin/service/authenticationservice.service';
import { Authuser } from 'app/authuser/class/authuser';
import { AuthuserserviceService } from 'app/authuser/service/authuserservice.service';


@Component({
  selector: 'app-adminmdoule',
  templateUrl: './adminmdoule.component.html',
  styleUrls: ['./adminmdoule.component.css']
})
export class AdminmdouleComponent {

  authUser = new Authuser();
  role: string | undefined;
  userName!: string;
  adminId: any;
  constructor(private _route: Router, private _auth: AuthuserserviceService, private _authenticationService: AuthenticationserviceService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.userName)


  }

  RedirectTOAuth() {
    this._route.navigate(['AuthUser', this.userName]);

  }
  RedirectToAssignTeacher() {
    this._route.navigate(['assignteacher', this.userName]);

  }

  RedirectToInstituteAdminProfile() {
    this._route.navigate(['displayInstituteAdmin/display', this.userName]);

  }

  RedirectToCourse() {

    this._route.navigate(['course/userrole', this.userName]);

  }

  RedirectToAdminDept() {
    this._route.navigate(['department', this.userName]);
  }

  RedirectTOLogin() {
    this._route.navigate(['authenticationlogin'])
  }


  RedirectToEnrollStudent() {

    this._route.navigate(['enrollstudent', this.userName])

  }

  RedirectToAdminInstitution() {
    this._route.navigate(['displayinstitute', this.userName])
  }

  RedirectToRole() {
    this._route.navigate(['adminrole', this.userName])
  }

  RedirectToAnnouncement() {
    this._route.navigate(['announcement/admin', { id: this.adminId }])
  }








}
