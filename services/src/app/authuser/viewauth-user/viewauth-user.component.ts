import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authuser } from '../authuser';
import { AuthuserserviceService } from '../authuserservice.service';

@Component({
  selector: 'app-viewauth-user',
  templateUrl: './viewauth-user.component.html',
  styleUrls: ['./viewauth-user.component.css']
})
export class ViewauthUserComponent implements OnInit{

  authuser = new Authuser();
  constructor(private _route: Router, private _service: AuthuserserviceService, private _activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    let authUserName = this._activatedRoute.snapshot.params['authUserName'];

    this._service.getAdminlist(authUserName)
      .subscribe(data => {
        console.log(data)
        this.authuser = data;
      }, error => console.log(error));
  
  }

}
