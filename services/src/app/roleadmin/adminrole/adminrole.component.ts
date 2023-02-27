import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminroleserviceService } from '../adminroleservice.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adminrole',
  templateUrl: './adminrole.component.html',
  styleUrls: ['../../app.component.css'],
})
export class AdminroleComponent {
  admin = new Admin();
  _adminRole: Admin[] = [];

  isHidden: boolean = true;

  _backupRole: Admin[] = [];
  isExist: number = -1;

  constructor(
    private _service: AdminroleserviceService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private location: Location
  ) { }

  roleName!: string;

  addrole(role: Admin) {
    //alert(JSON.stringify(role));
    this.admin.roleName = role.roleName;
    this.admin.roleDescription = role.roleDescription;
    this.admin.active = role.active;
    this._service.addAdminRole(this.admin).subscribe(
      (data) => {
        // console.log(data);
        alert('Role added Successfully');
        this.ngOnInit();
      },
      (error) =>
        alert(
          'Please Select Value in between admin,student,teacher and coadmin'
        )
    );
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this._route.navigate(['/login']);
    } else {
      this._service.fetchadminlist().subscribe(
        (data) => {
          console.log('Response Received...');
          this._adminRole = data;

          if (this._adminRole.length > 0) {
            this.isHidden = false;
          }

          this._adminRole.forEach((role) => {
            this._backupRole.push(Object.assign({}, role));
          });
        },
        (error) => console.log('exception')
      );
    }
  }

  updateAdminRole(role: Admin) {
    if (
      this._backupRole.findIndex((data) => data.roleName === role.roleName) < 0
    ) {
      alert('roleName not exist for update. please enter another.');
    } else {
      this.admin.roleName = role.roleName;
      this.admin.roleDescription = role.roleDescription;
      this.admin.active = role.active;
      this._service.updateadminlist(this.admin.roleName, this.admin).subscribe(
        (data) => {
          // console.log(data)
          alert('Data Updated...');
          this.ngOnInit();
        },
        (error) => console.log(error)
      );
    }
  }

  deleteAdminRole(roleName: string) {
    this._service.deleteAdmin(roleName).subscribe(
      (data) => {
        alert('Data Deleted...');
        this.ngOnInit();
      },
      (error) => console.log(error)
    );
  }

  getAdminRole(roleName: string) {
    this._service.getAdmin(roleName).subscribe((response) => {
      this.admin = response;
    });
    return this.admin;
  }

  Home() {
    this.location.back();
    //this._route.navigate(['demo']);
  }

  redirectToActivateRole() {
    this._route.navigate(['adminrole/activate']);
  }
}
