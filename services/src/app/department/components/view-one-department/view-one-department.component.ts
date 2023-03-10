import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/department/services/department.service';
import { AdminInstitution } from 'app/admin-institution/admininstitution';

@Component({
  selector: 'app-view-one-department',
  templateUrl: './view-one-department.component.html',
  styleUrls: ['./view-one-department.component.css']
})
export class ViewOneDepartmentComponent implements OnInit {
  currentData: Department;
  adminInstitutions: AdminInstitution[] = [];
  constructor(private location: Location, private router: Router, private departmentService: DepartmentService) {
    this.currentData = new Department();
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

  // onChildButtonClick(objectReceived: any): void {
  //   alert("onChildButtonClic2k" + JSON.stringify(objectReceived));
  //   this.currentData = objectReceived;
  // }
}
