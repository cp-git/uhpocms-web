import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from 'app/department/services/department.service';
import { AdminInstitution } from 'app/admin-institution/admininstitution';
import { Department } from 'app/department/department';
import { DepartmentAllColumn } from 'app/department/department-column';

@Component({
  selector: 'app-view-one-department',
  templateUrl: './view-one-department.component.html',
  styleUrls: ['./view-one-department.component.css']
})
export class ViewOneDepartmentComponent implements OnInit {
  currentData: Department;
  adminInstitutions: AdminInstitution[] = [];
  departmentHeader: any;
  constructor(private router: Router, private departmentService: DepartmentService) {
    this.currentData = new Department();
    this.departmentHeader = DepartmentAllColumn;
  }

  ngOnInit(): void {
    // alert()
    this.currentData = this.departmentService.currentDepartmentData;
    // alert(this.currentData)
    this.adminInstitutions = this.departmentService.adminInstitutions;
  }

  home() {
    this.router.navigate(['/Department']);
  }


}
