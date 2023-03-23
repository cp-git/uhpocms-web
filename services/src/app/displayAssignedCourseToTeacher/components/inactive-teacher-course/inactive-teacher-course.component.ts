import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { TeacherCourseService } from 'app/displayAssignedCourseToTeacher/services/teacher-course.service';
import { Location } from '@angular/common';
import { Course } from 'app/course/class/course';

@Component({
  selector: 'app-inactive-teacher-course',
  templateUrl: './inactive-teacher-course.component.html',
  styleUrls: ['./inactive-teacher-course.component.css']
})
export class InactiveTeacherCourseComponent {

  instituteAdminProfile: InstituteAdmin[] = [];
  teacherId: any;
  userName!: any;

  constructor(
    private _route: Router,
    private activatedRoute: ActivatedRoute,
    private readonly teacherCourseService: TeacherCourseService,
    private location: Location
  ) { }

  backToTeacherCourse() {
    this.location.back();
    this._route.navigate(['course/userrole/', this.userName, this.teacherId]);
  }

  courses: Course[] = [];
  id: any | undefined | null;

  ngOnInit(): void {
    this.teacherId = this.activatedRoute.snapshot.params['id'];
    this.userName = this.activatedRoute.snapshot.params['userName'];
    console.log(this.userName + " " + this.teacherId)

    //this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getInactiveCoursesByProfileId(this.userName);
  }

  institutions: AdminInstitution[] = [];
  institution = new AdminInstitution();

  Back() {
    // this.location.back();
    this._route.navigate(['teacher', { id: this.teacherId }]);
  }

  getInactiveCoursesByProfileId(teacherId: number) {
    this.teacherCourseService.getInactiveAssignedCourseToTeacher(teacherId).subscribe(
      response => {
        this.courses = response;
      },
      error => {
        alert("failed to fetch data");
      }
    );
  }
}
