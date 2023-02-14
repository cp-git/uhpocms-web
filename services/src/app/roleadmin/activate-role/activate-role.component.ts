import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Admin } from 'app/roleadmin/admin';
import { AdminroleserviceService } from '../adminroleservice.service';

@Component({
  selector: 'app-activate-role',
  templateUrl: './activate-role.component.html',
  styleUrls: ['./activate-role.component.css']
})
export class ActivateRoleComponent implements OnInit {

  adminRoles: Admin[] = [];
  constructor(private _roleService: AdminroleserviceService, private _router: Router) {

  }

  ngOnInit(): void {
    this.loadAdminRoles();
  }

  loadAdminRoles() {
    this._roleService.getAllDeactivatedRoles().subscribe(
      response => {
        this.adminRoles = response;
      },
      error => {
        alert("module data not fetched");
      }
    );
  }

  activateRole(roleId: number) {
    this._roleService.activateAdminRole(roleId).subscribe(
      response => {
        alert("Role activated");
        this.ngOnInit();
      },
      error => {
        alert("Failed");
      }
    );
  }

  Home() {
    this._router.navigate(['adminrole']);
  }
}
