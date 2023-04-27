
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Course } from 'app/teacher-course/class/course';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';



@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent {


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
    private readonly courseService: TeacherCourseService,
    private readonly route: ActivatedRoute

  ) { this.admininstitution = new AdminInstitution(); }

  //retrieves the institution ID from the route parameters 
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.id = params.get("id");
        if (this.id) {
          this.courseService.getCourseByInstitutionId(this.id).subscribe(
            (coursedata: Course[]) => {
              this.courses = coursedata;
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

  //retrieves the admin institutions from the session storage
  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.admininstitutions.push(this.data[inst]);
    }
  }

  //navigates the user back to the institution display page
  Display() {
    this._route.navigate(['display', this.id]);
  }
}

