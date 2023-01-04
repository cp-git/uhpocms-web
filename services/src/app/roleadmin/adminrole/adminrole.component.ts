import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Admin } from '../admin';
import { AdminroleserviceService } from '../adminroleservice.service';


@Component({
  selector: 'app-adminrole',
  templateUrl: './adminrole.component.html',
  styleUrls: ['./adminrole.component.css']
})

export class AdminroleComponent {
  admin = new Admin();
  _adminRole: Admin[] = [];
  constructor(private _service: AdminroleserviceService, private _activatedRoute: ActivatedRoute, private _route: Router) { }

  roleName!: string;



  addrole(role: Admin) {
    //alert(JSON.stringify(role));
    this.admin.roleName = role.roleName;
    this.admin.roleDescription = role.roleDescription;
    this.admin.active = role.active;
    this._service.addAdminRole(this.admin).subscribe(
      data => {
        // console.log(data);

        alert("Role added Successfully");
        this.ngOnInit();

      },
      error => alert("Please Select Value in between admin,student,teacher and coadmin")
    )
  }




  ngOnInit(): void {
    this._service.fetchadminlist().subscribe(
      data => {
        console.log("Response Received...");
        this._adminRole = data;

      },

      error => console.log("exception")
    )
  }

  updateAdminRole(role: Admin) {
    alert(JSON.stringify(role));
    this.admin.roleName = role.roleName;
    this.admin.roleDescription = role.roleDescription;
    this.admin.active = role.active;
    this._service.updateadminlist(this.admin.roleName, this.admin).subscribe(
      data => {
        console.log(data)
        alert("Data Updated...")
        this.ngOnInit();

      }, error => console.log(error));
  }


  deleteAdminRole(roleName: string) {
    this._service.deleteAdmin(roleName)
      .subscribe(
        data => {
          alert("Data Deleted...")
          location.reload();
          this._route.navigate(['RoleAdminHome'])

        },
        error => console.log(error));

  }


}