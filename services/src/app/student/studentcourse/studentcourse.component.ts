import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'app/course/course';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { StudentCoursesService } from '../student-courses.service';

@Component({
  selector: 'app-studentcourse',
  templateUrl: './studentcourse.component.html',
  styleUrls: ['./studentcourse.component.css']
})
export class StudentcourseComponent {

  instituteAdminProfile: InstituteAdmin[] = [];
  profileId: any;

  constructor(

    private _route: Router,
    private activatedRoute: ActivatedRoute,
    private readonly studentCourseService: StudentCoursesService

  ) {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');;
  }



  courses: Course[] = [];
  id: any | undefined | null;

  ngOnInit(): void {

    this.getStudentCoursesByProfileId(this.profileId);

  }

  Back() {
    this._route.navigate(['studentdata', { id: this.profileId }]);
  }

  getStudentCoursesByProfileId(profileId: any) {
    this.studentCourseService.getCourseByProfileId(profileId).subscribe(
      response => {
        this.courses = response;

      },
      error => {
        alert("failed to fetch data");
      }
    );
  }
}
