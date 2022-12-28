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

  departments: Department[] = [];
  isEmpty: boolean = true;
  department: Department;
  adminInstitutions: AdminInstitution[] = [];
  html: string = "";
  dept2: Department;
  constructor(private _deptService: DepartmentService) {
    this.department = new Department();
    this.dept2 = new Department();
  }

  ngOnInit(): void {
    this._deptService.fetchAllDepartments().subscribe(
      response => {
        this.departments = response;
        if (this.departments.length > 0) {
          this.isEmpty = true;
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

  addDepartment(dept: Department) {

    this.department = ({} as Department);
    this.department.name = dept.name;
    this.department.description = dept.description;
    this.department.active = dept.active;
    this.department.institutionId_id = dept.institutionId_id;
    this._deptService.insertDepartment(this.department).subscribe(
      response => {
        this.department = response;
        this.departments.push(this.department);
        this.ngOnInit();
        alert("Added Successfuly");
      },
      error => {
        alert("not able to add data \n" + JSON.stringify(error.error));
      }
    );

  }

  updateDepartment(dept: Department) {
    this.department = ({} as Department);
    this.department.id = dept.id;
    this.department.name = dept.name;
    this.department.description = dept.description;
    this.department.active = dept.active;
    this.department.institutionId_id = dept.institutionId_id;

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

  deleteDepartment(dept: Department) {

    this._deptService.deleteDepartment(dept.name).subscribe(
      next => {
        this.departments.splice(this.departments.indexOf(dept), 1);
        alert(dept.name + " department deleted successfuly");
        this.displayEmptyRow();
      },
      error => {
        alert("not able to delete \n" + JSON.stringify(error.error));
      }
    );
  }

  private displayEmptyRow() {
    if (this.departments.length <= 0) {
      this.isEmpty = false;
    }
  }

}
