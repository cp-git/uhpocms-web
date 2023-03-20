import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Department } from '../../class/department';
import { DepartmentService } from '../../service/department.service';
import { Location } from '@angular/common';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['../../app.component.css'],
})
export class DepartmentComponent implements OnInit {
  // department array
  departments: Department[] = [];
  backupDept: Department[] = [];
  _backupDept = new Map();

  // for extra row when there is no data
  isHidden: boolean = false;
  hideId: boolean = false;
  department: Department;
  userName!: string;
  adminId: any;

  // array of admin institution
  adminInstitutions: AdminInstitution[] = [];
  sessionData: any;
  data: any;

  //constructor
  constructor(private _deptService: DepartmentService, private _route: Router, private location: Location, private _activatedRoute: ActivatedRoute) {
    this.department = new Department();
  }

  //ngoninit
  ngOnInit(): void {
    //code when user is not authenticated
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this._route.navigate(['login']);

    }
    //code when user is authenticated
    else {

      // variables to get data from url
      this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
      this.userName = this._activatedRoute.snapshot.params['userName'];

      //functions to be exceuted when page loads
      this.getAllDepartments();
      this.loadAdminInstitutions();
    }
  }

  // for inserting new department in table
  addDepartment(dept: Department) {

    // assigning value
    this.department = {} as Department;
    this.department.name = dept.name;
    this.department.description = dept.description;
    this.department.active = dept.active;
    this.department.institutionId = dept.institutionId;

    // inserting department
    this._deptService.createDepartment(this.department).subscribe(
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

        if (this.departments.length > 0) {
          this.isHidden = false;
        }
      },
      (error) => {
        alert("Department creation failed");
      }
    );
    // }
  }

  // for updating department
  updateDepartment(dept: Department) {
    // assigning value with id for update
    this.department = {} as Department;
    this.department.id = dept.id;
    this.department.name = dept.name;
    this.department.description = dept.description;
    this.department.active = dept.active;
    this.department.institutionId = dept.institutionId;

    // updating department with name
    this._deptService.updateDepartment(dept.name, this.department).subscribe(
      (response) => {
        this.department = {} as Department;
        this.department = response;
        this.departments[this.departments.indexOf(dept)] = this.department;
        this.backupDept[this.departments.indexOf(dept)] = Object.assign(
          {},
          this.department
        );
        alert('Updated Successfuly');
      },
      (error) => {
        alert('Department Name not exist for update ');
      }
    );
  }

  //function to update department by id
  updateDepartmentById(dept: Department) {

    // assigning value with id for update
    this.department = {} as Department;
    this.department.id = dept.id;
    this.department.name = dept.name;
    this.department.description = dept.description;
    this.department.active = dept.active;
    this.department.institutionId = dept.institutionId;

    this._deptService
      .updateDepartmentListById(this.department.id, this.department)
      .subscribe(
        (data) => {
          this.department = {} as Department;
          this.department = data;
          this.departments[this.departments.indexOf(dept)] = this.department;
          this.backupDept[this.departments.indexOf(dept)] = Object.assign(
            {},
            this.department
          );


          alert('Data updated successfully');

        },

        (error) => {
          alert('Updation Failed: Department Name Already Exist ');
        }
      );


  }

  // for deleting department by name
  deleteDepartment(dept: Department) {
    // calling service mathod to delete department
    this._deptService.deleteDepartment(dept.name).subscribe(
      (response) => {
        this.departments.splice(this.departments.indexOf(dept), 1);
        this.backupDept.splice(this.departments.indexOf(dept), 1);

        alert(dept.name + ' department deleted successfuly');
        this.displayEmptyRow();
      },
      (error) => {
        alert('not able to delete \n' + JSON.stringify(error.error));
      }
    );
  }

  //deleting dept by id
  deleteDepartmentById(dept: Department) {
    this._deptService.deleteDepartmentById(dept.id).subscribe(
      (data) => {
        this.departments.splice(this.departments.indexOf(dept), 1);
        // this.backupDept.splice(this.departments.indexOf(dept), 1);
        this._backupDept.delete(dept.id);

        // this.ngOnInit();
        alert(dept.id + ' deleted successfuly');

        if (this.departments.length > 0) {
          this.displayEmptyRow();
        }
      },
      (error) => {
        alert('Failed to delete');
      }
    );
  }

  // for fetching department using department name
  getDepartment(name: string) {
    this.department = {} as Department;
    this._deptService.getDepartmentByName('science').subscribe(
      (response) => {
        this.department = response;
      },
      (error) => {
        this.department = {} as Department;
      }
    );
    return this.department;
  }

  // for displaying empty when there is no data on ui
  private displayEmptyRow() {
    if (this.departments.length <= 0) {
      this.isHidden = true;
      this.department = {} as Department;
      this.department.active = true;
    }
  }

  //function to get all institutions
  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
  }

  //function to get aal departments
  private getAllDepartments() {
    // fetching all departments
    this._deptService.fetchAllDepartments().subscribe(
      (response) => {
        // assigning received data to departments
        this.departments = response;

        //  cloning array from departments to backupDept
        this.departments.forEach((dept) => {
          this.backupDept.push(Object.assign({}, dept));
        });

        // when data not available
        if (this.departments.length > 0) {
          this.isHidden = false;
        }
      },
      (error) => {
        this.displayEmptyRow();
        console.log('No data in table ');
      }
    );


  }

  //function to route
  Home() {

    this._route.navigate(['adminmodule/admin', this.userName]);
  }

  //function to route
  redirectToActivateDepartment() {

    this._route.navigate(['department/departmentactivation', this.userName]);
  }
}
