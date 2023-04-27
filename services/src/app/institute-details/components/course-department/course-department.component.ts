import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Location } from '@angular/common';
import { Course } from 'app/teacher-course/class/course';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';

@Component({
  selector: 'app-course-department',
  templateUrl: './course-department.component.html',
  styleUrls: ['./course-department.component.css']
})
export class CourseDepartmentComponent {

  // Institution array
  admininstitutions: AdminInstitution[] = [];
  //backup array of admininstitutions used to maintain the original list of institutions
  backupInst: AdminInstitution[] = [];

  //boolean variable used to hide an extra row when there is no data.
  isHidden: boolean = false;
  hideId: boolean = false; //boolean variable used to hide an id in the UI
  admininstitution: AdminInstitution; //object of type AdminInstitution

  sessionData: any; //variable used to store the session data
  data: any; //variable used to store the JSON-parsed session data


  //course array
  courses: Course[] = [];
  backupCourse: Course[] = [];//backup array of courses used to maintain the original list of courses
  id: any | undefined | null; //variable used to store the id of the selected department

  userName!: string; //string variable used to store the user name of the admin user
  adminId: any; //variable used to store the admin user id
  constructor(
    private _route: Router,
    private readonly courseService: TeacherCourseService,
    private readonly route: ActivatedRoute,
    private location: Location

  ) { this.admininstitution = new AdminInstitution(); }

  //to initialize the component and load the admin institutions and the 
  //courses for the selected department
  ngOnInit(): void {
    this.adminId = this.route.snapshot.paramMap.get('id');
    this.userName = this.route.snapshot.params['userName'];
    console.log(this.userName)
    this.route.paramMap.subscribe(
      (params) => {
        this.id = params.get("id");
        if (this.id) {
          console.log(this.id)
          this.courseService.getCourseByDepartmentId(this.id).subscribe(
            (coursedata: Course[]) => {
              this.courses = coursedata;
              console.log(coursedata);
            }
          )
        }
      }
    )
    this.loadAdminInstitutions();
    this.assignInstitution();

  }
  //to assign the current institution of the admin user
  private assignInstitution() {
    this.admininstitutions.forEach(institute => {

      if (institute.adminInstitutionId == this.id) {
        this.admininstitution = institute;
        return;
      }
    })
  }

  //to load the list of institutions for the admin user from the session storage

  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.admininstitutions.push(this.data[inst]);
    }
  }

  //to navigate to the "courses" page
  addCourses() {
    this._route.navigate(['courses']);

  }

  //to navigate back to the previous page
  Display() {

    this.location.back();

  }



}
