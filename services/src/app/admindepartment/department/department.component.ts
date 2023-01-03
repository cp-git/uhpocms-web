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
  isHidden: boolean = false;
  hideId: boolean = false;
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
          this.isHidden = false;
        }
      },
      error => {
        this.displayEmptyRow();
        console.log("No data in table \n" + JSON.stringify(error.error));
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

    if (this.backupDept.findIndex(data => data.name === (dept.name)) >= 0) {
      alert("Department name already exist. please enter another.");

    } else {

      // assigning value 
      this.department = ({} as Department);
      this.department.name = dept.name;
      this.department.description = dept.description;
      this.department.active = dept.active;
      this.department.institutionId_id = dept.institutionId_id;

      // inserting department
      this._deptService.insertDepartment(this.department).subscribe(
        response => {
          this.department = ({} as Department);
          this.department = response;

          // replacing value from backup to departments
          this.departments[this.departments.indexOf(dept)] = (Object.assign({}, this.backupDept[this.backupDept.findIndex(data => data.id == dept.id)]));

          this.departments.push(this.department);
          this.backupDept.push(Object.assign({}, this.department));
          alert("Added Successfuly");

          if (this.departments.length > 0) {
            this.isHidden = false;
          }
        },
        error => {
          alert("not able to add data \n" + JSON.stringify(error.error));
        }
      );
    }
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
        this.department = ({} as Department);
        this.department = response;
        this.departments[this.departments.indexOf(dept)] = this.department;
        this.backupDept[this.departments.indexOf(dept)] = Object.assign({}, this.department);
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
    this.department = ({} as Department);
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
      this.isHidden = true;
      this.department = ({} as Department);
    }
  }

}
