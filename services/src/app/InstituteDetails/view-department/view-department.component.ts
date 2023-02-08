import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent {
  // department array
  departments: Department[] = [];
  backupDept: Department[] = [];
  id: string | undefined | null;

  constructor(
    private _route: Router,
    private readonly deptService: DepartmentService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.id = params.get("id");
        if (this.id) {
          this.deptService.getDepartmentByInstitutionId(this.id).subscribe(
            (deptdata) => {
              this.departments = deptdata;
            }
          )
        }
      }

    )




  }

  Display() {
    this._route.navigate(['display']);
  }

}
