import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
  @Input() data: { moduleName: string, moduleData: any, tableHeader: any } = { moduleName: '', moduleData: null, tableHeader: null };
  @Input() idsColumnName: { columnName: string } = { columnName: '' };
  @Input() dropdown1?: { optionsArray1: any, dropdownColumnId1: string, dropdownColumnName1: string };
  @Input() dropdown2?: { optionsArray2: any, dropdownColumnId2: string, dropdownColumnName2: string };

  @Output() viewClicked: EventEmitter<any> = new EventEmitter();
  @Output() updateClicked: EventEmitter<any> = new EventEmitter();

  // for current table header for selected(current) modules
  tableHeader: any;
  viewOf: any;  // current module name
  tableData: any[] = [];
  currentIdColumnName: any;
  objectToUpdate: any;

  // All Modules Array
  authUsers: Authuser[] = [];
  departments: Department[] = [];
  institutions: AdminInstitution[] = []
  roles: Admin[] = [];

  // for dropdown
  optionsArray1: any;
  dropdownColumnId1: any;
  dropdownColumnName1: any;

  // for dropdown
  optionsArray2: any;
  dropdownColumnId2: any;
  dropdownColumnName2: any;

  constructor(
    private location: Location,
    private router: Router,
    private roleService: AdminroleserviceService,
    private authUserService: AuthuserserviceService,
    private service: ViewAllService
  ) {


  }

  initialiseDropdownData() {

    if (this.dropdown1?.optionsArray1 != undefined) {
      this.optionsArray1 = this.dropdown1?.optionsArray1;
      this.dropdownColumnId1 = this.dropdown1?.dropdownColumnId1;
      this.dropdownColumnName1 = this.dropdown1?.dropdownColumnName1;

    }

    if (this.dropdown2?.optionsArray2 != undefined) {
      this.optionsArray2 = this.dropdown2?.optionsArray2;
      this.dropdownColumnId2 = this.dropdown2?.dropdownColumnId2;
      this.dropdownColumnName2 = this.dropdown2?.dropdownColumnName2;
    }
  }

  ngOnInit(): void {

    this.currentIdColumnName = this.idsColumnName;
    this.viewOf = this.data.moduleName;
    this.service.viewOf = this.viewOf;
    this.tableHeader = this.data.tableHeader;
    this.tableData = this.data.moduleData;

    this.initialiseDropdownData();
  }

  navigateToAdd() {
    this.router.navigate(['/add', `${this.viewOf}`]);
  }

  onViewClicked(objectToView: any): void {
    this.viewClicked.emit(objectToView);

  }
  onUpdatClicked(objectToView: any): void {
    this.updateClicked.emit(objectToView);
  }

  home() {
    this.location.back();
  }

  keepOrder = (a: any, b: any) => {
    return a;
  }

  // navigateToUpdate(item: any) {
  //   this.objectToUpdate = item;
  //   // alert("hello" + JSON.stringify(this.objectToUpdate));
  //   // alert()
  //   this.router.navigate([`${this.viewOf}/update`, , `${this.objectToUpdate[this.currentIdColumnName]}`]);

  // }


  changeHeader() {

    switch (this.viewOf) {

      case "AuthUser":
        this.tableHeader = AuthUserColumn;
        // this.loadAuthUsers();
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
    this.service.currentIdColumnName = this.currentIdColumnName; // initialize service variable

  }

  loadAuthUsers() {

    this.authUserService.authUserList().subscribe(
      response => {
        this.authUsers = response;
        this.tableData = this.authUsers;
        this.currentIdColumnName = "authUserId";
        console.log(this.tableData);

      },
      error => {
        alert("no authuser")
      }
    )
  }



  loadAdminRole() {
    this.roleService.fetchadminlist().subscribe(
      response => {
        this.roles = response;
        this.tableData = this.roles;
        this.currentIdColumnName = "roleId";
        console.log(this.tableData);
      },
      error => {
        alert("no roles");
      }
    );
  }

}
