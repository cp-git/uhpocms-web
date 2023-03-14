import { Component, OnInit, NgModule, SimpleChanges } from '@angular/core';
import { DepartmentService } from 'app/department/services/department.service';
import { AdminInstitution } from 'app/admin-institution/admininstitution';
import { Router } from '@angular/router';
import { DepartmentColumn } from 'app/department/department-column';
import { Department } from 'app/department/department';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],

})
export class DepartmentComponent implements OnInit {
  readonly moduleName = 'Department';
  currentData: Department;
  departments: Department[] = [];
  dataAvailable: boolean = false;
  departmentHeader: any;
  sessionData: any;
  data: any;
  adminInstitutions: AdminInstitution[] = [];
  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {
    this.currentData = new Department();
    this.departmentHeader = DepartmentColumn;
  }

  ngOnInit(): void {
    this.loadAdminInstitutions();
    this.getAllDepartments();
  }
  navigateToAdd() {
    this.router.navigate(['/Department/add']);
  }
  back() {
    this.router.navigate(['/demo']);
  }


  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
    this.departmentService.adminInstitutions = this.adminInstitutions;
    // alert(JSON.stringify(this.adminInstitutions))
  }

  private getAllDepartments() {
    // fetching all departments
    this.departmentService.fetchAllDepartments().subscribe(
      (response) => {

        //assign data to local variable
        this.departments = response;

        //assign data to service variable
        this.departmentService.departments = this.departments;

        if (this.departmentService.departments.length > 0) {
          this.dataAvailable = true;
        }
      },
      (error) => {
        console.log('No data in table ');
      }
    );
  }

  onChildViewClick(objectReceived: any): void {
    // alert("onChildButtonClic2k" + JSON.stringify(objectReceived));
    this.currentData = objectReceived;
    this.departmentService.currentDepartmentData = this.currentData;
    this.router.navigate(['/Department/view'])
  }

  onChildUpdateClick(objectReceived: any): void {
    // alert("onChildButtonClic2k" + JSON.stringify(objectReceived));
    this.currentData = objectReceived;
    this.departmentService.currentDepartmentData = this.currentData;
    this.router.navigate(['/Department/update'])
  }


}
