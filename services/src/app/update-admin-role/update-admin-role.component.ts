import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminroleServiceService } from '../adminrole-service.service';

@Component({
  selector: 'app-update-admin-role',
  templateUrl: './update-admin-role.component.html',
  styleUrls: ['./update-admin-role.component.css']
})
export class UpdateAdminRoleComponent {
  roleName!: string;
  admin:Admin=new Admin();
  constructor(private _service:AdminroleServiceService,private _activatedRoute:ActivatedRoute,private _route:Router){}

  ngOnInit(): void {
     this.roleName = this._activatedRoute.snapshot.params['roleName'];
    console.log(this.roleName);

    this._service.getAdminlist(this.roleName)
    .subscribe(data => {
      //console.log(data)
      this.admin = data;
      console.log(this.admin)
    }, error => console.log(error));
  }


  updateadmin() {
    this._service.updateadminlist(this.roleName,this.admin).subscribe(data => {
      //console.log(data)
      console.log(this.admin)
      this._route.navigate([''])
      
    }, error => console.log(error));
  }


  goBack(){
    this._route.navigate([''])
  }

}
