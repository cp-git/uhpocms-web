import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/department/services/department.service';
import { AdminInstitution } from 'app/admin-institution/admininstitution';
@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {
  currentData: Department;
  adminInstitutions: AdminInstitution[] = [];
  constructor(private location: Location, private router: Router, private departmentService: DepartmentService) {
    this.currentData = new Department();
  }

  ngOnInit(): void {
    // alert()
    this.currentData = this.departmentService.currentDepartmentData;
    this.adminInstitutions = this.departmentService.adminInstitutions;
  }
  back() {
    this.router.navigate(['/Department']);
  }

  update(objectReceived: any) {
    objectReceived.active = true;
    this.departmentService.insertDepartment(objectReceived).subscribe(
      response => {
        alert(`Department updated successfully !`);
      },
      error => {
        alert(`Failed to update Department !`);
      }
    );

    this.router.navigate(['/Department'])
  }
  onChildUpdateClick(objectReceived: any): void {
    alert("sadfg" + JSON.stringify(objectReceived));
    this.update(objectReceived);
    // this.currentData = objectReceived;
  }


}
