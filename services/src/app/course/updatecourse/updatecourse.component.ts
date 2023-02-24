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

@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styleUrls: ['./updatecourse.component.css'],
})
export class UpdatecourseComponent {
  isVisible: boolean = true;

  _backupModule = new Map();
  adminDepartments: Department[] = [];
  courseDepartments: Coursedepartment[] = [];

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
    private courseDepartmentService: CourseDepartmentService
  ) {
    this.courseDepartment = new Coursedepartment();


  }
  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.getAllInstitutes();
      this.getCourse();
      this.loadAdminDepartments();
      this.loadCourseDepartment();
    }
  }

  getCourse() {
    const courseName: any = this._activatedRoute.snapshot.params['courseName'];

    this._service.getCourse(courseName).subscribe(
      (data) => {
        console.log(data);
        this.course = data;
      },
      (error) => {
        alert('Data not found');
      }
    );
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

  updateCourse(updatedCourse: Course) {
    this.course = {} as Course;

    this.course.courseName = updatedCourse.courseName;
    this.course.courseId = updatedCourse.courseId;

    this.course.courseDescription = updatedCourse.courseDescription;
    this.course.courseIsActive = true;
    this.course.courseCode = updatedCourse.courseCode;
    this.course.courseType = updatedCourse.courseType;
    this.course.passingScore = updatedCourse.passingScore;
    this.course.instId = updatedCourse.instId;

    this._service
      .updateCourseListById(this.course.courseId, this.course)
      .subscribe(
        (data) => {
          console.log(data);
          // this.module = data;

          this._backupModule.set(
            this.course.courseCode,
            Object.assign({}, data)
          );

          this.courseDepartment.courseId = this.course.courseId;
          //alert(JSON.stringify(this.courseDepartment));
          this.courseDepartmentService.assignCourseToDepartment(this.courseDepartment).subscribe();

          this._route.navigate(['course']);
          if (this.courses.length > 0) {
            this.isVisible = false;
          }
          alert('Data updated successfully');
          this._route.navigate(['course/userrole/admin']);
        });

  }
  back() {
    this._route.navigate(['course']);
  }
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
}
