import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminroleServiceService } from '../adminrole-service.service';

@Component({
  selector: 'app-view-admin-role',
  templateUrl: './view-admin-role.component.html',
  styleUrls: ['./view-admin-role.component.css']
})
export class ViewAdminRoleComponent implements OnInit {
  admin = new Admin();
  constructor(private _route: Router, private _service: AdminroleServiceService, private _activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    let roleName = this._activatedRoute.snapshot.params['roleName'];

    this._service.getAdminlist(roleName)
      .subscribe(data => {
        console.log(data)
        this.admin = data;
      }, error => console.log(error));
  
  }

  goBack(){
    this._route.navigate([''])
  }

}
