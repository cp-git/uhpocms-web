
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Admin } from 'app/roleadmin/class/admin';
import { AdminroleserviceService } from '../../services/adminroleservice.service';

@Component({
  selector: 'app-activate-role',
  templateUrl: './activate-role.component.html',
  styleUrls: ['./activate-role.component.css', '../../../app.component.css']
})
export class ActivateRoleComponent implements OnInit {

  userName!: string;
  adminId: any;

  adminRoles: Admin[] = [];
  constructor(private _roleService: AdminroleserviceService, private _router: Router, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];

    this.loadAdminRoles();
  }


  loadAdminRoles() {
    this._roleService.getAllDeactivatedRoles().subscribe(
      response => {
        this.adminRoles = response;
      },
      error => {
        console.log("module data not fetched");
      }
    );
  }

  activateRole(roleId: number) {
    this._roleService.activateAdminRole(roleId).subscribe(
      response => {

        this.ngOnInit();
      },
      error => {
        console.log("Failed");
      }
    );
  }

  Home() {
    this._router.navigate(['adminrole', this.userName]);
  }
}
