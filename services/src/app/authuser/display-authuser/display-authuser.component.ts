import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authuser } from '../authuser';
import { AuthuserserviceService } from '../authuserservice.service';

@Component({
  selector: 'app-display-authuser',
  templateUrl: './display-authuser.component.html',
  styleUrls: ['./display-authuser.component.css']
})
export class DisplayAuthuserComponent implements OnInit{

  _authUser: Authuser[] = [];
  constructor(private _authService:AuthuserserviceService,private _route:Router){}

  ngOnInit(): void {
    this._authService.fetchadminlist().subscribe(
      data => {
        console.log("Response Receved...");
        this._authUser=data;
      },

      error => console.log("exception")
    )
  }

  viewAuthUser(authUserName:string){
    this._route.navigate(['/viewauthData',authUserName])
  }


  addAuthUser(){
    this._route.navigate(['addAuthUser'])
  }

  updateAuthUser(authUserName:string){
    this._route.navigate(['/updateuser',authUserName])

  }

  deleteAuthUser(authUserName:string){
     this._authService.deleteAdmin(authUserName)
    .subscribe(
      data => {
        location.reload();
        alert("Data Deleted..")
        this._route.navigate(['authuser'])
       
      },
      error => console.log(error));

  }

}
