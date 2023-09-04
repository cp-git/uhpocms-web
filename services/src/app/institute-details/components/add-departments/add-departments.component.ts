
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Location } from '@angular/common';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';

@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrls: ['./add-departments.component.css']
})
export class AddDepartmentsComponent {


  department: Department;

  departments: Department[] = [];
  backupDept: Department[] = [];

  // for extra row when there is no data
  isHidden: boolean = false;
  hideId: boolean = false;



  sessionData: any;
  data: any;


  // array of admin institution

  adminInstitutions: AdminInstitution[] = [];

  constructor(private _deptService: DepartmentService, private _route: Router, private location: Location) {
    this.department = new Department();
  }

  //checks if the user is authenticated, and if not, redirects to the login page.
  // Otherwise, it loads the admin institutions.
  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this._route.navigate(['login']);
    } else {
      this.loadAdminInstitutions();
    }
  }

  // adds a new department by calling the insertDepartment method of the DepartmentService
  addDepartment(dept: Department) {
    // If the department name already exists, the method displays an alert message to the user
    if (this.backupDept.findIndex((data) => data.name === dept.name) >= 0) {

    } else {
      // assigning value
      this.department = {} as Department;
      this.department.name = dept.name;
      this.department.description = dept.description;
      this.department.active = dept.active;
      this.department.institutionId = dept.institutionId;

      // inserting department
      this._deptService.insertDepartment(this.department).subscribe(
        (response) => {
          this.department = {} as Department;
          this.department = response;

          // replacing value from backup to departments
          this.departments[this.departments.indexOf(dept)] = Object.assign(
            {},
            this.backupDept[
            this.backupDept.findIndex((data) => data.id == dept.id)
            ]
          );

          this.departments.push(this.department);
          this.backupDept.push(Object.assign({}, this.department));

          this.location.back();




          if (this.departments.length > 0) {
            this.isHidden = false;
          }
        },
        (error) => {
          console.log('not able to add data \n' + JSON.stringify(error.error));
        }
      );
    }
  }

  //loads the admin institutions from session storage
  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
  }

  // allows the user to go back to the previous page
  HomeBtn() {
    this.location.back();
  }




}
