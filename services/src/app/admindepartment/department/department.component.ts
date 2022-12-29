import { Component, OnInit } from '@angular/core';
import { AdminInstitution } from '../admin-institution/admin-institution';
import { Department } from '../department';
import { DepartmentService } from '../service/department.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  // department array
  departments: Department[] = [];
  backupDept: Department[] = [];

  // for extra row when there is no data
  isHidden: boolean = true;

  department: Department;

  // array of admin institution 
  adminInstitutions: AdminInstitution[] = [];

  constructor(private _deptService: DepartmentService) {
    this.department = new Department();
  }

  ngOnInit(): void {

    // fetching all departments
    this._deptService.fetchAllDepartments().subscribe(
      response => {

        // assigning received data to departments
        this.departments = response;

        //  cloning array from departments to backupDept
        this.departments.forEach(dept => {
          this.backupDept.push(Object.assign({}, dept))
        })

        // when data not available
        if (this.departments.length > 0) {
          this.isHidden = true;
        }
      },
      error => {
        this.displayEmptyRow();
        alert("No data in table \n" + JSON.stringify(error.error));
      }
    );


    this._deptService.fetchAllInstitutions().subscribe(
      response => {
        this.adminInstitutions = (response);
      },
      error => {
        alert("Not able to fetch data \n" + JSON.stringify(error.error));
      }
    );
  }


  // for inserting new department in table
  addDepartment(dept: Department) {

    // assigning value 
    this.department = ({} as Department);
    this.department.name = dept.name;
    this.department.description = dept.description;
    this.department.active = dept.active;
    this.department.institutionId_id = dept.institutionId_id;

    // inserting department
    this._deptService.insertDepartment(this.department).subscribe(
      response => {
        this.department = response;

        this.backupDept.push(this.department);
        alert("Added Successfuly");

        // beacause of two way binding values are changed therefore assigning backupDept to departments
        this.departments = [];
        this.backupDept.forEach(dept => {
          this.departments.push(Object.assign({}, dept))
        })

        if (this.departments.length > 0) {
          this.isHidden = true;
        }
      },
      error => {
        alert("not able to add data \n" + JSON.stringify(error.error));
      }
    );

  }


  // for updating department
  updateDepartment(dept: Department) {

    // assigning value with id for update
    this.department = ({} as Department);
    this.department.id = dept.id;
    this.department.name = dept.name;
    this.department.description = dept.description;
    this.department.active = dept.active;
    this.department.institutionId_id = dept.institutionId_id;


    // updating department with name
    this._deptService.updateDepartment(dept.name, this.department).subscribe(
      response => {
        this.department = response;
        this.departments[this.departments.indexOf(dept)] = this.department;
        alert("Updated Successfuly");
      },
      error => {
        alert("not able to update data \n" + JSON.stringify(error.error));
      }
    );
  }


  // for deleting department
  deleteDepartment(dept: Department) {

    // calling service mathod to delete department
    this._deptService.deleteDepartment(dept.name).subscribe(
      response => {
        this.departments.splice(this.departments.indexOf(dept), 1);
        this.backupDept.splice(this.departments.indexOf(dept), 1);
        alert(dept.name + " department deleted successfuly");
        this.displayEmptyRow();
      },
      error => {
        alert("not able to delete \n" + JSON.stringify(error.error));
      }
    );
  }

  // for fetching department using department name
  getDepartment(name: string) {
    this._deptService.getDepartmentByName("science").subscribe(
      response => {
        this.department = response;
      },
      error => {
        this.department = ({} as Department);

      }
    );
    return this.department;
  }


  // for displaying empty when there is no data on ui
  private displayEmptyRow() {
    if (this.departments.length <= 0) {
      this.isHidden = false;
    }
  }

}
