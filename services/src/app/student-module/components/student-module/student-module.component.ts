import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  @ViewChild('videoPlayer', { static: false })
  videoPlayerRef!: ElementRef<HTMLVideoElement>;
  studentId: any;
  userName: any;

  courseId: any;
  moduleId: any;
  courses: Course[] = []; //array of Course objects that stores the courses of the student
  modules: Module[] = []; //array of Module objects that stores the modules of the courses
  studentModuleFiles: ModuleFile[] = []; //array of ModuleFile objects that stores the module files assigned to the student

  selectedCourse: any; //stores the selected course by the student. 
  selectedCourseName: any; //stores the selected course by the student.

  selectedModuleNameFile: any;
  selectedFile: any;
  selectedModule: any; //stores the selected module by the student.
  Date: any;
  constructor(private activateRoute: ActivatedRoute,
    private studentService: StudentService,
    private _location: Location,
    private elRef: ElementRef) {

  }

  ngOnInit(): void {
    this.studentId = this.activateRoute.snapshot.paramMap.get('id');
    this.userName = this.activateRoute.snapshot.params['userName'];

    this.loadCourseOfStudent(this.studentId);

    this.selectedCourse = '1'
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['selectedFile']) {
  //     alert("")
  //     const video = this.elRef.nativeElement.querySelector('video');
  //     video.load();
  //   }
  // }
  //loads the courses of the student using the getCourseByStudentId() method of StudentService
  loadCourseOfStudent(studentId: number) {
    this.studentService.getCourseByStudentId(studentId).subscribe(
      response => {
        this.courses = response;
        this.loadModuleOfCourse(this.courses);
        this.selectedCourseName = this.courses[0].courseName;
        this.selectedCourse = this.courses[0].courseId;
      },
      error => {
        console.log(error);
        this.courses = [];
      }
    );
  }





  get videoPlayer() {
    return this.videoPlayerRef.nativeElement;
  }

  get videoSrc() {
    return `../../../../assets/video/${this.selectedFile.moduleFile}`;
  }



  onSelectedFileChanged() {
    // Update the src attribute of the video player
    this.videoPlayer.src = this.videoSrc;
    this.videoPlayer.load(); // Reload the video
    // this.videoPlayer.play(); // Start playing the new video

  }
  //Loads the modules of the courses using the getModuleByCourseId() method of StudentService
  loadModuleOfCourse(studentCourses: Course[]) {

    studentCourses.forEach(course => {

      this.studentService.getModuleByCourseId(course.courseId).subscribe(
        response => {
          response.forEach(module => {
            this.modules.push(module);
            if (this.selectedCourse.courseId == module.courseId_id && module == null) {
              this.selectedModule = module;
            }
          })

          this.loadModuleFilesOfCourses(this.studentId);

        },
        error => {
          console.log(error);
        }
      );
    })
  }

  //loads the module files assigned to the student using the getModuleFilesByStudentId() method of StudentService
  loadModuleFilesOfCourses(studentId: number) {
    this.studentService.getModuleFilesByStudentId(studentId).subscribe(
      response => {
        this.studentModuleFiles = response;
        this.studentModuleFiles.forEach(file => {
          if (file.moduleId == this.selectedModule.moduleId) {
            this.selectedFile = file;
          }

        })

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

  changeselectedModuleName(moduleId: any) {
    this.selectedModule = moduleId;
  }

  changeSelectedCourseName(courseId: number) {
    this.courses.forEach(course => {
      if (course.courseId == courseId) {
        this.selectedCourseName = course.courseName;
      }
    })
  }

  changeSelectedFileAndModule(file: any, module: any) {
    this.selectedFile = [];
    this.selectedFile = file;
    this.selectedModule = module;
    this.onSelectedFileChanged();
  }

}
