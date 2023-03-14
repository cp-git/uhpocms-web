import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminInstitution } from 'app/admin-institution/admininstitution';
import { Department } from 'app/department/department';
import { DepartmentColumn } from 'app/department/department-column';
import { DepartmentService } from 'app/department/services/department.service';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  adminInstitutions: AdminInstitution[] = [];
  departmentHeader: any;
  department: Department;
  sessionData: any;
  data: any;
  constructor(private router: Router, private departmentService: DepartmentService) {
    this.departmentHeader = DepartmentColumn;
    this.department = new Department();
  }

  ngOnInit(): void {
    this.loadAdminInstitutions();
    // this.adminInstitutions = this.departmentService.adminInstitutions;
    // alert("adinst" + JSON.stringify(this.adminInstitutions));
  }
  back() {
    this.router.navigate(['/Department']);
  }

  add(objectReceived: any) {
    objectReceived.active = true;
    this.departmentService.insertDepartment(objectReceived).subscribe(
      response => {
        alert(`Department added successfully !`);
      },
      error => {
        alert(`Failed to add Department !`);
      }
    );

    this.router.navigate(['/Department'])
  }

  onChildSubmitButtonClick(objectReceived: any): void {
    // alert("onChildButtonClick" + JSON.stringify(objectReceived));
    this.add(objectReceived);
  }


  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
    this.departmentService.adminInstitutions = this.adminInstitutions;

  }
}

