import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Department } from 'app/department/class/department';
// Module specific imports

import {
  CourseAllColumn,
  CourseColumn,
  CourseUpdateColumn,
} from 'app/teacher-course/column-name/teacher-course-column';

import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Course } from 'app/teacher-course/class/course';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { DepartmentService } from 'app/department/services/department.service';
import { CourseDepartment } from 'app/teacher-course/class/course-department';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css'],
})
export class TeacherCourseComponent implements OnInit {
  // title heading
  moduleName: string = 'Course Administration';

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;


  // If all data is available or not
  dataAvailable: boolean = false;


  courseDepartment: CourseDepartment;
  institutionId: number = 0;
  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data



  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'courseId';

  readonly dropdownColumnId1: string = 'adminInstitutionId';
  readonly dropdownColumnName1: string = 'adminInstitutionName';

  allData: Course[] = []; // list of course



  currentData!: Course; // for update and view, to show existing data

  userId: any;
  profileId: any;
  userRole: any;

  sessionData: any;
  data: any;
  adminInstitutions: AdminInstitution[] = [];
  departments: Department[] = [];

  courseDepartments: CourseDepartment[] = [];
  constructor(
    private service: TeacherCourseService,
    private dialogBoxServices: DialogBoxService,
    private location: Location,
    private departmentService: DepartmentService,
    private userPermissionService: AuthUserPermissionService,
    private institutionService: AdmininstitutionService
  ) {
    this.columnNames = CourseColumn;
    this.allColumnNames = CourseAllColumn;



    this.courseDepartment = new CourseDepartment();

    this.userId = sessionStorage.getItem('userId');
    this.profileId = sessionStorage.getItem('profileId');
    this.userRole = sessionStorage.getItem('userRole');



    switch (this.userRole) {
      case 'teacher':
        this.moduleName = 'Assigned Courses';
        break;
      case 'student':
        this.moduleName = 'Enrolled Courses';
        break;
    }
  }

  ngOnInit(): void {
    // this.loadAndLinkUserPermissions();

    this.initiliazation();


  }






  private async initiliazation() {
    await this.loadIdsOfAllCoursesWithDepartmentId();
    this.loadCoursesBasedOnRole(this.userRole);
  }



  // back button functionality
  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;

    } else {
      this.location.back();
    }
  }



  // For navigate to view screen with data
  // function will call when child view button is clicked
  onChildViewClick(objectReceived: any): void {


    // hiding view of all column and displaying all course screen
    this.viewOne = true;
    this.viewAll = false;
    // this.buttonsArray.showAddButton = false;
    // this.buttonsArray.showActivateButton = false;
    this.currentData = objectReceived; // assingning data to current data for child component
  }



  private async loadIdsOfAllCoursesWithDepartmentId() {
    try {
      const data = await this.service.getCoursesDepartmentId().toPromise();

      this.courseDepartments = data;
    } catch (error) {
      console.log('no data fetched');
    }
  }











  private async loadCoursesBasedOnRole(userRole: string) {


    switch (userRole) {

      case 'teacher':

        // for getting only institituion profile id belongs
        // and departments of that institution
        await this.getInstitutionAndDepartmentsOfUserByUserId(this.profileId);



        this.getAssignedCoursesOfTeacher(this.profileId);

        break;
      case 'student':

        // for getting only institituion profile id belongs
        // and departments of that institution
        await this.getInstitutionAndDepartmentsOfUserByUserId(this.profileId);

        // this.getInactiveCoursesByInstitutionId(this.adminInstitutions[0].adminInstitutionId);

        this.getCoursesEnrolledToStudent(this.profileId);
        break;
    }
  }

  ////////////////////////////////  courses enrolled to student /////////////////////////////////
  private getCoursesEnrolledToStudent(studentId: number) {
    this.service.getCourseByStudentId(studentId).subscribe(
      (data) => {
        this.allData = [];
        data.forEach((course: Course) => {

          this.courseDepartments.find((coursedepartment: CourseDepartment) => {
            if (course.courseId == coursedepartment.courseId) {
              this.allData.push({
                ...course,
                departmentId: coursedepartment.department_id,
              });
            }
            this.allData.sort((a, b) =>
              a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1
            ); // order by alphabets for course name
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ///////////////////////// GETTING ASSIGN COURSES OF TEACHER ///////////////////////////////
  private getAssignedCoursesOfTeacher(teacherId: number) {
    this.service.getAssignedCourseOfTeacher(teacherId).subscribe(
      (response) => {
        // this.allData = data;
        this.allData = [];
        response.forEach((course: Course) => {
          this.courseDepartments.find((coursedepartment: CourseDepartment) => {
            if (course.courseId == coursedepartment.courseId) {
              this.allData.push({
                ...course,
                departmentId: coursedepartment.department_id,
              });
            }
            this.allData.sort((a, b) =>
              a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1
            ); // order by alphabets for course name
          });
        });

      },
      (error) => {
        console.log(error);
      }
    );
  }


  ///////////////////// GETTING INSTITUTIONS AND ALL DEPARTMENT OF INSTITUTIONS BY PROFILE ID //////////
  private async getInstitutionAndDepartmentsOfUserByUserId(profileId: any) {
    try {
      const result = await this.institutionService
        .getInstitutionByProfileId(profileId)
        .toPromise();
      if (result !== undefined) {
        this.adminInstitutions = result;
      } else {
        this.adminInstitutions = [];
      }
    } catch (error) {
      console.log('no data fetched');
    }
    // for getting active and inactive departments using institution id
    this.getAllDepartmentsByInstitutionId(
      this.adminInstitutions[0].adminInstitutionId
    );
  }

  ///////////////////////////// GET ALL ACTIVE DEPARTMENTS BY INSTITUTION ID //////////////////////////////////////

  getAllDepartmentsByInstitutionId(institutionId: any) {
    this.departmentService
      .getDepartmentsByInstitutionId(institutionId)
      .subscribe((response) => {


        this.departments = response;
      });
  }


}
