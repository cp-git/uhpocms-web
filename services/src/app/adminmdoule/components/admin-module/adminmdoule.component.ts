import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authuser } from 'app/auth-user/class/auth-user';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { AuthenticationserviceService } from 'app/authenticationlogin/service/authenticationservice.service';




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
  constructor(private _route: Router, private _auth: AuthUserService, private _authenticationService: AuthenticationserviceService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.userName)


  }

  RedirectToAuth() {
    this._route.navigate(['AuthUser', this.userName]);

  }
  RedirectToAssignTeacher() {
    this._route.navigate(['assignteacher', this.userName]);

  }

  RedirectToInstituteAdminProfile() {
    this._route.navigate(['Profile', this.userName]);

  }

  RedirectToCourse() {

    this._route.navigate(['Course', this.userName]);

  }

  RedirectToAdminDept() {
    this._route.navigate(['Department', this.userName]);
  }

  RedirectTOLogin() {
    sessionStorage.removeItem('profileId');
    sessionStorage.removeItem('userId');
    this._route.navigate(['authenticationlogin'])
  }


  RedirectToEnrollStudent() {

    this._route.navigate(['enrollstudent', this.userName])

  }

  RedirectToAdminInstitution() {
    this._route.navigate(['displayinstitute', this.userName])
  }

  RedirectToRole() {
    this._route.navigate(['AdminRole', this.userName])
  }

  RedirectToAnnouncement() {
    this._route.navigate(['announcement/admin', { id: this.adminId }])
  }








}
