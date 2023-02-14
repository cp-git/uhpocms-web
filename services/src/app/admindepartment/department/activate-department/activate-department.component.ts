import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminInstitution } from 'app/admindepartment/admin-institution/admin-institution';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';

@Component({
  selector: 'app-activate-department',
  templateUrl: './activate-department.component.html',
  styleUrls: ['./activate-department.component.css', '../../../app.component.css']
})
export class ActivateDepartmentComponent implements OnInit {
  departments: Department[] = [];

  // array of admin institution

  adminInstitutions: AdminInstitution[] = [];
  sessionData: any;
  data: any;

  constructor(private _departmentService: DepartmentService, private _router: Router) {

  }

  ngOnInit(): void {
    this.loadAdminInstitutions();
    this.getAllDeactivatedDepartments();

  }

  getAllDeactivatedDepartments() {
    this._departmentService.getAllDeactivatedDepartments().subscribe(
      response => {
        this.departments = response;
      },
      error => {
        alert("Failed ot fetch data");
      }
    )
  }

  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
  }

  activateDepartment(departmentId: number) {
    this._departmentService.activateDepartment(departmentId).subscribe(
      response => {
        alert("Activatation sucessfully");
        this.ngOnInit();
      },
      error => {
        alert("deactivatation Failed");
      }
    );
  }

  home() {
    this._router.navigate(['department']);
  }
}
