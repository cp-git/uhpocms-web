import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../department';
import { DepartmentService } from '../service/department.service';
@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {
  department: Department;
  deptName: any;
  constructor(private _departmentService: DepartmentService, private _url: ActivatedRoute, private _route: Router) {
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

  backToDisplay() {
    this._route.navigate(['/dept']);
  }
}
