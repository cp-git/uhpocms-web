import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Course } from 'app/course/course';
import { CourseService } from 'app/course/course.service';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coursedepartment',
  templateUrl: './coursedepartment.component.html',
  styleUrls: ['./coursedepartment.component.css']
})
export class CoursedepartmentComponent {


  // Institution array
  admininstitutions: AdminInstitution[] = [];
  backupInst: AdminInstitution[] = [];

  // for extra row when there is no data
  isHidden: boolean = false;
  hideId: boolean = false;
  admininstitution: AdminInstitution;

  sessionData: any;
  data: any;


  //course array
  courses: Course[] = [];
  backupCourse: Course[] = [];
  id: any | undefined | null;
  constructor(
    private _route: Router,
    private readonly courseService: CourseService,
    private readonly route: ActivatedRoute,
    private location: Location

  ) { this.admininstitution = new AdminInstitution(); }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.id = params.get("id");
        if (this.id) {
          console.log(this.id)
          this.courseService.getCourseByDepartmentId(this.id).subscribe(
            (coursedata) => {
              this.courses = coursedata;
              console.log(coursedata);
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

  addCourses() {
    this._route.navigate(['courses']);

  }

  Display() {
    this.location.back();

  }



}
