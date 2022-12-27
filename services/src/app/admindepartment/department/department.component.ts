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

  department: Department;
  adminInstitutions: AdminInstitution[] = [];
  constructor(private _deptService: DepartmentService) {
    this.department = new Department();
  }

  ngOnInit(): void {
    this._deptService.fetchAllDepartments().subscribe(
      response => {
        this.departments = response;
      },
      error => {
        alert("Not able to fetch data" + error.error);
      }
    );

    this._deptService.fetchAllInstitutions().subscribe(
      response => {
        this.adminInstitutions = (response);

      },
      error => {
        alert("Not able to fetch data" + error.error);
      }
    );
  }

  addDepartment(dept: Department) {
    this._deptService.insertDepartment(this.department).subscribe(
      response => {
        this.department = response;
        alert("Added Successfuly");
        this.ngOnInit();
      },
      error => {
        alert("not able to add data");
      }
    );
  }

  updateDepartment() {

  }

  deleteDepartment() {

  }
}
