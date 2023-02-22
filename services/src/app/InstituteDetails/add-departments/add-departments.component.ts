import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { Location } from '@angular/common';

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

  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this._route.navigate(['login']);
    } else {
      this.loadAdminInstitutions();
    }
  }

  addDepartment(dept: Department) {
    if (this.backupDept.findIndex((data) => data.name === dept.name) >= 0) {
      alert('Department name already exist. please enter another.');
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
          alert('Added Successfuly');
          this.location.back();




          if (this.departments.length > 0) {
            this.isHidden = false;
          }
        },
        (error) => {
          alert('not able to add data \n' + JSON.stringify(error.error));
        }
      );
    }
  }

  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
  }




}
