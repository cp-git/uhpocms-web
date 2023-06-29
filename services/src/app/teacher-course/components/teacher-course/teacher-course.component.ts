import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Department } from 'app/department/class/department';
// Module specific imports

import { CourseAllColumn, CourseColumn, CourseUpdateColumn } from 'app/teacher-course/column-name/teacher-course-column';

import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Course } from 'app/teacher-course/class/course';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { DepartmentService } from 'app/department/services/department.service';
import { CourseDepartment } from 'app/teacher-course/class/course-department';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { AppService } from 'app/app.service';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { userModule } from 'app/permissions/enum/user-module.enum';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent implements OnInit {


  // title heading
  moduleName: string = "Courses";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  // buttons
  showAddButton: boolean = false;
  showActivateButton: boolean = false;

  buttonsArray: any;
  userAndRolePermissions: AuthUserPermission[] = [];

  // If all data is available or not
  dataAvailable: boolean = false;

  updateButton: boolean = false;
  deleteButton: boolean = false;


  courseDepartment: CourseDepartment;
  institutionId: number = 0;
  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  updateColumnNames: any;



  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'courseId';

  readonly dropdownColumnId1: string = 'adminInstitutionId';
  readonly dropdownColumnName1: string = 'adminInstitutionName';


  allData: Course[] = []; // list of course
  allInActiveData: Course[] = []; // list of inactive course

  emptyCourse: Course;  // empty course
  currentData!: Course;  // for update and view, to show existing data

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
  ) {
    this.columnNames = CourseColumn;
    this.allColumnNames = CourseAllColumn;

    this.updateColumnNames = CourseUpdateColumn;


    // creating empty object
    this.emptyCourse = new Course();
    this.loadAdminInstitutions();
    this.loadDepartments();
    this.courseDepartment = new CourseDepartment();

    this.userId = sessionStorage.getItem('userId');
    this.profileId = sessionStorage.getItem('profileId');
    this.userRole = sessionStorage.getItem('userRole');

    this.buttonsArray = {
      showAddButton: false,
      showActivateButton: false,
      updateButton: false,
      deleteButton: false
    }
  }

  ngOnInit(): void {
    this.initiliazation();
    this.loadAndLinkUserPermissions();

  }

  // this function for loading permission from session storage and link permission 
  // with buttons to show and hide based on permissions 
  private loadAndLinkUserPermissions() {
    // console.log("hey 1");

    try {
      let sessionData: any = sessionStorage.getItem('permissions');
      //console.log(this.sessionData);
      let data = JSON.parse(sessionData);
      for (var inst in data) {
        this.userAndRolePermissions.push(data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err);
    }
    // console.log("hey 2");

    this.userPermissionService.linkPermissions(userModule.COURSE, this.userAndRolePermissions, this.buttonsArray);
    // console.log("hey 3");

    console.log(this.buttonsArray);
    this.toggleButtonsPermissions(this.buttonsArray);
    // console.log("hey 4");

  }

  private toggleButtonsPermissions(buttonsArray: any) {
    if (buttonsArray.showActivateButton) {
      this.showActivateButton = true;
    }
    if (buttonsArray.showAddButton) {
      this.showAddButton = true;
    }
    if (buttonsArray.deleteButton) {
      this.deleteButton = true;
    }
    if (buttonsArray.updateButton) {
      this.updateButton = true;
    }
  }

  private async initiliazation() {
    // this.getAllCourse();  // for getting all active course
    await this.loadAllCoursesWithDepartmentId();
    this.loadCoursesBasedOnRole(this.userRole);
    this.getInActiveCourse(); // for getting all inactive course
  }
  accessControl(userRole: string) {
    console.log(userRole);

    switch (userRole) {
      case 'admin' || 'coadmin':
        // if (this.viewActivate == false) {
        //   this.showAddButton = true;
        //   this.showActivateButton = true;
        // }
        break;
      case 'teacher':
        // this.showAddButton = false;
        // this.showActivateButton = false;

        break;
      case 'student':
        // this.showAddButton = false;
        // this.showActivateButton = false;
        break;
    }
  }

  // back button functionality
  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;
      this.accessControl(this.userRole);
      this.toggleButtonsPermissions(this.buttonsArray);
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
    this.showAddButton = false;
    this.showActivateButton = false;
    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Course): void {

    // hiding update screen and displaying all course screen 
    this.viewAll = false;
    this.viewUpdate = true;
    this.showAddButton = false;
    this.showActivateButton = false;
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
    this.viewAll = false;
    this.viewAdd = true;
    this.showAddButton = false;
    this.showActivateButton = false;
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
    this.showAddButton = false;
    this.showActivateButton = false;
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

  // For updating course
  private updateCourse(currentData: Course) {
    // calling service for updating data
    this.service.updateCourseById(currentData.courseId, currentData).subscribe(
      response => {
        this.dialogBoxServices.open('Course updated successfully', 'information');
        this.back();
      },
      error => {
        this.dialogBoxServices.open('Course Updation Failed', 'warning');
      }
    );
  }

  // adding course to course and linking course to department
  private async addCourse(currentData: any) {
    try {
      const data = await this.service.addCourse(currentData).toPromise();

      this.courseDepartment.courseId = data.courseId;
      this.courseDepartment.department_id = currentData.departmentId;
      console.log("coursedept" + JSON.stringify(this.courseDepartment));

      const courseAndDepartment = await this.service.assignCourseToDepartment(this.courseDepartment).toPromise();
      if (courseAndDepartment) {
        await this.loadAllCoursesWithDepartmentId();
        // console.log('Course Added successfully');

        if (data.courseIsActive) {
          this.dialogBoxServices.open("Course added successfully", 'information');
        } else {
          this.dialogBoxServices.open("Course added successfully but NOT ACTIVE", 'information');
        }
      }

      this.emptyCourse = {} as Course;
      this.ngOnInit();
      this.back();
    } catch (error) {
      
      this.dialogBoxServices.open("Failed to add Course", 'warning');
    }
  }

  private async loadAllCoursesWithDepartmentId() {

    try {
      const data = await this.service.getCoursesDepartmentId().toPromise();
      console.log(data);
      this.courseDepartments = data;

    } catch (error) {
      console.log("no data fetched");
    }
  }




  // for getting all courses
  private getAllCourse() {

    // calling service to get all data
    this.service.getAllCourses().subscribe(
      response => {
        console.log(response);

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
            this.allData.sort((a, b) => a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1) // order by alphabets for course name
          })
        })
        console.log(this.allData);


      },
      error => {
        console.log('No data in table ');

      }
    );
  }

  // For deleting (soft delete) course using courseId
  private deleteCourse(courseId: number) {
    this.dialogBoxServices.open('Are you sure you want to delete this Course ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        // calling service to soft delete
    this.service.deleteCourseByCourseId(courseId).subscribe(
      (response) => {
        console.log('Course deleted successfully');
        this.dialogBoxServices.open("Course deleted successfully", 'information');
        this.ngOnInit();
      },
      (error) => {
        this.dialogBoxServices.open('Course deletion Failed', 'warning');
      }
    );
  } else {
    console.log('User clicked Cancel');
    // Do something if the user clicked Cancel
  }
});
}

  // For getting all inactive course
  private getInActiveCourse() {

    // calling service to get all inactive record
    this.service.getAllDeactivateCourses().subscribe(
      response => {
        console.log(response);

        this.allInActiveData = [];

        response.forEach((course: Course) => {
          this.courseDepartments.find((coursedepartment: CourseDepartment) => {
            if (course.courseId == coursedepartment.courseId) {
              this.allInActiveData.push({
                ...course,
                departmentId: coursedepartment.department_id,
              });

            }
            this.allInActiveData.sort((a, b) => a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1) // order by alphabets for course name
          })

        })
        console.log(this.allInActiveData);
      },
      error => {
        console.log('No data in table ');
      }
    );

  }

  // fetching department data
  private loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      response => {
        this.departments = response;
      },
      error => {
        console.log("failed to get departments");
        this.dialogBoxServices.open("failed to get departments", 'information');
      }
    )
  }
  private loadAdminInstitutions() {
    try {
      this.sessionData = sessionStorage.getItem('admininstitution');
      // console.log(this.sessionData);
      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.adminInstitutions.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err)
    }
  }


  // For activating course using courseId
  private activateCourse(courseId: number) {

    // calling service to activating admin role
    this.service.activateCourseById(courseId).subscribe(
      response => {
        this.dialogBoxServices.open('Course Activated', 'information');
        this.ngOnInit();
      },
      error => {
        this.dialogBoxServices.open('Failed to Activate Course', 'warning');
      }
    );
  }

  // private loadAllCoursesWithDepartmentId() {
  //   console.log("started");

  //   this.service.getCoursesDepartmentId().subscribe(
  //     (data) => {
  //       console.log(data);

  //       this.courseDepartments = data;
  //       console.log("end");
  //     }, error => {
  //       console.log("no data fetched");
  //     }
  //   );


  // }

  private loadCoursesBasedOnRole(userRole: string) {
    console.log(userRole);

    switch (userRole) {
      case 'admin' || 'coadmin':
        if (this.viewActivate == false) {
          // this.showAddButton = true;
          // this.showActivateButton = true;
        }
        this.getAllCourse();
        break;
      case 'teacher':
        // this.updateButton = false;
        // this.deleteButton = false;
        this.getAssignedCoursesOfTeacher(this.profileId);

        break;
      case 'student':
        // this.updateButton = false;
        // this.deleteButton = false;
        this.getCoursesEnrolledToStudent(this.profileId);
        break;
    }

  }

  // for getting courses enroll for the student using  profileId
  private getCoursesEnrolledToStudent(studentId: number) {

    this.service.getCourseByStudentId(studentId).subscribe(
      (data) => {
        this.allData = [];
        data.forEach((course: Course) => {
          // console.log(course);

          this.courseDepartments.find((coursedepartment: CourseDepartment) => {
            if (course.courseId == coursedepartment.courseId) {
              this.allData.push({
                ...course,
                departmentId: coursedepartment.department_id,
              });
            }
            this.allData.sort((a, b) => a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1) // order by alphabets for course name
          })
        })
      },
      error => {
        console.log(error);
      }
    );
  }


  //getting courses assigned to teacher using profileId
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
            this.allData.sort((a, b) => a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1) // order by alphabets for course name
          })
        })
        console.log(this.allData);

      },
      error => {
        console.log(error);
      }
    );
  }


}



