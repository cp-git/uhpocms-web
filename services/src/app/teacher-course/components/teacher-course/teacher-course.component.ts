import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Department } from 'app/department/class/department';
// Module specific imports

import { CourseAllColumn, CourseColumn ,CourseUpdateColumn} from 'app/teacher-course/column-name/teacher-course-column';

import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Course } from 'app/teacher-course/class/course';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { DepartmentService } from 'app/department/services/department.service';
import { CourseDepartment } from 'app/teacher-course/class/course-department';
import { AppService } from 'app/app.service';
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
  // If all data is available or not
  dataAvailable: boolean = false;

  updateButton : boolean = true;
  deleteButton : boolean = true;


  courseDepartment: CourseDepartment;
  institutionId: number = 0;
  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  updateColumnNames : any;



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
  constructor(private service: TeacherCourseService, private location: Location, private departmentService: DepartmentService) {
    this.columnNames = CourseColumn;
    this.allColumnNames = CourseAllColumn;

    this.updateColumnNames = CourseUpdateColumn;


    // creating empty object
    this.emptyCourse = new Course();
    this.loadAdminInstitutions();
    this.loadDepartments();
    this.loadAllCoursesWithDepartmentId();
    this.courseDepartment = new CourseDepartment();


    this.userId = sessionStorage.getItem('userId');
    this.profileId = sessionStorage.getItem('profileId');
    this.userRole = sessionStorage.getItem('userRole');

  }

  ngOnInit(): void {
    // this.getAllCourse();  // for getting all active course
    this.loadCoursesBasedOnRole(this.userRole);
    this.getInActiveCourse(); // for getting all inactive course
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

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Course): void {

    // hiding update screen and displaying all course screen 
    this.viewAll = false;
    this.viewUpdate = true;

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
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
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
        alert(`Course updated successfully !`);
        this.back();
      },
      error => {
        alert(`Course updation failed !`);
      }
    );
  }

  // For adding course
  private addCourse(currentData: any) {

    currentData.courseIsActive = true;  // setting active true
    // console.log("currentda" + JSON.stringify(currentData));
    // calling service for adding data
    this.service.addCourse(currentData).subscribe(
      (data) => {

        this.courseDepartment.courseId = data.courseId;

        this.courseDepartment.departmentId = currentData.departmentId;
        // console.log("coursedept" + JSON.stringify(this.courseDepartment));
        this.service.assignCourseToDepartment(this.courseDepartment).subscribe(
          response => {
            alert('Course Added successfully');

          },
          error => {
            alert("Course added but failed to assign");
          }
        );
        this.emptyCourse = {} as Course;
        this.ngOnInit();
        this.back();

      },
      (error) => {
        alert("Failed to add Course");
      });
  }



  // for getting all courses
  private getAllCourse() {

    // calling service to get all data
    this.service.getAllCourses().subscribe(
      response => {

        // this.allData = response; //assign data to local variable
        this.allData = [];
        response.forEach((course: Course) => {
          this.courseDepartments.find((coursedepartment: CourseDepartment) => {
            if (course.courseId == coursedepartment.courseId) {
              this.allData.push({
                ...course,
                departmentId: coursedepartment.departmentId,
              });
            }
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

    // calling service to soft delete
    this.service.deleteCourseByCourseId(courseId).subscribe(
      (response) => {
        alert('Course deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        alert('course deletion failed');
      }
    );
  }

  // For getting all inactive course
  private getInActiveCourse() {

    // calling service to get all inactive record
    this.service.getAllDeactivateCourses().subscribe(
      response => {
        this.allInActiveData = [];

        response.forEach((course: Course) => {
          this.courseDepartments.find((coursedepartment: CourseDepartment) => {
            if (course.courseId == coursedepartment.courseId) {
              this.allInActiveData.push({
                ...course,
                departmentId: coursedepartment.departmentId,
              });

            }
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
      }
    )
  }
  private loadAdminInstitutions() {
    try {
      this.sessionData = sessionStorage.getItem('admininstitution');
      // alert(this.sessionData);
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
        alert("Activated course");
        this.ngOnInit();
      },
      error => {
        alert("Failed to activate");
      }
    );
  }

  private loadAllCoursesWithDepartmentId() {
    this.service.getCoursesDepartmentId().subscribe(
      (data) => {
        this.courseDepartments = data;
      }, error => {
        console.log("no data fetched");
      }
    );
  }

  private loadCoursesBasedOnRole(userRole: string) {
    console.log(userRole);

    switch (userRole) {
      case 'admin' || 'coadmin':
        this.showAddButton = true;
        this.showActivateButton = true;
        this.getAllCourse();
        break;
      case 'teacher':
        this.updateButton = false;
        this.deleteButton =false;
        this.getAssignedCoursesOfTeacher(this.profileId);

        break;
      case 'student':
        this.updateButton = false;
        this.deleteButton =false;
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
          this.courseDepartments.find((coursedepartment: CourseDepartment) => {
            if (course.courseId == coursedepartment.courseId) {
              this.allData.push({
                ...course,
                departmentId: coursedepartment.departmentId,
              });
            }
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
                departmentId: coursedepartment.departmentId,
              });
            }
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



