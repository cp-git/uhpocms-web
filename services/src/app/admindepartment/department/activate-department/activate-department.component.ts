import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  userName!: string;
  adminId: any;

  constructor(private _departmentService: DepartmentService, private _router: Router, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadAdminInstitutions();
    this.getAllDeactivatedDepartments();
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.userName)

  }

  getAllDeactivatedDepartments() {
    this._departmentService.getAllDeactivatedDepartments().subscribe(
      response => {
        this.departments = response;
        console.log(response);
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
        this.departments = this.departments.filter(d => d.id !== departmentId); // Remove the activated department from the list
        this.adminInstitutions = []; // Clear the adminInstitutions array
        this.loadAdminInstitutions(); // Reload the adminInstitutions array with fresh data

        // this.ngOnInit();
      },
      error => {
        alert("deactivatation Failed");
      }
    );
  }

  home() {
    this._router.navigate(['department', this.userName]);
  }
}
