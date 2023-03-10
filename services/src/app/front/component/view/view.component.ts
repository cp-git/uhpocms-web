import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/authlogin/auth.service';
import { Authuser } from 'app/authuser/authuser';
import { AuthuserserviceService } from 'app/authuser/service/authuserservice.service';
import { AuthUserColumn } from 'app/front/TableHeaders/auth-user-column';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Department } from 'app/admindepartment/department';
import { DepartmentAllColumn } from 'app/front/TableHeaders/department-column';
import { AdminInstitution } from 'app/admindepartment/admin-institution/admin-institution';
import { AdminroleserviceService } from 'app/roleadmin/adminroleservice.service';
import { AdminRoleColumn } from 'app/front/TableHeaders/admin-role-column';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { AuthUserAllColumn } from 'app/front/TableHeaders/auth-user-column';
import { Admin } from 'app/roleadmin/admin';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { InstituteAdminServiceService } from 'app/instituteadminprofile/institute-admin-service.service';
import { ProfileAllColumn } from 'app/front/TableHeaders/profile-column';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  viewOf: any;
  currentId!: any;
  addedOrUpdate: string;
  tableHeader: any;
  optionsArray1: any
  institutions: AdminInstitution[] = [];
  departments: Department[] = [];

  currentModel: any;
  authUser: Authuser;
  department: Department;
  adminRole: Admin;
  profile: InstituteAdmin;

  dropdownColumnId1: string = '';
  dropdownColumnName1: string = '';

  ///for 2nd dropdown
  optionsArray2: any;
  dropdownColumnId2: string = '';
  dropdownColumnName2: string = '';

  constructor(
    private location: Location,
    private router: Router,
    private roleService: AdminroleserviceService,
    private route: ActivatedRoute,
    private authUserService: AuthuserserviceService,
    private departmentService: DepartmentService,
    private institutionService: InstitutionSeriveService,
    private profileService: InstituteAdminServiceService
  ) {

    this.authUser = new Authuser();
    this.department = new Department();
    this.adminRole = new Admin();
    this.profile = new InstituteAdmin();
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
    // if (this.currentId > 0 || this.currentId != undefined || this.currentId != null) {
    //   this.addedOrUpdate = "update";
    // }
    // alert(this.currentId)
    switch (this.viewOf) {
      case "Department":
        this.changeToDepartment();
        // alert(JSON.stringify(this.currentModel));

        break;
      case "AuthUser":
        //  alert("inauthuser");
        this.changeToAuthuser();
        // this.tableHeader = AuthUserAllColumn;
        // this.currentModel = this.authUser;
        break;

      case "Profile":
        this.changeToProfile();
        break;
    }
  }

  loadDepartments() {
    this.departmentService.fetchAllDepartments().subscribe(
      response => {
        this.departments = response;

        this.optionsArray1 = this.institutions;
        this.optionsArray2 = this.department;

      },
      error => {
        this.departments = [];
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

  changeToProfile() {

    this.tableHeader = ProfileAllColumn;
    this.loadInstitutions();
    this.loadDepartments();

    this.optionsArray2 = this.departments;
    this.dropdownColumnId2 = "id";
    this.dropdownColumnName2 = "name";
    this.optionsArray1 = this.institutions;
    this.dropdownColumnId1 = "adminInstitutionId";
    this.dropdownColumnName1 = "adminInstitutionName";

    this.currentModel = this.profile;
    alert(this.currentId);

    for (let i = 0; i < this.profileService.profiles.length; i++) {
      const profile = this.profileService.profiles[i];
      if (profile.adminId == this.currentId) {
        this.currentModel = profile;
        // alert("current" + JSON.stringify(this.currentModel));
        break; // exit the loop when the condition is met
      }
    }

  }

  changeToDepartment() {

    this.tableHeader = DepartmentAllColumn;
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

  changeToAuthuser() {
    this.tableHeader = AuthUserAllColumn;
    // this.loadInstitutions();
    // this.optionsArray1 = this.institutions;
    this.currentModel = this.authUser;
    for (let i = 0; i < this.authUserService.authUsers.length; i++) {
      const authUser = this.authUserService.authUsers[i];
      //alert("in me----------" + authUser);
      if (authUser.authUserId == this.currentId) {
        this.currentModel = authUser;
        // alert("current" + JSON.stringify(this.currentModel));
        break; // exit the loop when the condition is met
      }
    }
  }
}
