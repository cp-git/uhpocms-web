import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { Course } from '../class/course';
import { CourseService } from '../service/course.service';
import { Department } from 'app/admindepartment/class/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Coursedepartment } from '../class/coursedepartment';
import { CourseDepartmentService } from '../service/course-department.service';

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

  userName!: string;
  adminId: any;

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

      this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
      this.userName = this._activatedRoute.snapshot.params['userName'];
      // console.log(this.userName)
      this.getAllInstitutes();
      this.getCourse();
      this.loadAdminDepartments();
      this.loadCourseDepartment();
    }
  }

  //Getting the Course by Course Name
  getCourse() {
    const courseName: any = this._activatedRoute.snapshot.params['courseName'];

    this._service.getCourse(courseName).subscribe(
      (data) => {
        //  console.log(data);
        this.course = data;
      },
      (error) => {
        alert('Data not found');
      }
    );
  }

  //Fetching the Department as  Dropdown
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

  //getting the AllInstitute Name
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


  //Updating the course
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
          //console.log(data);
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
          this._route.navigate(['course/userrole', this.userName]);
        });

  }

  //Navigetting the Course panel
  back() {
    this._route.navigate(['course/userrole', this.userName]);
  }

  //Fetching getCourseDepartmentId
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
