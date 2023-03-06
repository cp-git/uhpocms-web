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

@Component({
  selector: 'app-view-add',
  templateUrl: './view-add.component.html',
  styleUrls: ['./view-add.component.css']
})
export class ViewAddComponent implements OnInit {

  viewOf: any;
  tableHeader: any;
  optionsArray1: any
  institutions: AdminInstitution[] = [];

  currentModel: any;
  authUser: Authuser;
  department: Department;

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

  }
  ngOnInit(): void {
    this.changeHeader();
  }

  home() {
    this.location.back();
  }

  changeHeader() {
    this.viewOf = this.route.snapshot.paramMap.get('viewname');
    switch (this.viewOf) {
      case "Department":
        this.tableHeader = DepartmentColumn;
        this.loadInstitutions();
        this.optionsArray1 = this.institutions;
        this.dropdownColumnId1 = "adminInstitutionId";
        this.dropdownColumnName1 = "adminInstitutionName";
        this.currentModel = this.department;

        break;
      case "AuthUser":
        this.tableHeader = AuthUserColumn;
        this.currentModel = this.authUser;
        break;
      case "AdminRole":
        this.tableHeader = AdminRoleColumn;
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

    // this.institutions = [
    //   {
    //     "adminInstitutionId": 2,
    //     "adminInstitutionName": "ssvps",
    //     "adminInstitutionDescription": "ssvps desc",
    //     "adminInstitutionIsActive": true,
    //     "adminInstitutionCreatedBy": "admin",
    //     "adminInstitutionCreatedOn": new Date("2022-12-11T18:30:00.000+00:00"),
    //     "adminInstitutionModifiedBy": "admin",
    //     "adminInstitutionModifiedOn": new Date("2022-12-11T18:30:00.000+00:00"),
    //     "adminInstitutionPicture": "pic1.jpg"
    //   },
    //   {
    //     "adminInstitutionId": 1,
    //     "adminInstitutionName": "IIT",
    //     "adminInstitutionDescription": "iit desc",
    //     "adminInstitutionIsActive": true,
    //     "adminInstitutionCreatedBy": "admin",
    //     "adminInstitutionCreatedOn": new Date("2022-12-11T18:30:00.000+00:00"),
    //     "adminInstitutionModifiedBy": "admin",
    //     "adminInstitutionModifiedOn": new Date("2022-12-11T18:30:00.000+00:00"),
    //     "adminInstitutionPicture": "pic1.jpg"
    //   }
    // ]
  }

  add(currentModel: any) {
    this.viewOf = this.route.snapshot.paramMap.get('viewname');
    switch (this.viewOf) {
      case "Department":
        currentModel.active = true;
        this.departmentService.insertDepartment(currentModel).subscribe(
          response => {
            alert("Department added successfully !");
          },
          error => {
            alert("Failed to add Department !");
          }
        );
        break;
      case "AuthUser":
        this.authUserService.addAuthUser(currentModel).subscribe(
          response => {
            alert("AuthUser added successfully !");
          },
          error => {
            alert("Failed to add AuthUser !");
          }
        )


        break;
      case "AdminRole":

        break;
    }
  }
}
