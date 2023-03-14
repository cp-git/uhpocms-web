import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRoleColumn } from 'app/admin-role/admin-rol-column';
import { AdminRole } from 'app/admin-role/admin-role';
import { AdminRoleService } from 'app/admin-role/services/admin-role.service';
import { Admin } from 'app/roleadmin/admin';

@Component({
  selector: 'app-view-all-admin-role',
  templateUrl: './view-all-admin-role.component.html',
  styleUrls: ['./view-all-admin-role.component.css']
})
export class ViewAllAdminRoleComponent implements OnInit {
  tableName: string = 'AdminRole';
  tableData: AdminRole[] = [];
  tableHeader: any;

  currentData!: AdminRole;
  dataAvailable: boolean = false;;

  constructor(private roleService: AdminRoleService, private router: Router) {
    this.tableHeader = AdminRoleColumn;
  }

  ngOnInit(): void {
    this.getAllAdminRoles();
  }

  private getAllAdminRoles() {
    this.roleService.getAdminRoles().subscribe(
      response => {
        //assign data to local variable
        this.tableData = response;

        //assign data to service variable
        this.roleService.adminRoles = this.tableData;

        if (this.roleService.adminRoles.length > 0) {
          this.dataAvailable = true;
        }
      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  navigateToAdd() {
    this.router.navigate(['/Department/add']);
  }
  back() {
    this.router.navigate(['/demo']);
  }

  onChildViewClick(objectReceived: any): void {
    // alert("onChildButtonClic2k" + JSON.stringify(objectReceived));
    this.currentData = objectReceived;
    this.roleService.currentRoleData = this.currentData;
    this.router.navigate(['/Role/view'])
  }

  onChildUpdateClick(objectReceived: any): void {
    // alert("onChildButtonClic2k" + JSON.stringify(objectReceived));
    this.currentData = objectReceived;
    this.roleService.currentRoleData = this.currentData;
    this.router.navigate(['/Role/update'])
  }
}
