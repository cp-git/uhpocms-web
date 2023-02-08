import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'app/course/course';
import { CourseService } from 'app/course/course.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent {
  //course array
  courses: Course[] = [];
  backupCourse: Course[] = [];
  id: string | undefined | null;
  constructor(
    private _route: Router,
    private readonly courseService: CourseService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.id = params.get("id");
        if (this.id) {
          this.courseService.getCourseByInstitutionId(this.id).subscribe(
            (coursedata) => {
              this.courses = coursedata;
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
