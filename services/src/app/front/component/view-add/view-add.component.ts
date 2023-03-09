import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/authlogin/auth.service';
import { Authuser } from 'app/authuser/authuser';
import { AuthuserserviceService } from 'app/authuser/service/authuserservice.service';
import { AuthUserColumn } from 'app/front/TableHeaders/auth-user-column';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Department } from 'app/admindepartment/department';
import { DepartmentColumn } from 'app/front/TableHeaders/department-column';
import { AdminInstitution } from 'app/admindepartment/admin-institution/admin-institution';
import { AdminroleserviceService } from 'app/roleadmin/adminroleservice.service';
import { AdminRoleColumn } from 'app/front/TableHeaders/admin-role-column';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { Admin } from 'app/roleadmin/admin';
import { AuthUserAllColumn } from 'app/front/TableHeaders/auth-user-column';
@Component({
  selector: 'app-view-add',
  templateUrl: './view-add.component.html',
  styleUrls: ['./view-add.component.css']
})
export class ViewAddComponent implements OnInit {
  // @Input() selectedItem: any;

  viewOf: any;
  currentId!: any;
  addedOrUpdate: string;
  tableHeader: any;
  optionsArray1: any
  institutions: AdminInstitution[] = [];

  currentModel: any;
  authUser: Authuser;
  department: Department;
  adminRole: Admin;

  dropdownColumnId1: string = '';
  dropdownColumnName1: string = '';

  constructor(
    private location: Location,
    private router: Router,
    private roleService: AdminroleserviceService,
    private route: ActivatedRoute,
    private authUserService: AuthuserserviceService,
    private departmentService: DepartmentService,
    private institutionService: InstitutionSeriveService
  ) {

    this.authUser = new Authuser();
    this.department = new Department();
    this.adminRole = new Admin();
    this.addedOrUpdate = 'add';
    this.currentId = 0;


  }
  ngOnInit(): void {

    this.changeHeader();
    // alert(JSON.stringify(this.selectedItem));
  }

  home() {
    this.location.back();
  }

  changeHeader() {
    this.viewOf = this.route.snapshot.paramMap.get('viewname');
    this.currentId = this.route.snapshot.paramMap.get('id');
    // alert(this.currentId)
    if (this.currentId > 0 || this.currentId != undefined || this.currentId != null) {
      this.addedOrUpdate = "update";
    }
    // alert(this.currentId)
    switch (this.viewOf) {
      case "Department":
        this.changeToDepartment();
        // alert(JSON.stringify(this.currentModel));

        break;
      case "AuthUser":
        this.changeToAuthuser();
        // this.tableHeader = AuthUserColumn;
        // this.currentModel = this.authUser;
        break;
      case "AdminRole":
        this.tableHeader = AdminRoleColumn;
        this.currentModel = this.adminRole;
        break;
    }


  }

  changeToAuthuser() {
    // alert(JSON.stringify(this.authUserService.authUsers))
    this.tableHeader = AuthUserColumn;
    this.currentModel = this.authUser;
    for (let i = 0; i < this.authUserService.authUsers.length; i++) {
      const authuser = this.authUserService.authUsers[i];
      if (authuser.authUserId == this.currentId) {
        this.currentModel = authuser;
        // alert("current" + JSON.stringify(this.currentModel));
        break; // exit the loop when the condition is met
      }
    }
  }

  loadInstitutions() {
    this.institutionService._getAllInstitutions().subscribe(
      response => {
        this.institutions = response;
        this.optionsArray1 = this.institutions;
      },
      error => {
        this.institutions = [];
      }
    );
  }

  addOrUpdate(currentModel: any) {

    this.viewOf = this.route.snapshot.paramMap.get('viewname');
    if (this.addedOrUpdate === 'add') {
      switch (this.viewOf) {
        case "Department":
          currentModel.active = true;
          this.departmentService.insertDepartment(currentModel).subscribe(
            response => {
              alert(`Department ${this.addedOrUpdate} successfully !`);
            },
            error => {
              alert(`Failed to ${this.addedOrUpdate} Department !`);
            }
          );
          break;
        case "AuthUser":
          this.authUserService.addAuthUser(currentModel).subscribe(
            response => {
              alert(`AuthUser ${this.addedOrUpdate} successfully !`);
            },
            error => {
              alert(`Failed to ${this.addedOrUpdate} AuthUser !`);
            }
          )


          break;
        case "AdminRole":

          break;
      }
    } else {
      switch (this.viewOf) {
        case "Department":
          currentModel.active = true;
          this.departmentService.insertDepartment(currentModel).subscribe(
            response => {
              alert(`Department ${this.addedOrUpdate} successfully !`);
            },
            error => {
              alert(`Failed to ${this.addedOrUpdate} Department !`);
            }
          );
          break;
        case "AuthUser":
          this.authUserService.updateAuthUser(currentModel.authUserName, currentModel).subscribe(
            response => {
              alert(`AuthUser ${this.addedOrUpdate} successfully !`);
            },
            error => {
              alert(`Failed to ${this.addedOrUpdate} AuthUser !`);
            }
          )


          break;
        case "AdminRole":

          break;
      }
    }

    this.router.navigate([`/view/${this.viewOf}`]);
  }

  changeToDepartment() {
    this.tableHeader = DepartmentColumn;
    this.loadInstitutions();
    // this.optionsArray1 = this.institutions;
    this.dropdownColumnId1 = "adminInstitutionId";
    this.dropdownColumnName1 = "adminInstitutionName";
    this.currentModel = this.department;
    for (let i = 0; i < this.departmentService.departments.length; i++) {
      const department = this.departmentService.departments[i];
      if (department.id == this.currentId) {
        this.currentModel = department;
        // alert("current" + JSON.stringify(this.currentModel));
        break; // exit the loop when the condition is met
      }
    }
  }
}
