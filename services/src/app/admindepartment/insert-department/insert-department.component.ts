import { Component } from '@angular/core';
import { DepartmentService } from '../service/department.service';
import { Department } from '../department';
import { Router } from '@angular/router';
@Component({
  selector: 'app-insert-department',
  templateUrl: './insert-department.component.html',
  styleUrls: ['./insert-department.component.css']
})
export class InsertDepartmentComponent {
  department: Department;
  constructor(private _departmentService: DepartmentService, private _route: Router) {
    this.department = new Department();
  }

  insertDept() {
    this._departmentService.insertDepartment(this.department).subscribe(
      response => {
        alert("successfully added department with name " + this.department.name);
        this._route.navigate(['/dept'])
      },
      error => {
        alert("not able to add department");
      }
    );
  }

  backToDisplay() {
    this._route.navigate(['/dept'])
  }
}
