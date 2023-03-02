import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { Course } from '../course';
import { CourseService } from '../service/course.service';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Coursedepartment } from '../coursedepartment';
import { CourseDepartmentService } from '../course-department.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css'],
})
export class AddcourseComponent {
  isVisible: boolean = true;

  _backupModule = new Map();

  adminDepartments: Department[] = [];

  // array of course

  course = new Course();
  courses: Course[] = []; //for drop down data
  courseDepartment: Coursedepartment;

  institutions: AdminInstitution[] = [];
  institution = new AdminInstitution();
  sessionData: any;
  data: any;

  constructor(
    private _service: CourseService,
    private _instService: InstitutionSeriveService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private departmentService: DepartmentService,
    private courseDepartmentService: CourseDepartmentService,
    private location: Location

  ) {
    this.loadAdminDepartments();
    this.courseDepartment = new Coursedepartment();

  }
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

  loadAdminDepartments() {
    this.departmentService.fetchAllDepartments().subscribe(
      response => {
        this.adminDepartments = response;
      },
      error => {
        console.log(error);
      }
    );
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
        // console.log(course.instId)

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

        this.courseDepartment.courseId = this.course.courseId;
        this.courseDepartmentService.assignCourseToDepartment(this.courseDepartment).subscribe(
          response => {
            alert('Course Added successfully');
            this._route.navigate(['course']);
            if (this.courses.length > 0) {
              this.isVisible = false;
            }
            this.location.back();
          },
          error => {
            alert("Course added but failed to assign");
          }
        );

      },
      (error) => alert('Failed to add')
    );
  }

  back() {
    this.location.back();
    // this._route.navigate(['course']);
  }
}
