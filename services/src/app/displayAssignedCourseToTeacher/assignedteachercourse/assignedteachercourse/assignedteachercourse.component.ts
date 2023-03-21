import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Coursesyllabus } from 'app/class/coursesyllabus';
import { Course } from 'app/course/course';
import { CourseDepartmentService } from 'app/course/course-department.service';
import { Coursedepartment } from 'app/course/coursedepartment';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';
import { TeacherCourseService } from 'app/displayAssignedCourseToTeacher/teacher-course.service';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';


@Component({
  selector: 'app-assignedteachercourse',
  templateUrl: './assignedteachercourse.component.html',
  styleUrls: ['./assignedteachercourse.component.css']
})
export class AssignedteachercourseComponent {

  adminDepartments: Department[] = [];
  instituteAdminProfile: InstituteAdmin[] = [];
  teacherId: any;

  coursesSyllabus: Coursesyllabus[] = [];
  courseSyllabus = new Coursesyllabus();


  adminInstitutions: AdminInstitution[] = [];
  institution = new AdminInstitution();
  courses: Course[] = [];
  course = new Course();
  id: any | undefined | null;
  userName!: string;

  courseDepartments: Coursedepartment[] = [];

  sessionData: any
  data: any;
  constructor(
    private _route: Router,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private readonly teacherCourseService: TeacherCourseService,
    private courseDepartmentService: CourseDepartmentService,
    private courseSyllabusServices: TeacherCourseService

  ) {
    this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadAdminInstitutions();
    this.loadAdminDepartments();
  }




  RedirectToCourseSyllabus() {
    this._route.navigate(['coursesyllabus']);
  }

  //get department
  loadAdminDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      response => {
        this.adminDepartments = response;
      },
      error => {
        console.log(error);
      }
    );
  }


  //get courses
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

  ngOnInit(): void {

    this.getCoursesByProfileId(this.teacherId);

    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {

      this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');
      this.userName = this.activatedRoute.snapshot.params['userName'];
      console.log(this.userName)

      this.getCoursesByProfileId(this.teacherId);

      this.loadCourseDepartment();
    }


  }

  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
  }
  inactve() {
    this._route.navigate(['inactivecourse', { id: this.teacherId }])
  }
  Back() {
    this._route.navigate(['teacherdisplay/teacher', { id: this.teacherId }, this.userName]);
  }


  getCoursesByProfileId(teacherId: any) {
    this.teacherCourseService.getAssignedCourseToTeacher(teacherId).subscribe(
      response => {
        this.courses = response;
        console.log(response);
      },
      error => {
        alert("failed to fetch data");
      }
    );
  }


  //function for insert syllabus with course id
  addSyllabus(courseId: number, courseSyllabus: Coursesyllabus) {
    this.courseSyllabus.courseId = courseId;
    this.courseSyllabus.syllabusFile = courseSyllabus.syllabusFile;
    this.courseSyllabus.courseSyllabusIsActive = true;

    this.courseSyllabusServices.addCourseSyllabus(this.courseSyllabus).subscribe(
      (data) => {
        alert(this.courseSyllabus)
        //console.log(data);
        this.coursesSyllabus = data;
        alert('syllabus Added successfully');
      },
      (error) => alert('failed to upload ')
    );
  }
}
