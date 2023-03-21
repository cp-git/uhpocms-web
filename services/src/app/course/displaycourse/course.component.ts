import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { Course } from '../class/course';
import { CourseService } from '../service/course.service';
import { Department } from 'app/admindepartment/class/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Coursedepartment } from '../class/coursedepartment';
import { CourseDepartmentService } from '../service/course-department.service';
import { Location } from '@angular/common';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';

@Component({
  selector: 'app-displaycourse',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  isActivationScreen: boolean = false;
  isVisible: boolean = true;

  adminDepartments: Department[] = [];
  courseDepartments: Coursedepartment[] = [];
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

  userName!: string;
  adminId: any;


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
  }
  ngOnInit(): void {
    // this.getAllCourses();


    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
      this.userName = this._activatedRoute.snapshot.params['userName'];
      // console.log(this.userName + " " + this.adminId)
      this.getAllCourses();
      this.getAllInstitutes();
      this.getAllDeactivateCourses();
      this.loadCourseDepartment();
    }


  }

  //getting All Institute
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

  //getting All COurses
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


  //Routing to the Add Course
  Add() {
    this._route.navigate(['addcourse']);
  }


  //Routing to Update Course
  updatecourse(course: Course, courseName: string) {
    this._route.navigate(['updatecourse', courseName, this.userName]);
  }


  //Navigating to Admin Panel
  Home() {
    this._route.navigate(['adminmodule/admin', this.userName])
    // if (this._activatedRoute.snapshot.params['role'] == 'admin') { this._route.navigate(['adminmodule/admin']); }

    // else if (this._activatedRoute.snapshot.params['role'] == 'teacher') { this._route.navigate(['teacherdisplay/teacher']); }

    // else if (this._activatedRoute.snapshot.params['role'] == 'student') { this._route.navigate(['studentdata/student']); }



  }


  //delete Course (Soft Delete)
  deletecourse(course: Course) {
    this._service.deleteCourseByName(course.courseName).subscribe(
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


  //Delete Course by CourseId
  deletecourseById(course: Course) {
    this._service.deleteCourseByCourseId(course.courseId).subscribe(
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

  //Redirected to Activating  Course
  redirectToActivateCourse() {
    this._route.navigate(['/activate']);
  }

  //Getting AllDeactivatedCourse
  getAllDeactivateCourses() {
    this._service.getAllDeactivateCourses().subscribe(
      (response) => {
        this.inActiveCourses = response;
      },
      (error) => {

      }
    );
  }


  //Activating the course..
  activateCourse(courseId: number) {
    this._service.activateCourseById(courseId).subscribe(
      (response) => {
        //this.courses = response;
        alert("Activated successful");
        this.ngOnInit();
      },
      (error) => {

      }
    );
  }

  // backToCourse() {
  //   this._route.navigate(['/course']);
  // }

  //Boolean value for display screen
  activationScreen() {
    this.isActivationScreen = true;
    this.ngOnInit();
  }


  //Fetching the all department
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


  //Fetching the Department by Id
  loadCourseDepartment() {
    this.courseDepartmentService.getCoursesDepartmentId().subscribe(
      response => {
        this.courseDepartments = response;
      },
      error => {
        console.log(error);
      }
    )
  }


  //Navigetting to Inactive Course
  inactivecourse() {
    this._route.navigate(['inactivecourse', this.adminId, this.userName])
  }
}
