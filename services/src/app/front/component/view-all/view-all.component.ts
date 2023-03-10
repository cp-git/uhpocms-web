import { Component, OnInit } from '@angular/core';
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
import { Admin } from 'app/roleadmin/admin';
import { AdminRoleColumn } from 'app/front/TableHeaders/admin-role-column';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { InstituteAdminServiceService } from 'app/instituteadminprofile/institute-admin-service.service';
import { ProfileColumn } from 'app/front/TableHeaders/profile-column';
@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  // for current table header for selected(current) modules
  tableHeader: any;
  viewOf: any;  // current module name
  tableData: any[] = [];
  currentIdColumnname: string;
  objectToUpdate: any;

  // All Modules Array
  authUsers: Authuser[] = [];
  departments: Department[] = [];
  institutions: AdminInstitution[] = []
  roles: Admin[] = [];
  profiles: InstituteAdmin[] = [];

  optionsArray1: any;
  dropdownColumnId1: string = '';
  dropdownColumnName1: string = '';

  ///for 2nd dropdown
  optionsArray2: any;
  dropdownColumnId2: string = '';
  dropdownColumnName2: string = '';

  sessionData: any;
  data: any;
  constructor(
    private location: Location,
    private router: Router,
    private roleService: AdminroleserviceService,
    private route: ActivatedRoute,
    private authUserService: AuthuserserviceService,
    private departmentService: DepartmentService,
    private institutionService: InstitutionSeriveService,
    private profileServices: InstituteAdminServiceService
  ) {
    this.currentIdColumnname = '';
  }

  ngOnInit(): void {
    this.changeHeader();
  }

  home() {
    this.location.back();
  }

  keepOrder = (a: any, b: any) => {
    return a;
  }

  selectClickedObject(item: any) {
    this.objectToUpdate = item;
    // alert("hello" + JSON.stringify(this.objectToUpdate));

  }

  changeHeader() {
    this.viewOf = this.route.snapshot.paramMap.get('viewname');
    switch (this.viewOf) {
      case "Department":
        this.tableHeader = DepartmentColumn;
        this.loadAdminInstitutions();  // loading institutions for dropdown
        this.loadDepartments();   // for printing data
        break;
      case "AuthUser":
        this.tableHeader = AuthUserColumn;
        this.loadAuthUsers();
        break;
      case "AdminRole":
        this.tableHeader = AdminRoleColumn;
        this.loadAdminRole();
        break;
      case "Profile":
        this.tableHeader = ProfileColumn;
        this.loadAdminInstitutions();  // loading institutions for dropdown
        this.loadDepartments();   // for printing data
        this.loadProfiles();
        break;
    }
  }

  loadAuthUsers() {
    this.authUserService.authUserList().subscribe(
      response => {
        this.authUserService.authUsers = response;
        this.authUsers = response;
        this.tableData = this.authUsers;
        this.currentIdColumnname = "authUserId";
        console.log(this.tableData);

      },
      error => {
        alert("no authuser")
      }
    )
  }

  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');
    alert(this.sessionData);
    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.institutions.push(this.data[inst]);
    }
  }

  private loadDepartments() {
    this.sessionData = sessionStorage.getItem('departments');
    alert(this.sessionData);
    this.data = JSON.parse(this.sessionData);
    alert(this.sessionData);
    for (var inst in this.data) {
      this.departments.push(this.data[inst]);
    }
    this.departmentService.departments = this.departments;
    //  this.departments = response;
    this.tableData = this.departments;
    this.optionsArray1 = this.institutions;
    this.dropdownColumnId1 = "adminInstitutionId";
    this.dropdownColumnName1 = "adminInstitutionName";
    this.currentIdColumnname = "id";
    console.log(this.tableData);

  }

  // loadDepartments() {
  //   this.departmentService.fetchAllDepartments().subscribe(
  //     response => {
  //       this.departmentService.departments = response;
  //       this.departments = response;
  //       this.tableData = this.departments;
  //       this.optionsArray1 = this.institutions;
  //       this.dropdownColumnId1 = "adminInstitutionId";
  //       this.dropdownColumnName1 = "adminInstitutionName";
  //       this.currentIdColumnname = "id";
  //       console.log(this.tableData);

  //     },
  //     error => {
  //       alert("no departments")
  //     }
  //   )
  // }
  loadProfiles() {
    this.profileServices._getAllInstituteAdminList().subscribe(
      response => {
        this.profileServices.profiles = response;
        this.profiles = response;
        this.tableData = this.profiles;

        this.optionsArray2 = this.departments;
        this.dropdownColumnId2 = "id";
        this.dropdownColumnName2 = "name";
        // alert(this.departments);

        this.optionsArray1 = this.institutions;
        this.dropdownColumnId1 = "adminInstitutionId";
        this.dropdownColumnName1 = "adminInstitutionName";
        // alert(this.institutions);
        this.currentIdColumnname = "adminId";

        console.log(this.tableData);
      },
      error => {
        alert("no profiles");
      }
    )
  }

  // loadInstitutions() {
  //   this.institutionService._getAllInstitutions().subscribe(
  //     response => {
  //       this.institutions = response;
  //     },
  //     error => {
  //       this.institutions = [];
  //     }
  //   );

  // }

  loadAdminRole() {
    this.roleService.fetchadminlist().subscribe(
      response => {
        this.roles = response;
        this.tableData = this.roles;
        this.currentIdColumnname = "roleId";
        console.log(this.tableData);
      },
      error => {
        alert("no roles");
      }
    );
  }

  viewAddScreen() {

  }

}
