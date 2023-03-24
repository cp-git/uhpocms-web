
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Location } from '@angular/common';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';

@Component({
  selector: 'app-display-school',
  templateUrl: './display-school.component.html',
  styleUrls: ['./display-school.component.css']
})
export class DisplaySchoolComponent {
  // Institution array
  admininstitutions: AdminInstitution[] = [];
  backupInst: AdminInstitution[] = []; //backup array for admininstitutions

  //to show or hide extra rows in the HTML table when there is no data
  isHidden: boolean = false;
  hideId: boolean = false; // to hide or show the institution ID in the HTML table
  admininstitution: AdminInstitution; //AdminInstitution object used to store details of a particular institution

  sessionData: any;  //to store data retrieved from the session storage
  data: any; //to store parsed session data

  // array of Department objects used to store departments for a particular institution
  departments: Department[] = [];
  backupDept: Department[] = [];
  id: any | undefined | null;// used to store a particular institution's ID

  public institutionId: any; //to store the current institution's ID

  department = new Department();

  userName!: string;
  adminId: any;

  constructor(
    private _route: Router,
    private readonly deptService: DepartmentService,
    private readonly route: ActivatedRoute
  ) {
    this.admininstitution = new AdminInstitution();
    this.institutionId = 0;

  }

  ngOnInit(): void {

    this.adminId = this.route.snapshot.paramMap.get('id');
    this.userName = this.route.snapshot.params['userName'];
    console.log(this.userName)



    this.institutionId = this.route.snapshot.paramMap.get('id');

    this.route.paramMap.subscribe(
      (params) => {
        this.id = params.get("id");

        if (this.id) {
          console.log(this.id)
          this.deptService.getDepartmentsByInstitutionId(this.id).subscribe(
            (deptdata) => {
              this.departments = deptdata;
              console.log(deptdata);
            }
          )
        }



      }

    )



    // load and assign the current institution's details
    this.loadAdminInstitutions();
    this.assignInstitution();

  }

  private assignInstitution() {
    this.admininstitutions.forEach(institute => {

      if (institute.adminInstitutionId == this.id) {
        this.admininstitution = institute;
        return;
      }
    })
  }
  //loads all the available institutions from the session storage and 
  //adds them to the admininstitutions array
  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.admininstitutions.push(this.data[inst]);
    }
  }

  // method that navigates to the displayinstitute page with the current user's name as a parameter
  Display() {

    this._route.navigate(['/displayinstitute', this.userName]);
  }

  //method that navigates to the departments page
  addDepartment() {
    this._route.navigate(['departments'])
  }

  //method that navigates to the departmentCourse page with the department ID and current user's name as parameters
  viewDepartment(id: number) {
    this._route.navigate(['departmentCourse', id, this.userName])
  }


}

