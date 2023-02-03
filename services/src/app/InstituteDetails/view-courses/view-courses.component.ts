import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'app/course/course';
import { CourseService } from 'app/course/course.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent {
  // // department array
  // courses: Course[] = [];
  // backupCourse: Course[] = [];
  // id: string | undefined | null;
  // constructor(
  //   private readonly courseService: CourseService,
  //   private readonly route: ActivatedRoute
  // ) { }

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(
  //     (params) => {
  //       this.id = params.get("id");
  //       if (this.id) {
  //         this.courseService.getCourseByInstitutionId(this.id).subscribe(
  //           (deptdata) => {
  //             this.courses = deptdata;
  //           }
  //         )
  //       }
  //     }

  //   )
  // }
}
