import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authuser } from '../authuser';
import { AuthuserserviceService } from '../authuserservice.service';

@Component({
  selector: 'app-authuser',
  templateUrl: './authuser.component.html',
  styleUrls: ['./authuser.component.css']
})
export class AuthuserComponent implements OnInit {

  authUser = new Authuser();
  _authUser: Authuser[] = [];
  constructor(private _service: AuthuserserviceService, private _activeRoute: ActivatedRoute, private _route: Router) { }

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
    this.authUser.authUserIsActive = user.authUserIsActive;
    this.authUser.authUserIsSuperUser = user.authUserIsSuperUser;
    this._service.addAuthUser(this.authUser).subscribe(

      data => {
        // console.log(data);
        alert("authuser added Successfully");
    
        this.ngOnInit();
      },
      erorr => alert("Please enter valid details ")
    )
  }

  updateAuthUsers(user: Authuser) {
    alert(JSON.stringify(user));
  
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

    console.log(this.authUser);

    this._service.updateAuthUser(user.authUserName,
      this.authUser).subscribe(
        data => {
          console.log(data)
          alert("Data Updated...")
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
  }
  
  ngOnInit(): void {
    this._service.authUserList().subscribe(
      data => {
        console.log("Response Receved...");
        this._authUser = data;
      },

      Error => console.log("exception")
    )
  }

  deleteAuthUser(user: Authuser) {

    alert("in method")
    this._service.deleteAuthUser(user.authUserName)
      .subscribe(
        data => {
          location.reload();
          alert("authuser Deleted..")
          this.ngOnInit();

        },
        error => console.log(error));

  }

}
