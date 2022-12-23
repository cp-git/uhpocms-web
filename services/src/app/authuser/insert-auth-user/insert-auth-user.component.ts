import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authuser } from '../authuser';
import { AuthuserserviceService } from '../authuserservice.service';

@Component({
  selector: 'app-insert-auth-user',
  templateUrl: './insert-auth-user.component.html',
  styleUrls: ['./insert-auth-user.component.css']
})
export class InsertAuthUserComponent {

  authUser=new Authuser();



  
  
  constructor(private _service:AuthuserserviceService,private _route:Router){}


  
  addauthUser(){
    this._service.addAdminRole(this.authUser).subscribe(
      data=>{
       // console.log(data);
        alert("student added Successfully");
        this._route.navigate(['authuser'])
        

      },
      erorr=>alert("Please Select Value in between admin,student,teacher and coadmin")
    )

    

  
  
  }


}
