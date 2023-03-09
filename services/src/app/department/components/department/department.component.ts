import { Component, OnInit, NgModule, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { TableModule } from 'app/front/module/table.module';
import { DepartmentService } from 'app/department/services/department.service';
import { Department } from 'app/admindepartment/department';
import { AdminInstitution } from 'app/admin-institution/admininstitution';
import { Router } from '@angular/router';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  readonly moduleName = 'Department';

  departments: Department[] = [];
  dataAvailable: boolean = false;
  sessionData: any;
  data: any;
  adminInstitutions: AdminInstitution[] = [];
  constructor(
    private location: Location,
    private module: TableModule,
    private departmentService: DepartmentService,
    private router: Router
  ) {

  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes[this.data.moduleData]) {
  //     this.data.moduleData = changes[this.data.moduleData].currentValue;
  //   }
  // }
  ngOnInit(): void {
    this.loadAdminInstitutions();
    this.getAllDepartments();
  }
  navigateToAdd() {
    this.router.navigate(['/add/Department']);
  }
  home() {
    this.location.back();
  }


  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
    this.departmentService.adminInstitutions = this.adminInstitutions;
  }

  private getAllDepartments() {
    // fetching all departments
    this.departmentService.fetchAllDepartments().subscribe(
      (response) => {
        //assign data to local variable
        this.departments = response;
        //assign data to service variable
        this.departmentService.departments = this.departments;
        // alert(JSON.stringify(this.departmentService.departments))
        if (this.departmentService.departments.length > 0) {
          this.dataAvailable = true;
        }
      },
      (error) => {
        console.log('No data in table ');
      }
    );
  }
}
