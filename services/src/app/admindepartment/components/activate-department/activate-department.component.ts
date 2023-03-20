import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';


import { Department } from 'app/admindepartment/class/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';

@Component({
  selector: 'app-activate-department',
  templateUrl: './activate-department.component.html',
  styleUrls: ['./activate-department.component.css', '../../../app.component.css']
})

export class ActivateDepartmentComponent implements OnInit {

  // array of admin department
  departments: Department[] = [];

  // array of admin institution
  adminInstitutions: AdminInstitution[] = [];

  //variables
  sessionData: any;
  data: any;
  userName!: string;
  adminId: any;

  //constructor
  constructor(private _departmentService: DepartmentService, private _router: Router, private _activatedRoute: ActivatedRoute) {
  }

  //ngOninit
  ngOnInit(): void {

    //functions to be executed on onload of page
    this.loadAdminInstitutions();
    this.getAllDeactivatedDepartments();

    //variables to fetch data from url
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];

  }

  //function to gte inactive departments
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

  //function to get all intstitutions 
  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');
    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
  }

  //function to activate department
  activateDepartment(departmentId: number) {
    this._departmentService.activateDepartment(departmentId).subscribe(
      response => {
        alert("Activatation sucessfully");
        this.departments = this.departments.filter(d => d.id !== departmentId); // Remove the activated department from the list
        this.adminInstitutions = []; // Clear the adminInstitutions array
        this.loadAdminInstitutions(); // Reload the adminInstitutions array with fresh data
      },
      error => {
        alert("deactivatation Failed");
      }
    );
  }

  //function to route
  home() {
    this._router.navigate(['department', this.userName]);
  }
}
