import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { Course } from '../class/course';
import { CourseDepartmentService } from '../service/course-department.service';

import { Coursedepartment } from '../class/coursedepartment';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-inactivecourse',
  templateUrl: './inactivecourse.component.html',
  styleUrls: ['./inactivecourse.component.css']
})
export class InactivecourseComponent {

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
      console.log(this.userName)
      this.getAllCourses();
      this.getAllInstitutes();
      this.getAllDeactivateCourses();
      this.loadCourseDepartment();
    }


  }


  //Getting AllInstitute
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

  //Getting All Courses
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


  //Getting Deactivate Courses
  getAllDeactivateCourses() {
    this._service.getAllDeactivateCourses().subscribe(
      (response) => {
        this.inActiveCourses = response;
      },
      (error) => {

      }
    );
  }


  //Fetching the CourseDepartment by DepartmentId
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


  //Fetching All Department 
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


  //Function fot ActivateCourse
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


  //Back to Quiz Display All Data
  back() {
    this._route.navigate(['course/userrole', this.userName])
  }









}
