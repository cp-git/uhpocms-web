import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DepartmentService } from 'app/department/services/department.service';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private location: Location, private router: Router, private departmentService: DepartmentService) {

  }

  ngOnInit(): void {
    // alert()
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


}

