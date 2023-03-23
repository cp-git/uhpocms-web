import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authuser } from '../../class/authuser';
import { AuthuserserviceService } from '../../service/authuserservice.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-authuser',
  templateUrl: './authuser.component.html',
  styleUrls: ['../../app.component.css'],
})
export class AuthuserComponent implements OnInit {
  authUser = new Authuser();
  _authUser: Authuser[] = [];

  isHidden: boolean = true;

  _backupUser: Authuser[] = [];

  userName!: string;
  adminId: any;

  constructor(
    private _service: AuthuserserviceService,
    private _activeRoute: ActivatedRoute,
    private _route: Router,
    private location: Location,
    private _activatedRoute: ActivatedRoute
  ) { }

  authUserName!: string;

  addauthUser(user: Authuser) {
    //alert(JSON.stringify(user));
    this.authUser.authUserName = user.authUserName;
    this.authUser.authUserPassword = user.authUserPassword;
    this.authUser.authUserFirstName = user.authUserFirstName;
    this.authUser.authUserLastName = user.authUserLastName;
    this.authUser.authUserEmail = user.authUserEmail;
    this.authUser.authUserDateJoined = user.authUserDateJoined;
    this.authUser.authUserIsStaff = user.authUserIsStaff;
    this.authUser.authUserIsActive = false;
    this.authUser.authUserIsSuperUser = user.authUserIsSuperUser;
    this._service.addAuthUser(this.authUser).subscribe(
      (data) => {
        // console.log(data);
        alert('authuser added Successfully');

        this.ngOnInit();
      },
      (erorr) => alert('Please enter valid details ')
    );
  }

  updateAuthUsers(user: Authuser) {
    if (
      this._backupUser.findIndex(
        (data) => data.authUserName === user.authUserName
      ) < 0
    ) {
      alert('authuser not exist for update. please enter another.');
    } else {
      this.authUser.authUserId = user.authUserId;
      this.authUser.authUserName = user.authUserName;
      this.authUser.authUserPassword = user.authUserPassword;
      this.authUser.authUserFirstName = user.authUserFirstName;
      this.authUser.authUserLastName = user.authUserLastName;
      this.authUser.authUserEmail = user.authUserEmail;
      this.authUser.authUserDateJoined = user.authUserDateJoined;
      this.authUser.authUserIsStaff = user.authUserIsStaff;
      this.authUser.authUserIsActive = user.authUserIsActive;
      this.authUser.authUserIsSuperUser = user.authUserIsSuperUser;

      //console.log(this.authUser);

      this._service.updateAuthUser(user.authUserName, this.authUser).subscribe(
        (data) => {
          console.log(data);
          alert('Data Updated...');
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit(): void {
    // alert("called");
    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {

      this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
      this.userName = this._activatedRoute.snapshot.params['userName'];
      console.log(this.userName)
      // alert("called else");
      this._service.authUserList().subscribe(
        (data) => {
          // console.log('Response Received...');
          this._authUser = data;

          if (this._authUser.length > 0) {
            this.isHidden = false;
          }

          this._authUser.forEach((user) => {
            this._backupUser.push(Object.assign({}, user));
          });
        },

        (Error) => console.log('exception')
      );
    }
  }

  deleteAuthUser(user: Authuser) {
    // alert("in method")
    this._service.deleteAuthUser(user.authUserName).subscribe(
      (data) => {
        location.reload();
        alert('authuser Deleted..');
        this.ngOnInit();
      },
      (error) => console.log(error)
    );
  }

  Home() {

    this._route.navigate(['adminmodule/admin', this.userName]);
  }
}
