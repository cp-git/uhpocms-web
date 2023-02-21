import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'app/course/course';
import { CourseService } from 'app/course/course.service';

@Component({
  selector: 'app-showcourses',
  templateUrl: './showcourses.component.html',
  styleUrls: ['./showcourses.component.css']
})
export class ShowcoursesComponent {

  deptid: any | undefined | null;

  courses: Course[] = [];

  constructor(
    private _route: Router,
    private readonly courseService: CourseService,
    private readonly route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.deptid = params.get("id");
        if (this.deptid) {
          this.courseService.getCourseByDepartmentId(this.deptid).subscribe(
            (coursedata) => {
              this.courses = coursedata;
              console.log(coursedata);
            }
          )
        }
      }
    )


  }

}
