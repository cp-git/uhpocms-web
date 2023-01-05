import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthuserserviceService } from 'app/authuser/authuserservice.service';
import { Authuser } from '../authuser';

@Component({
  selector: 'app-loginauth',
  templateUrl: './loginauth.component.html',
  styleUrls: ['./loginauth.component.css']
})
export class LoginauthComponent {

  authUser=new Authuser();
  constructor(private _auth:AuthuserserviceService, private _route:Router){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  userLogin(){
   
    this._auth.loginDataAuthUser(this.authUser)
      .subscribe(data => {
        console.log(data)
        alert("User Successfully Logged In..");
        this._route.navigate(['demo']);

      }, error => console.log(error));
  
  
  }

}
