import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRoleColumn } from 'app/admin-role/admin-rol-column';
import { AdminRole } from 'app/admin-role/admin-role';
import { AdminRoleService } from 'app/admin-role/services/admin-role.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})
export class AdminRoleComponent implements OnInit {
  moduleName: string = "Department Administration";

  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;

  tableName: string = 'AdminRole';
  adminRoles: AdminRole[] = [];
  adminRoleHeader: any;
  emptyAdminRole: AdminRole;
  currentData!: AdminRole;
  dataAvailable: boolean = false;;

  constructor(private roleService: AdminRoleService, private router: Router, private location: Location) {
    this.adminRoleHeader = AdminRoleColumn;
    this.emptyAdminRole = new AdminRole();
  }

  ngOnInit(): void {
    this.getAllAdminRoles();
  }

  private getAllAdminRoles() {
    this.roleService.getAdminRoles().subscribe(
      response => {
        //assign data to local variable
        this.adminRoles = response;

        //assign data to service variable
        this.roleService.adminRoles = this.adminRoles;

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
    this.location.back();
    // this.router.navigate(['/Department/add']);
  }
  back() {
    // this.router.navigate(['/demo']);
    // if (this.viewAll === false) {
    //   this.viewAll = true;
    // }
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
    } else {
      this.location.back();
    }
  }

  onChildViewClick(objectReceived: any): void {
    // alert("onChildButtonClic2k" + JSON.stringify(objectReceived));
    this.currentData = objectReceived;
    this.roleService.currentRoleData = this.currentData;
    // this.router.navigate(['/Role/view'])
    this.viewOne = true;
    this.viewAll = false;
  }

  onChildUpdateClick(objectReceived: any): void {
    // alert("onChildButtonClic2k" + JSON.stringify(objectReceived));
    this.currentData = objectReceived;
    this.roleService.currentRoleData = this.currentData;
    // this.router.navigate(['/Role/update'])
    // this.updateRole(this.currentData);

  }

  onAddClick() {
    console.log("Add button pressed");
    this.viewAll = false;
    this.viewAdd = true;
  }

  onViewClick() {
    console.log("view button pressed");
    this.viewOne = true;
    this.viewAll = false;
  }

  updateRole(currentData: AdminRole) {
    this.roleService.updateAdminRole(currentData.roleName, currentData).subscribe(
      response => {
        alert(`AdminRole updated successfully !`);
      },
      error => {
        alert(`AdminRole updation failed !`);
      }
    );
  }

  addRole(currentData: AdminRole) {
    //alert(JSON.stringify(role));
    currentData.active = true;
    this.roleService.addAdminRole(currentData).subscribe(
      (data) => {
        alert('Role added Successfully');
      },
      (error) => {
        alert("Failed to add role");
      });
  }

  onChildSubmitButtonClick(objectReceived: any): void {
    // alert("onChildButtonClick" + JSON.stringify(objectReceived));
    this.addRole(objectReceived);
  }

}

