import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'app/course/course';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { StudentCoursesService } from '../student-courses.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent {

  //institute admin profile array
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

  userName!: string;
  adminId: any;

  ngOnInit(): void {
    // Get the value of the "id" parameter from the current route and assign it to the "profileId" 
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    // Get the value of the "userName" parameter from the current route and assign it to the "userName"
    this.userName = this.activatedRoute.snapshot.params['userName'];
    console.log(this.userName);
    this.getStudentCoursesByProfileId(this.profileId);
  }

  Back() {
    this._route.navigate(['studentdata/student', this.userName]);
  }


  //get student courses by profile id 
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
