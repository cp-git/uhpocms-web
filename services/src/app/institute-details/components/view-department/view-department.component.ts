import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent {
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
    // Get the institution ID from the URL parameter
    this.institutionId = this.route.snapshot.paramMap.get('id');

    this.route.paramMap.subscribe(
      (params) => {
        this.id = params.get("id");

        // Load departments associated with the given institution ID
        if (this.id) {
          this.deptService.getDepartmentsByInstitutionId(this.id).subscribe(
            (deptdata: Department[]) => {
              this.departments = deptdata;
            }
          )
        }
      }
    )

    // Load admin institutions and assign the one associated with the current institution ID
    this.loadAdminInstitutions();
    this.assignInstitution();
  }

  // Assign the admin institution associated with the current institution ID
  private assignInstitution() {
    this.admininstitutions.forEach(institute => {
      if (institute.adminInstitutionId == this.id) {
        this.admininstitution = institute;
        return;
      }
    })
  }

  // Load the admin institutions from the session data
  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');
    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.admininstitutions.push(this.data[inst]);
    }
  }

  // Navigate to the department display page
  Display() {
    this._route.navigate(['/display', this.id]);
  }

  // Navigate to the add department page
  addDepartment() {
    this._route.navigate(['departments'])
  }

  // Navigate to the department course page for the given department ID
  viewDepartment(id: number) {
    this._route.navigate(['departmentCourse', id])
  }
}





