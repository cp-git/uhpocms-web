import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Department } from 'app/department/class/department';
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
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.css'],
})
export class AllCourseComponent implements OnInit {
  // title heading
  moduleName: string = 'Course Administration';

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  // for permissions that link with buttons
  buttonsArray: any;
  userAndRolePermissions: AuthUserPermission[] = [];

  // If all data is available or not
  dataAvailable: boolean = false;

  courseDepartment: CourseDepartment;
  institutionId: number = 0;
  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  updateColumnNames: any;

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'courseId';

  allData: Course[] = []; // list of course
  allInActiveData: Course[] = []; // list of inactive course

  emptyCourse: Course; // empty course
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

    this.updateColumnNames = CourseUpdateColumn;

    // creating empty object
    this.emptyCourse = new Course();

    this.courseDepartment = new CourseDepartment();

    this.userId = sessionStorage.getItem('userId');
    this.profileId = sessionStorage.getItem('profileId');
    this.userRole = sessionStorage.getItem('userRole');

    this.buttonsArray = {
      showAddButton: false,
      showActivateButton: false,
      showUpdateButton: false,
      showDeleteButton: false,
    };
  }

  ngOnInit(): void {
    this.loadAndLinkUserPermissions();

    this.initiliazation();
  }

  // this function for loading permission from session storage and link permission
  // with buttons to show and hide based on permissions
  private async loadAndLinkUserPermissions() {
    this.userAndRolePermissions =
      await this.userPermissionService.linkAndLoadPermissions(
        userModule.COURSE,
        this.userAndRolePermissions,
        this.buttonsArray
      );
    await this.userPermissionService.toggleButtonsPermissions(
      userModule.COURSE,
      this.userAndRolePermissions,
      this.buttonsArray
    );
  }

  private async initiliazation() {
    // this.getAllCourse();  // for getting all active course
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
      // this.accessControl(this.userRole);
      // this.toggleButtonsPermissions(this.buttonsArray);


      this.userPermissionService.toggleButtonsPermissions(
        userModule.COURSE,
        this.userAndRolePermissions,
        this.buttonsArray
      );
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
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
    this.currentData = objectReceived; // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked
  onChildUpdateClick(objectReceived: Course): void {


    // hiding update screen and displaying all course screen
    this.viewAll = false;
    this.viewUpdate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked
  onChildDeleteClick(objectReceived: Course): void {
    this.deleteCourse(objectReceived.courseId);
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked
  onChildActivateClick(objectReceived: Course): void {
    this.activateCourse(objectReceived.courseId);
  }

  // for navigating to add screen
  onAddClick() {

    this.emptyCourse = {} as Course;


    this.viewAll = false;
    this.viewAdd = true;




    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // on addComponents's submit button clicked
  onAddCourseSubmit(objectReceived: Course): void {

    this.addCourse(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateCourseSubmit(objectReceived: Course) {
    this.updateCourse(objectReceived);
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  /////////////////////////////// UPDATE THE COURSE //////////////////////////////
  private updateCourse(currentData: Course) {
    // calling service for updating data
    this.service.updateCourseById(currentData.courseId, currentData).subscribe(
      (response) => {


        this.dialogBoxServices.open(
          'Course updated successfully',
          'information'
        );


        this.back();
        this.getAllCourse();
      },
      (error) => {
        this.dialogBoxServices.open('Course Updation Failed', 'warning');
      }
    );
  }

  ///////////////////////////// INSERTION OF COURSE ///////////////////////////////
  private async addCourse(currentData: any) {
    try {
      const data = await this.service.addCourse(currentData).toPromise();

      this.courseDepartment.courseId = data.courseId;
      this.courseDepartment.department_id = currentData.departmentId;


      const courseAndDepartment = await this.service
        .assignCourseToDepartment(this.courseDepartment)
        .toPromise();
      if (courseAndDepartment) {
        await this.loadIdsOfAllCoursesWithDepartmentId();


        if (data.courseIsActive) {
          this.dialogBoxServices
            .open('Course Added successfully', 'information')
            .then((response) => {
              if (response) {
                location.reload(); // Refresh the page
              }
            });
        } else {
          this.dialogBoxServices.open(
            'Course added successfully but NOT ACTIVE',
            'information'
          );
        }
      }

      this.emptyCourse = {} as Course;
      this.ngOnInit();
      this.back();
    } catch (error) {
      this.dialogBoxServices.open('Failed to add Course', 'warning');

    }
  }

  //////////////////////LOAD ID OF ALL COURSES WITH DEPARTMENT ID //////////////////
  private async loadIdsOfAllCoursesWithDepartmentId() {
    try {
      const data = await this.service.getCoursesDepartmentId().toPromise();

      this.courseDepartments = data;
    } catch (error) {

    }
  }

  ////////////////////////////////// GETTING ALL COURSES //////////////////////////
  private getAllCourse() {
    // calling service to get all data
    this.service.getAllCourses().subscribe(
      (response) => {

        // this.allData = response; //assign data to local variable
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
        console.log('No data in table ');
      }
    );
  }

  //////////////////////////////////  DELETE THE COURSE BY COURSE ID ////////////////////////

  private deleteCourse(courseId: number) {
    this.dialogBoxServices
      .open('Are you sure you want to delete this Course ? ', 'decision')
      .then((response) => {
        if (response) {

          // Do something if the user clicked OK
          // calling service to soft delete
          this.service.deleteCourseByCourseId(courseId).subscribe(
            (response) => {

              this.dialogBoxServices
                .open('Course deleted successfully', 'information')
                .then((response) => {
                  if (response) {
                    location.reload(); // Refresh the page
                  }
                });
              this.ngOnInit();
            },
            (error) => {
              this.dialogBoxServices.open('Course deletion Failed', 'warning');
            }
          );
        } else {
          console.log('User clicked Cancel');
        }
      });
  }


  /////////////////////// GET ALL INACTIVE COURSES ///////////////////////////////////////////////////
  private getAllInActiveCourse() {
    // calling service to get all inactive record
    this.service.getAllDeactivateCourses().subscribe(
      (response) => {


        this.allInActiveData = [];

        response.forEach((course: Course) => {
          this.courseDepartments.find((coursedepartment: CourseDepartment) => {
            if (course.courseId == coursedepartment.courseId) {
              this.allInActiveData.push({
                ...course,
                departmentId: coursedepartment.department_id,
              });
            }
            this.allInActiveData.sort((a, b) =>
              a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1
            ); // order by alphabets for course name
          });
        });

      },
      (error) => {
        console.log('No data in table ');
      }
    );
  }


  /////////////////////////// FETCHING THE DEPARTMENTS  FROM SESSION STORAGE ///////////////////////////////
  private loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      (response) => {
        this.departments = response;

      },
      (error) => {

        this.dialogBoxServices.open('failed to get departments', 'information');
      }
    );
  }

  /////////////////////////////// FETCHING THE ADMIN INSTITUTION FROM SESSION STORAGE //////////////////////////////
  private loadAdminInstitutions() {
    try {
      this.sessionData = sessionStorage.getItem('admininstitution');

      this.data = JSON.parse(this.sessionData);
      if (this.adminInstitutions.length <= 0) {
        for (var inst in this.data) {
          this.adminInstitutions.push(this.data[inst]);
        }
      }
    } catch (err) {
      console.log('Error', err);
    }
  }



  /////////////////////////// ACTIVATAING THE COURSE USING COURSE ID /////////////////////////////////////////
  private activateCourse(courseId: number) {
    // calling service to activating admin role
    this.service.activateCourseById(courseId).subscribe(
      (response) => {
        this.dialogBoxServices
          .open('Course Activated', 'information')
          .then((response) => {
            if (response) {
              location.reload(); // Refresh the page
            }
          });
        this.ngOnInit();
      },
      (error) => {
        this.dialogBoxServices.open('Failed to Activate Course', 'warning');
      }
    );
  }



  ///////////////////////////// LOAD COURSES BASED ON ROLE//////////////////////////////////////////////
  private async loadCoursesBasedOnRole(userRole: string) {

    switch (userRole) {
      case 'admin' || 'coadmin':
        if (this.viewActivate == false) {
          // this.showAddButton = true;
          // this.showActivateButton = true;
        }
        this.getAllInActiveCourse(); // for getting all inactive course
        this.loadAdminInstitutions();
        this.loadDepartments();
        this.getAllCourse();
        break;
      case 'teacher':
        // this.updateButton = false;
        // this.deleteButton = false;

        // for getting only institituion profile id belongs
        // and departments of that institution
        await this.getInstitutionAndDepartmentsOfUserByUserId(this.profileId);
        await this.getDepartmentByProfileId(this.profileId);
        this.getCoursesByDepartmentId(this.departments[0].id);



        break;
      case 'student':
        // this.updateButton = false;
        // this.deleteButton = false;

        // for getting only institituion profile id belongs
        // and departments of that institution
        await this.getInstitutionAndDepartmentsOfUserByUserId(this.profileId);
        await this.getDepartmentByProfileId(this.profileId);
        this.getCoursesByDepartmentId(this.departments[0].id);


        break;
    }
  }



  //////////////// GETTING INSTITUTIONS AND ALL DEPARTMENTS OF INSTITUTE BY PROFILE FROM ADMIN INSTITUTIONS SERVICE  /////////////////
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

  }


  /////////////////////////// GET ALL ACTIVE DEPARTMENT BY INSTITUTE ID USED FROM DEPARTMENT SERVICE ////////////////////////
  getAllDepartmentsByInstitutionId(institutionId: any) {
    this.departmentService
      .getDepartmentsByInstitutionId(institutionId)
      .subscribe((response) => {

        this.departments = response;
      });
  }


  ////////////////////////  GETTING INACTIVE COURSES BY INSTITUTION ID /////////////////////////////////////////
  private getInactiveCoursesByInstitutionId(instituteId: number) {
    this.service
      .getInactiveCoursesByInstitutionId(instituteId)
      .subscribe((response) => {
        this.allInActiveData = response;

      });
  }

  ///////////////////////// GETTING ALL COURSES USING DEPARTMENT ID //////////////////////////////////

  private getCoursesByDepartmentId(departmentId: number) {

    this.service.getCourseByDepartmentId(departmentId).subscribe(
      (response) => {
        this.allData = [];
        this.allInActiveData = [];
        response.forEach((course: Course) => {
          if (course.courseIsActive) {
            this.allData.push({ ...course, departmentId: departmentId });
          } else {
            this.allInActiveData.push({ ...course, departmentId: departmentId });
          }
        });

        // order by alphabets for course name
        this.allData.sort((a, b) =>
          a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1
        );

        // order by alphabets for course name
        this.allInActiveData.sort((a, b) =>
          a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1
        );
      },
      (error) => {
        console.log('failed to get course using depatment id');
      }
    );
  }


  //////////////////////  GETTING DEPARTMENT USING PROFILE IF USED IN DEPARTMENT SERVICE //////////////////////////////
  private async getDepartmentByProfileId(profileId: number) {


    const result = await this.departmentService
      .getDepartmentOfProfileId(profileId)
      .toPromise();



    if (result !== undefined) {
      this.departments = result;
    } else {
      this.departments = [];
    }
  }
}
