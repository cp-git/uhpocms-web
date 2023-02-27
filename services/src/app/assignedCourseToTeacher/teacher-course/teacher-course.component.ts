import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Course } from 'app/course/course';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { TeacherCourseService } from '../teacher-course.service';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent {

  adminDepartments: Department[] = [];
  instituteAdminProfile: InstituteAdmin[] = [];
  teacherId: any;

  adminInstitutions: AdminInstitution[] = [];
  institution = new AdminInstitution();
  courses: Course[] = [];
  id: any | undefined | null;


  sessionData: any
  data: any;
  constructor(
    private _route: Router,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private readonly teacherCourseService: TeacherCourseService
  ) {
    this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadAdminInstitutions();
  }


  ngOnInit(): void {

    this.getCoursesByProfileId(this.teacherId);

  }

  loadAdminDepartments() {
    this.departmentService.fetchAllDepartments().subscribe(
      response => {
        this.adminDepartments = response;
      },
      error => {
        console.log(error);
      }
    );
  }
  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
  }
  inactve() {
    this._route.navigate(['inactivecourse', { id: this.teacherId }])
  }
  Back() {
    this._route.navigate(['teacher', { id: this.teacherId }]);
  }


  getCoursesByProfileId(teacherId: any) {
    this.teacherCourseService.getAssignedCourseToTeacher(teacherId).subscribe(
      response => {
        this.courses = response;

      },
      error => {
        alert("failed to fetch data");
      }
    );
  }
}
