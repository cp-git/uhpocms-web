import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from '../department';
import { DepartmentService } from '../service/department.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  department: Department;
  deptName: any;
  isDisabled: boolean = true;
  constructor(private _departmentService: DepartmentService, private _route: Router, private _url: ActivatedRoute) {
    this.department = new Department();
  }

  ngOnInit(): void {
    this.deptName = this._url.snapshot.paramMap.get('deptName');
    this._departmentService.getDepartmentByName((this.deptName)).subscribe(
      response => {
        this.department = response;
      },
      error => {
        alert("Not able to fetch Data");
      }
    );
  }

  updateDept(name: string) {
    this._departmentService.updateDepartment(name, this.department).subscribe(
      response => {
        alert("successfully updated")
        this._route.navigate(['/dept']);
      },
      error => {
        alert("failed to update");
      }
    );
  }

  backToDisplay() {
    this._route.navigate(['/dept'])
  }

}
