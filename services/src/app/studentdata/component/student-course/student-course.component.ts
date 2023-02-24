import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleFile } from 'app/class/module-file';
import { Course } from 'app/course/course';
import { StudentService } from 'app/studentdata/service/student.service';
import { Module } from 'app/teachermodule/module';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {
  studentId: any;
  courseId: any;
  moduleId: any;
  courses: Course[] = [];
  modules: Module[] = [];
  studentModuleFiles: ModuleFile[] = [];

  selectedCourse: any;
  selectedModule: any;
  constructor(private activateRoute: ActivatedRoute, private studentService: StudentService) {

  }
  ngOnInit(): void {
    this.studentId = this.activateRoute.snapshot.paramMap.get('id');
    this.loadCourseOfStudent(this.studentId);
    this.loadStudentAssignedCourses(this.studentId);
  }

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

  loadModuleOfCourse(studentCourses: Course[]) {

    studentCourses.forEach(course => {
      // alert(JSON.stringify(course))
      this.studentService.getModuleByCourseId(course.courseId).subscribe(
        response => {
          response.forEach(module => {
            this.modules.push(module);
          })
        },
        error => {
          console.log(error);
        }
      );
    })
  }

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

  onCourseSelect(courseId: any) {
    // this.courseId = event.target.value;
    if (courseId != 'undefined') {
      this.selectedCourse = courseId;
      this.selectedModule = undefined;
    } else {
      this.selectedCourse = undefined;
      this.selectedModule = undefined;
    }
  }
  // onModuleSelect(event: any) {
  //   this.moduleId = event.target.value;
  //   if (this.moduleId) {
  //     // this.selectedModule = this.selectedCourse.modules.find(m => m.moduleId === +this.moduleId);
  //   } else {
  //     this.selectedModule = undefined;
  //   }
  // }
}
