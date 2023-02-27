import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';

@Component({
  selector: 'app-display-school',
  templateUrl: './display-school.component.html',
  styleUrls: ['./display-school.component.css']
})
export class DisplaySchoolComponent {
  // Institution array
  admininstitutions: AdminInstitution[] = [];
  backupInst: AdminInstitution[] = [];

  // for extra row when there is no data
  isHidden: boolean = false;
  hideId: boolean = false;
  admininstitution: AdminInstitution;

  sessionData: any;
  data: any;

  // department array
  departments: Department[] = [];
  backupDept: Department[] = [];
  id: any | undefined | null;

  public institutionId: any;

  department = new Department();

  constructor(
    private _route: Router,
    private readonly deptService: DepartmentService,
    private readonly route: ActivatedRoute
  ) {
    this.admininstitution = new AdminInstitution();
    this.institutionId = 0;

  }

  ngOnInit(): void {

    this.institutionId = this.route.snapshot.paramMap.get('id');

    this.route.paramMap.subscribe(
      (params) => {
        this.id = params.get("id");

        if (this.id) {
          console.log(this.id)
          this.deptService.getDepartmentByInstitutionId(this.id).subscribe(
            (deptdata) => {
              this.departments = deptdata;
              console.log(deptdata);
            }
          )
        }



      }

    )




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
  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.admininstitutions.push(this.data[inst]);
    }
  }

  Display() {
    this._route.navigate(['/display', this.id]);
  }

  addDepartment() {
    this._route.navigate(['departments'])
  }

  viewDepartment(id: number) {
    this._route.navigate(['departmentCourse', id])
  }


}
