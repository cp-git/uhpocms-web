import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleFile } from 'app/class/module-file';

import { Course } from 'app/teacher-course/class/course';
import { StudentService } from 'app/student/services/student.service';
import { Location } from '@angular/common';
import { Module } from 'app/module/class/module';

@Component({
  selector: 'app-student-module',
  templateUrl: './student-module.component.html',
  styleUrls: ['./student-module.component.css']
})
export class StudentModuleComponent {
  studentId: any;
  userName: any;

  courseId: any;
  moduleId: any;
  courses: Course[] = []; //array of Course objects that stores the courses of the student
  modules: Module[] = []; //array of Module objects that stores the modules of the courses
  studentModuleFiles: ModuleFile[] = []; //array of ModuleFile objects that stores the module files assigned to the student

  selectedCourse: any; //stores the selected course by the student. 
  selectedCourseName: any; //stores the selected course by the student. 

  selectedModule: any; //stores the selected module by the student.
  constructor(private activateRoute: ActivatedRoute,
    private studentService: StudentService,
    private _location: Location) {

  }
  ngOnInit(): void {
    this.studentId = this.activateRoute.snapshot.paramMap.get('id');
    this.userName = this.activateRoute.snapshot.params['userName'];

    this.loadCourseOfStudent(this.studentId);
    this.loadStudentAssignedCourses(this.studentId);
    this.selectedCourse = '1'
  }

  //loads the courses of the student using the getCourseByStudentId() method of StudentService
  loadCourseOfStudent(studentId: number) {
    this.studentService.getCourseByStudentId(studentId).subscribe(
      response => {
        this.courses = response;
        this.loadModuleOfCourse(this.courses);

      },
      error => {
        console.log(error);
        this.courses = [];
      }
    );
  }

  //Loads the modules of the courses using the getModuleByCourseId() method of StudentService
  loadModuleOfCourse(studentCourses: Course[]) {

    studentCourses.forEach(course => {

      this.studentService.getModuleByCourseId(course.courseId).subscribe(
        response => {
          response.forEach(module => {
            this.modules.push(module);
          })
          this.selectedCourseName = this.courses[0].courseName;
          this.selectedCourse = this.courses[0].courseId;
          this.selectedModule = this.modules[0].moduleId;

        },
        error => {
          console.log(error);
        }
      );
    })
  }

  //loads the module files assigned to the student using the getModuleFilesByStudentId() method of StudentService
  loadStudentAssignedCourses(studentId: number) {
    this.studentService.getModuleFilesByStudentId(studentId).subscribe(
      response => {
        this.studentModuleFiles = response;
      },
      error => {
        alert("Failed to load student course");
      }
    );

  }

  //sets the selected course by the student and resets the selected module
  onCourseSelect(courseId: any) {
    this.changeSelectedCourseName(courseId);

    this.selectedCourse = courseId;
    this.selectedModule = undefined;

  }
  // onModuleSelect(event: any) {
  //   this.moduleId = event.target.value;
  //   if (this.moduleId) {
  //     // this.selectedModule = this.selectedCourse.modules.find(m => m.moduleId === +this.moduleId);
  //   } else {
  //     this.selectedModule = undefined;
  //   }
  // }

  //navigates back to the student data page
  back() {
    this._location.back();
    // this.route.navigate(['studentdata/student', this.userName])
  }

  changeSelectedModule(moduleId: any) {
    this.selectedModule = moduleId;
  }

  changeSelectedCourseName(courseId: number) {
    this.courses.forEach(course => {
      if (course.courseId == courseId) {
        this.selectedCourseName = course.courseName;
      }
    })
  }
}
