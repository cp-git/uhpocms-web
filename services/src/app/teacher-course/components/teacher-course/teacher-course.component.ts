import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Module specific imports
import { CourseAllColumn, CourseColumn } from 'app/teacher-course/teacher-course-column';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Course } from 'app/teacher-course/course';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';


@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent implements OnInit {


  // title heading
  moduleName: string = "Courses Administration";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;
  // If all data is available or not
  dataAvailable: boolean = false;



  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'courseId';

  readonly dropdownColumnId1: string = 'adminInstitutionId';
  readonly dropdownColumnName1: string = 'adminInstitutionName';


  allData: Course[] = []; // list of course
  allInActiveData: Course[] = []; // list of inactive course

  emptyCourse: Course;  // empty course
  currentData!: Course;  // for update and view, to show existing data

  sessionData: any;
  data: any;
  adminInstitutions: AdminInstitution[] = [];

  constructor(private service: TeacherCourseService, private location: Location) {
    this.columnNames = CourseColumn;
    this.allColumnNames = CourseAllColumn;

    // creating empty object
    this.emptyCourse = new Course();
    this.loadAdminInstitutions();
  }

  ngOnInit(): void {
    this.getAllCourse();  // for getting all active course
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
  private addCourse(currentData: Course) {

    currentData.courseIsActive = true;  // setting active true

    // calling service for adding data
    this.service.addCourse(currentData).subscribe(
      (data) => {
        alert('Courses added Successfully');
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
    this.dataAvailable = true;

    // calling service to get all data
    this.service.getAllCourses().subscribe(
      response => {

        this.allData = response; //assign data to local variable

        // if no data available
        if (this.allData.length > 0) {
          this.dataAvailable = true;
        }
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
        this.allInActiveData = response;
      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');
    // alert(this.sessionData);
    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
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

}



