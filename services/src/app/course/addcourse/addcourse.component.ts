import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { Course } from '../course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css'],
})
export class AddcourseComponent {
  isVisible: boolean = true;

  _backupModule = new Map();

  // array of course

  course = new Course();
  courses: Course[] = []; //for drop down data

  institutions: AdminInstitution[] = [];
  institution = new AdminInstitution();
  sessionData: any;
  data: any;

  constructor(
    private _service: CourseService,
    private _instService: InstitutionSeriveService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router
  ) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.getAllInstitutes();
    }
  }
  getAllInstitutes() {
    this._instService._getAllInstitutions().subscribe((data) => {
      this.institutions = data;

      this.institutions.forEach((institutionData) => {
        this._backupModule.set(
          institutionData.adminInstitutionName,
          Object.assign({}, institutionData)
        );
      });
      if (this.institutions.length > 0) {
        this.isVisible = false;
      }
    });
  }

  addCourse(course: Course) {
    //alert(JSON.stringify(module));

    var courseId = course.courseId;
    // module.moduleId = null;
    course.courseIsActive = true;
    this._service.addCourse(course).subscribe(
      (data) => {
        //console.log(data);
        this.course = data;
        console.log(course.instId)

        if (this._backupModule.size > 0) {
          this.courses[this.courses.indexOf(course)] = Object.assign(
            {},
            this._backupModule.get(courseId)
          );
        }
        this.courses.push(this.course);
        this._backupModule.set(
          this.course.courseId,
          Object.assign({}, this.course)
        );
        alert('Course Added successfully');
        this._route.navigate(['course']);
        if (this.courses.length > 0) {
          this.isVisible = false;
        }
      },
      (error) => alert('Module Name already exists')
    );
  }

  back() {
    this._route.navigate(['course']);
  }
}
