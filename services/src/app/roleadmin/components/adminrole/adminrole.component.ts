import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../../class/admin';
import { AdminroleserviceService } from '../../services/adminroleservice.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adminrole',
  templateUrl: './adminrole.component.html',
  styleUrls: ['../../../app.component.css'],
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

  userName!: string;
  adminId: any;


  //Function for adding role
  addrole(role: Admin) {
    this.admin.roleName = role.roleName;
    this.admin.roleDescription = role.roleDescription;
    this.admin.active = role.active;
    this._service.addAdminRole(this.admin).subscribe(
      (data) => {


        this.ngOnInit();
      },
      (error) =>
        console.log(
          'Please Select Value in between admin,student,teacher and coadmin'
        )
    );
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this._route.navigate(['/login']);
    } else {

      this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
      this.userName = this._activatedRoute.snapshot.params['userName'];

      this._service.fetchadminlist().subscribe(
        (data) => {

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


  //function for update for update role
  updateAdminRole(role: Admin) {
    if (
      this._backupRole.findIndex((data) => data.roleName === role.roleName) < 0
    ) {

    } else {
      this.admin.roleName = role.roleName;
      this.admin.roleDescription = role.roleDescription;
      this.admin.active = role.active;
      this._service.updateadminlist(this.admin.roleName, this.admin).subscribe(
        (data) => {


          this.ngOnInit();
        },
        (error) => console.log(error)
      );
    }
  }

  //function for delete role by role name
  deleteAdminRole(roleName: string) {
    this._service.deleteAdmin(roleName).subscribe(
      (data) => {

        this.ngOnInit();
      },
      (error) => console.log(error)
    );
  }


  //function for get role by roleName
  getAdminRole(roleName: string) {
    this._service.getAdmin(roleName).subscribe((response: Admin) => {
      this.admin = response;
    });
    return this.admin;
  }


  //routing 
  Home() {
    this._route.navigate(['adminmodule/admin', this.userName]);
  }

  redirectToActivateRole() {
    this._route.navigate(['adminrole/activate', this.userName]);
  }
}
