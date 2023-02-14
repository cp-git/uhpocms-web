import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/admindepartment/admin-institution/admin-institution';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { Course } from '../course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-displaycourse',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  isActivationScreen: boolean = false;
  isVisible: boolean = true;

  _backupModule = new Map();

  controlEnabled: boolean = true;
  // array of course

  course = new Course();
  courses: Course[] = []; //for drop down data
  inActiveCourses: Course[] = [];
  institutions: AdminInstitution[] = [];
  institution = new AdminInstitution();
  sessionData: any;
  data: any;

  constructor(
    private _service: CourseService,
    private _instService: InstitutionSeriveService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router
  ) { }
  ngOnInit(): void {
    // this.getAllCourses();

    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.getAllCourses();
      this.getAllInstitutes();
      this.getAllDeactivateCourses();
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
  getAllCourses() {
    this._service._getAllCourses().subscribe((data) => {
      this.courses = data;

      this.courses.forEach((courseData) => {
        this._backupModule.set(
          courseData.courseName,
          Object.assign({}, courseData)
        );
      });
      if (this.courses.length > 0) {
        this.isVisible = false;
      }
    });
  }

  Add() {
    this._route.navigate(['addcourse']);
  }

  updatecourse(course: Course, courseName: string) {
    this._route.navigate(['updatecourse', courseName]);
  }
  Home() {
    this._route.navigate(['demo']);
  }

  deletecourse(course: Course) {
    this._service.deleteModule(course.courseName).subscribe(
      (data) => {
        this.courses.splice(this.courses.indexOf(course), 1);
        this._backupModule.delete(course.courseId);
        // this.ngOnInit();
        alert(course.courseName + ' deleted successfuly');

        if (this.courses.length > 0) {
          this.isVisible = false;
        }
      },
      (error) => {
        alert('Failed to delete');
      }
    );
  }

  redirectToActivateCourse() {
    this._route.navigate(['/activate']);
  }

  getAllDeactivateCourses() {
    this._service.getAllDeactivateCourses().subscribe(
      (response) => {
        this.inActiveCourses = response;
      },
      (error) => {
        alert("Error");
      }
    );
  }

  activateCourse(courseId: number) {
    this._service.activateCourseById(courseId).subscribe(
      (response) => {
        //this.courses = response;
        alert("Activated successful");
        this.ngOnInit();
      },
      (error) => {
        alert("Error");
      }
    );
  }

  // backToCourse() {
  //   this._route.navigate(['/course']);
  // }

  activationScreen() {
    this.isActivationScreen = true;
    this.ngOnInit();
  }
}
