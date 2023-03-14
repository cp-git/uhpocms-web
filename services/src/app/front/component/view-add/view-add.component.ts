import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() data: { moduleName: string, currentData: any, tableHeader: any } = { moduleName: '', currentData: null, tableHeader: null };
  @Input() dropdown1?: { optionsArray1: any, dropdownColumnId1: string, dropdownColumnName1: string };
  @Input() dropdown2?: { optionsArray2: any, dropdownColumnId2: string, dropdownColumnName2: string };

  @Output() submitClicked: EventEmitter<any> = new EventEmitter();
  viewOf: any;
  screen: any;
  // currentId!: any;
  // addedOrUpdate: string;
  tableHeader: any;

  // institutions: AdminInstitution[] = [];

  currentData: any;
  authUser: Authuser;
  department: Department;
  adminRole: Admin;

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
  ) {

    this.authUser = new Authuser();
    this.department = new Department();
    this.adminRole = new Admin();
    // this.addedOrUpdate = 'add';
    // this.currentId = 0;


  }

  onSubmitClicked(objectToAdd: any): void {
    this.submitClicked.emit(objectToAdd);
  }

  ngOnInit(): void {

    this.tableHeader = this.data.tableHeader;
    this.currentData = this.data.currentData
    this.viewOf = this.data.moduleName;
    this.initialiseDropdownData();

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

  home() {
    this.location.back();
  }

  changeHeader() {

    switch (this.viewOf) {

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

}
