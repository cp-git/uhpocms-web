import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
import { ViewAllService } from 'app/front/services/view-all.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css'],
})
export class ViewAllComponent implements OnInit {
  @Input() data: { moduleName: string, moduleData: any } = { moduleName: '', moduleData: null };
  @Input() dropdown1: any;
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

  // for dropdown
  optionsArray1: any;
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
    this.currentIdColumnname = '';
  }


  ngOnInit(): void {
    // this.data.moduleData = [...this.data.moduleData];
    // alert(JSON.stringify(this.data.moduleData))
    this.viewOf = this.data.moduleName;
    this.service.viewOf = this.viewOf
    this.changeHeader();
  }

  navigateToAdd() {
    this.router.navigate(['/add', `${this.viewOf}`]);
  }

  home() {
    this.location.back();
  }

  keepOrder = (a: any, b: any) => {
    return a;
  }

  navigateToUpdate(item: any) {
    this.objectToUpdate = item;
    // alert("hello" + JSON.stringify(this.objectToUpdate));
    // alert()
    this.router.navigate(['/update', `${this.viewOf}`, `${this.objectToUpdate[this.currentIdColumnname]}`]);

  }

  changeHeader() {
    // this.viewOf = this.route.snapshot.paramMap.get('viewname');
    // this.viewOf = 'Department';
    switch (this.viewOf) {
      case "Department":
        this.tableHeader = DepartmentColumn;
        // this.loadInstitutions();  // loading institutions for dropdown
        // this.loadDepartments();   // for printing data

        this.tableData = this.data.moduleData;
        // alert(JSON.stringify(this.tableData))
        this.institutions = this.dropdown1;
        // alert("hello" + JSON.stringify(this.institutions))
        this.optionsArray1 = this.institutions;
        this.dropdownColumnId1 = "adminInstitutionId";
        this.dropdownColumnName1 = "adminInstitutionName";
        this.currentIdColumnname = "id";

        break;
      case "AuthUser":
        this.tableHeader = AuthUserColumn;
        this.loadAuthUsers();
        break;
      case "AdminRole":
        this.tableHeader = AdminRoleColumn;
        this.loadAdminRole();
        break;
    }
    this.service.tableData = this.tableData; // initialize service variable
    this.service.tableHeader = this.tableHeader; // initialize service variable
    this.service.optionsArray1 = this.optionsArray1; // initialize service variable
    this.service.dropdownColumnId1 = this.dropdownColumnId1; // initialize service variable
    this.service.dropdownColumnName1 = this.dropdownColumnName1; // initialize service variable
    this.service.currentIdColumnName = this.currentIdColumnname; // initialize service variable
  }

  loadAuthUsers() {

    this.authUserService.authUserList().subscribe(
      response => {
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


  loadDepartments() {
    this.departmentService.fetchAllDepartments().subscribe(
      response => {
        this.departmentService.departments = response;
        this.departments = response;
        this.tableData = this.departments;
        this.dropdownColumnId1 = "adminInstitutionId";
        this.dropdownColumnName1 = "adminInstitutionName";
        this.currentIdColumnname = "id";
        console.log(this.tableData);

      },
      error => {
        alert("no departments")
      }
    )
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
