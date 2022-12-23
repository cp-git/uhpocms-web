import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authuser } from '../authuser';
import { AuthuserserviceService } from '../authuserservice.service';

@Component({
  selector: 'app-update-auth-user',
  templateUrl: './update-auth-user.component.html',
  styleUrls: ['./update-auth-user.component.css']
})
export class UpdateAuthUserComponent {

  authUserName!: string;
  authUser:Authuser=new Authuser();
  constructor(private _service:AuthuserserviceService,private _activatedRoute:ActivatedRoute,private _route:Router){}

  ngOnInit(): void {
     this.authUserName = this._activatedRoute.snapshot.params['authUserName'];
    console.log(this.authUserName);

    this._service.getAdminlist(this.authUserName)
    .subscribe(data => {
      //console.log(data)
      this.authUser = data;
      console.log(this.authUser)
    }, error => console.log(error));
  }


  upateAuthUser() {
    this._service.updateadminlist(this.authUserName,this.authUser).subscribe(data => {
      //console.log(data)
      alert("Data Updated...")
      this._route.navigate(['authuser'])
      
    }, error => console.log(error));
  }

}
