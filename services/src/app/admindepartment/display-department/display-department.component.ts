import { Component } from '@angular/core';
import { Department } from '../department';
import { InsertDepartmentComponent } from '../insert-department/insert-department.component';
import { DepartmentService } from '../service/department.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display-department',
  templateUrl: './display-department.component.html',
  styleUrls: ['./display-department.component.css']
})
export class DisplayDepartmentComponent {

  _dept: Department[] = [];
  department: Department;
  constructor(private _departmentService: DepartmentService, private _route: Router) {
    this.department = new Department();
  }

  ngOnInit(): void {
    this._departmentService.fetchAllDepartments().subscribe(
      response => {
        this._dept = (response);
      },
      error => {
        alert("Not able to fetch data" + error.error);
      }
    );
  }

  insertDept() {
    this._route.navigate(['/dept/insertdept'])
  }

  updateDept(deptName: string) {
    this._route.navigate(['/dept/updatedept/', deptName])
  }

  deleteDept(name: string) {
    this._departmentService.deleteDepartment(name).subscribe(
      response => {
        console.log("Response received " + response);
        alert("successfully deleted");
        this._route.navigate(['/dept']);
        this.ngOnInit();
      },
      error => {
        alert("Not able to fetch data");
      }
    );
  }

  viewDept(deptName: string) {
    this._route.navigate(['/dept/viewdept/', deptName])
  }
}
