import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleFile } from 'app/class/module-file';

import { Course } from 'app/teacher-course/class/course';
import { ModuleService } from 'app/module/services/module.service';
import { Location } from '@angular/common';
import { Module } from 'app/module/class/module';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { ModuleFileService } from 'app/module-file/services/module-file.service';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';
import { AdminInstitution } from 'app/class/admin-institution';
import { DepartmentService } from 'app/department/services/department.service';
import { Department } from 'app/department/class/department';
import { CourseDepartment } from 'app/teacher-course/class/course-department';

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

  moduleFileId: any;

  courseId: any;
  moduleId: any;

  instituteName: any;
  moduleName: any;
  courseName: any;
  departmentName: any;
  courses: Course[] = []; //array of Course objects that stores the courses of the student
  modules: Module[] = []; //array of Module objects that stores the modules of the courses
  studentModuleFiles: ModuleFile[] = []; //array of ModuleFile objects that stores the module files assigned to the student

  selectedCourse: any; //stores the selected course by the student. 
  selectedCourseName: any; //stores the selected course by the student.

  selectedModuleNameFile: any;
  selectedFile: any;
  selectedModule: any; //stores the selected module by the student.
  Date: any;


  moduleFileName: any;


  modulesArray: Module[] = []; //array of Module objects that stores the modules of the courses

  courseArray: Course[] = []; //array of Module objects that stores the modules of the courses

  instituteArray: AdminInstitution[] = []; //array of Module objects that stores the modules of the courses

  departmentArray: Department[] = []; //array of Module objects that stores the modules of the courses

  coursedepartmentArray: CourseDepartment[] = []; //array of Module objects that stores the modules of the courses

  moduleArray: Module[] = [];


  moduledata: Module[] = [];

  constructor(private activateRoute: ActivatedRoute,
    private courseService: TeacherCourseService,
    private moduleService: ModuleService,
    private modulefileService: ModuleFileService,
    private instituteadminService: AdmininstitutionService,
    private departmentService: DepartmentService,
    private moduleFileService: ModuleFileService,
    private _location: Location,
    private elRef: ElementRef) {

  }

  ngOnInit(): void {
    this.studentId = this.activateRoute.snapshot.paramMap.get('id');
    this.userName = this.activateRoute.snapshot.params['userName'];

    this.loadCourseOfStudent(this.studentId);

    this.selectedCourse = '1'

    //this.getModuleFiles(this.studentId);







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
    this.courseService.getCourseByStudentId(studentId).subscribe(
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




  onSelectedFileChanged() {
    // Update the src attribute of the video player
    // this.videoPlayer.src = this.videoSrc;
    this.videoPlayer.load(); // Reload the video
    // this.videoPlayer.play(); // Start playing the new video

  }
  //Loads the modules of the courses using the getModuleByCourseId() method of StudentService
  loadModuleOfCourse(studentCourses: Course[]) {

    studentCourses.forEach(course => {

      this.moduleService.getModuleByCourseId(course.courseId).subscribe(
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
    this.modulefileService.getModuleFilesByStudentId(studentId).subscribe(
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


  getModuleFiles(studentId: number) {
    this.moduleFileService.getModuleFilesByStudentId(studentId).subscribe(
      response => {
        console.log(response);
      }
    )
  }



  //sets the selected course by the student and resets the selected module
  onCourseSelect(courseId: any) {
    this.changeSelectedCourseName(courseId);
    this.selectedCourse = courseId;
    this.selectedModule = undefined;


    //names of attributes
    let departmentname: any;




    let departId: any;






    let modulecourseId: any;
    let institutioncourseId: any;
    let deptinstituteId: any;
    this.moduleService.getAllModules().subscribe(
      response => {
        //console.log(response);
        this.modulesArray = response;
        //  console.log(this.modulesArray);

        for (let i = 0; i < this.modulesArray.length; i++) {
          // console.log(this.modulesArray[i]);

          if (courseId == this.modulesArray[i].courseId_id) {
            modulecourseId = this.modulesArray[i].courseId_id;

            let modulesId = this.modulesArray[i].moduleId;
            console.log("Modules Id" + modulesId)
            console.log("module course : " + this.modulesArray[i].moduleName);

            // console.log("module course id" + this.modulesArray[i].courseId_id);

            // console.log("course table" + courseId);

            this.courseService.getAllCourses().subscribe(
              response => {

                this.courseArray = response;
                for (let k = 0; k < this.courseArray.length; k++) {
                  // console.log(this.courseArray[i])

                  if (modulecourseId == this.courseArray[k].courseId) {
                    institutioncourseId = this.courseArray[k].instId;
                    // console.log("course name :" + this.courseArray[k].courseName)

                    this.courseName = this.courseArray[k].courseName;
                    console.log("Course Name :" + this.courseName)

                    this.instituteadminService.fetchAdminInstitutionList().subscribe(
                      response => {
                        this.instituteArray = response;

                        for (let h = 0; h < this.instituteArray.length; h++) {
                          //console.log(this.instituteArray[i]);

                          if (institutioncourseId == this.instituteArray[h].adminInstitutionId) {
                            deptinstituteId = this.instituteArray[h].adminInstitutionId;
                            //console.log("institute name : " + this.instituteArray[h].adminInstitutionName);
                            this.instituteName = this.instituteArray[h].adminInstitutionName;
                            console.log(this.instituteName);

                            this.courseService.getCoursesDepartmentId().subscribe(
                              response => {
                                this.coursedepartmentArray = response;

                                for (let z = 0; z < this.coursedepartmentArray.length; z++) {
                                  //  console.log(this.coursedepartmentArray[z]);

                                  if (courseId == this.coursedepartmentArray[z].courseId) {
                                    // console.log(courseId);
                                    // console.log(this.coursedepartmentArray[z].department_id);
                                    departId = this.coursedepartmentArray[z].department_id;


                                    this.departmentService.getAllDepartments().subscribe(
                                      response => {
                                        this.departmentArray = response;
                                        // console.log(response)

                                        for (let c = 0; c < this.departmentArray.length; c++) {

                                          //console.log(this.departmentArray[c]);

                                          if (departId == this.departmentArray[c].id) {
                                            // console.log(this.departmentArray[c].name);
                                            this.departmentName = this.departmentArray[c].name;
                                            console.log(this.departmentName);










                                          }
                                        }
                                      })



                                  }

                                }

                              })



                          }
                        }
                        // console.log(response)

                      })


                  }
                }
                // console.log(response);
                //console.log("in course" + modulecourseId);
              }
            )






          }
        }

      })




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
    //console.log(moduleId);
  }

  changeSelectedCourseName(courseId: number) {
    this.courses.forEach(course => {
      if (course.courseId == courseId) {
        this.selectedCourseName = course.courseName;
      }
    })
  }



  changeSelectedFileAndModule(file: any, module: any) {
    let modulefileId: any;
    this.selectedFile = [];
    this.selectedFile = file;
    this.selectedModule = module;
    this.onSelectedFileChanged();


    this.moduleName = module.moduleName;
    console.log(this.moduleName)



    this.moduleFileName = file.moduleFileId;
    //console.log(name);






















  }

}
