import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'app/course/course';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { TeacherCourseService } from '../teacher-course.service';

@Component({
  selector: 'app-inactive-teacher-course',
  templateUrl: './inactive-teacher-course.component.html',
  styleUrls: ['./inactive-teacher-course.component.css']
})
export class InactiveTeacherCourseComponent {

  instituteAdminProfile: InstituteAdmin[] = [];
  teacherId: any;
  userName!: string;

  constructor(
    private _route: Router,
    private activatedRoute: ActivatedRoute,
    private readonly teacherCourseService: TeacherCourseService
  ) { }

  backToTeacherCourse() {
    this._route.navigate(['teachercourse', { id: this.teacherId }, this.userName]);
  }

  courses: Course[] = [];
  id: any | undefined | null;

  ngOnInit(): void {
    this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userName = this.activatedRoute.snapshot.params['userName'];
    console.log(this.userName)

    //this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getInactiveCoursesByProfileId(this.teacherId);
  }

  institutions: AdminInstitution[] = [];
  institution = new AdminInstitution();

  Back() {
    this._route.navigate(['teacher', { id: this.teacherId }]);
  }

  getInactiveCoursesByProfileId(teacherId: number) {
    //alert("id" + teacherId)
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
