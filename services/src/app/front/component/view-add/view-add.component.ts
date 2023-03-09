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
import { ViewAllService } from 'app/front/services/view-all.service';
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

  currentData: any;
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
    private institutionService: InstitutionSeriveService,
    private service: ViewAllService
  ) {

    this.authUser = new Authuser();
    this.department = new Department();
    this.adminRole = new Admin();
    this.addedOrUpdate = 'add';
    this.currentId = 0;


  }
  ngOnInit(): void {
    this.viewOf = this.service.viewOf;
    // alert(JSON.stringify(this.viewOf));

    this.changeHeader();
    // alert(JSON.stringify(this.selectedItem));

  }

  home() {
    this.location.back();
  }

  changeHeader() {
    // this.viewOf = this.route.snapshot.paramMap.get('viewname');
    this.currentId = this.route.snapshot.paramMap.get('id');
    if (this.currentId > 0 || this.currentId != undefined || this.currentId != null) {
      this.addedOrUpdate = "update";
      // alert(this.currentId)
    }
    // alert(this.currentId)
    switch (this.viewOf) {
      case "Department":
        this.changeToDepartment();
        // alert(JSON.stringify(this.currentModel));

        break;
      case "AuthUser":
        this.tableHeader = AuthUserColumn;
        this.currentData = this.authUser;
        break;
      case "AdminRole":
        this.tableHeader = AdminRoleColumn;
        this.currentData = this.adminRole;
        break;
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

  add(currentModel: any) {
    // this.viewOf = this.route.snapshot.paramMap.get('viewname');
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
    this.router.navigate([`/${this.viewOf}`]);
  }

  changeToDepartment() {
    // this.tableHeader = DepartmentColumn;
    // this.loadInstitutions();
    // this.optionsArray1 = this.institutions;
    // this.dropdownColumnId1 = "adminInstitutionId";
    // this.dropdownColumnName1 = "adminInstitutionName";
    // this.currentModel = this.department;
    // for (let i = 0; i < this.departmentService.departments.length; i++) {
    //   const department = this.departmentService.departments[i];
    //   if (department.id == this.currentId) {
    //     this.currentModel = department;
    //     // alert("current" + JSON.stringify(this.currentModel));
    //     break; // exit the loop when the condition is met
    //   }
    // }

    this.tableHeader = this.service.tableHeader;
    // this.loadInstitutions();
    this.optionsArray1 = this.service.optionsArray1;
    this.dropdownColumnId1 = this.service.dropdownColumnId1;
    this.dropdownColumnName1 = this.service.dropdownColumnName1;
    this.currentData = this.department;
    if (this.currentId) {
      for (let i = 0; i < this.service.tableData.length; i++) {
        const department = this.service.tableData[i];
        if (department.id == this.currentId) {
          this.currentData = department;
          alert("current" + JSON.stringify(this.currentData));
          break; // exit the loop when the condition is met
        }
      }
    }
  }
}
