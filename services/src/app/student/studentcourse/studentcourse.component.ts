import { Component } from '@angular/core';
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
  profileId: number;
  constructor(
    private _route: Router,
    private readonly studentCourseService: StudentCoursesService,
    private readonly route: ActivatedRoute

  ) {
    this.profileId = 0;
  }


  courses: Course[] = [];
  id: any | undefined | null;

  ngOnInit(): void {

    alert();
    const currentNavigation = this._route.getCurrentNavigation();
    if (currentNavigation) {
      // Use the currentNavigation object safely here
      const state = currentNavigation.extras.state;
      if (state) {
        this.profileId = state['id'];
        // Do something with the data (e.g. display it in the component)
      }
    }

    this.getStudentCourses();


    //   this.route.paramMap.subscribe(
    //     (params) => {
    //       this.id = params.get("id");
    //       if (this.id) {
    //         this.studentCourse.getCourseByProfileId(this.id).subscribe(
    //           (coursedata) => {
    //             this.courses = coursedata;
    //           }
    //         )
    //       }
    //     }
    //   )
  }


  getStudentCourses() {
    this.studentCourseService.getCourseByProfileId(this.profileId).subscribe(
      response => {
        this.courses = response;
      },
      error => {
        alert("failed to fetch data");
      }
    );
  }
  // private assignProfile() {
  //   this.instituteAdminProfile.forEach(profile =>  {

  //     if (profile.adminInstitutionId == this.id) {
  //       this.admininstitution = institute;
  //       return;
  //     }
  //   })
  // }
}
