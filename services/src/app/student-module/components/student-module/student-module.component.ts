import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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

import { Moduleprogress } from 'app/moduleProgress/class/moduleprogress';
import { CourseProgress } from 'app/courseProgress/class/courseprogress';

import { QuizService } from 'app/quiz/services/quiz.service';
import { Quiz } from 'app/quiz/class/quiz';

import { QuizProgress } from 'app/quiz-progress/class/quiz-progress';
import { QuizProgressService } from 'app/quiz-progress/services/quiz-progress.service';
import { map, switchMap } from 'rxjs/operators';
import { StudentQuizComponent } from '../student-quiz/student-quiz.component';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import { ModuleProgressService } from 'app/moduleProgress/services/module-progress.service';
import { Modulefileprogress } from 'app/moduleFileProgress/class/modulefileprogress';
import { ModulefileprogressService } from 'app/moduleFileProgress/modulefileprogress.service';



@Component({
  selector: 'app-student-module',
  templateUrl: './student-module.component.html',
  styleUrls: ['./student-module.component.css']
})
export class StudentModuleComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false })
  videoPlayerRef!: ElementRef<HTMLVideoElement>;

  @ViewChild(StudentQuizComponent)
  private studentQuizComponent!: StudentQuizComponent;



  studentId: any;
  userName: any;


  // moduleFileId: any;



  courseId: any;
  moduleId: any;

  instituteName: any;
  moduleName: any;
  courseName: any;
  departmentName: any;
  courses: Course[] = []; //array of Course objects that stores the courses of the student
  courseList: Course[] = [];
  modules: Module[] = []; //array of Module objects that stores the modules of the courses

  studentModuleFiles: ModuleFile[] = []; //array of ModuleFile objects that stores the module files assigned to the student

  moduleFileProgress: Modulefileprogress = new Modulefileprogress;// Object of ModuleFileProgress
  moduleFileProgressArr: Modulefileprogress[] = [];// Array of Object of ModuleFileProgress
  updatedModuleFileProgressArr: Modulefileprogress[] = [];// Array of Object of ModuleFileProgress

  quizzes: Quiz[] = [];


  newModuleFileProgressArr: Modulefileprogress[] = [];// Array of Object of ModuleFileProgress
  uniquemofileprogarr: Modulefileprogress[] = [];
  selectedCourse: any; //stores the selected course by the student. 
  selectedCourseName: any; //stores the selected course by the student.
  moduleFileId: number = 0;
  studentIdProg: number = 0;
  fileIdArr: number[] = [];
  uniqueFileIdArr: number[] = [];
  studentIdArr: number[] = [];
  uniqueStudentIdArr: number[] = [];
  selectedModuleNameFile: any;
  selectedFile: any;
  selectedModule: any; //stores the selected module by the student.
  trackedModule: any; //stores the selected module by the student.
  selectedQuiz!: Quiz;
  Date: any;



  moduleFileName: any;


  modulesArray: Module[] = []; //array of Module objects that stores the modules of the courses

  courseArray: Course[] = []; //array of Module objects that stores the modules of the courses

  instituteArray: AdminInstitution[] = []; //array of Module objects that stores the modules of the courses

  departmentArray: Department[] = []; //array of Module objects that stores the modules of the courses

  coursedepartmentArray: CourseDepartment[] = []; //array of Module objects that stores the modules of the courses

  moduleArray: Module[] = [];


  moduledata: Module[] = [];

  accessibleModuleIds = new Set();    // module ids which are accessible to student

  constructor(private activateRoute: ActivatedRoute,
    private courseService: TeacherCourseService,
    private moduleService: ModuleService,
    private modulefileService: ModuleFileService,
    private instituteadminService: AdmininstitutionService,
    private departmentService: DepartmentService,
    private moduleFileService: ModuleFileService,
    private _location: Location,
    private elRef: ElementRef,
    private fileProgService: ModulefileprogressService,
    private quizProgServ: QuizProgressService,
    private moduleProgSErv: ModuleProgressService,
    private modFileServc: ModuleFileService,
    private quizService: QuizService,
    private cdr: ChangeDetectorRef,
    private courseProgServ: CourseProgressService) { }


  flag: boolean = false;
  secondflag!: boolean;
  completionPercentage: number = 0;
  moduleFileArr: ModuleFile[] = [];
  modFileArrLen!: number;
  private currentTime!: number;
  modprogress!: number;
  progressArr: number[] = [];
  uniqueProgressArr: number[] = [];

  fileProgress: Modulefileprogress[] = [];
  filteredFileProg: Modulefileprogress[] = [];

  moduleArrCopy: ModuleFile[] = [];
  modFileProgressCopy: Modulefileprogress[] = [];
  modulebasedArr: Modulefileprogress[] = [];
  moduleProgress: Moduleprogress = new Moduleprogress;
  filteredProgressFileIds: number[] = [];

  refVar: number = 0;
  statusModuleProg: Moduleprogress = new Moduleprogress;
  updatedModuleProgress: Moduleprogress = new Moduleprogress;
  statusModuleProgArr: number[] = [];
  unistatusModuleProgArr: number[] = [];
  updatedPercentage: number = 0;
  courseProgress: CourseProgress = new CourseProgress();
  moduleProgressArr: Moduleprogress[] = [];
  moduleArr: Module[] = [];
  couresFlag: boolean = false;
  fileFlag: boolean = false;

  modulePercentage: number = 0;
  quizIdArr1: number[] = [];
  quizIdArr2: number[] = [];
  quizPassedProgresses: any[] = [];
  quizFailedProgresses: any[] = [];
  couIdArrInCouProg: number[] = [];
  existingCourseProg: CourseProgress = new CourseProgress();
  courProgPercentage: number = 0;

  // moduleArray : Module[] = [];
  moduleProgArray: Moduleprogress[] = [];

  // constructor(private activateRoute: ActivatedRoute, private courseService: TeacherCourseService, private moduleService: ModuleService, private modulefileService: ModuleFileService, private quizProgServ: QuizProgressService, private moduleProgSErv :ModuleProgressService,
  //   private fileProgService: ModulefileprogressService, private _location: Location, private elRef: ElementRef, private modFileServc: ModuleFileService, private quizService: QuizService, private cdr: ChangeDetectorRef, private courseProgServ:CourseProgressService) {
  //   }







  ngOnInit(): void {
    // this.videoPlayer;



    this.studentId = this.activateRoute.snapshot.paramMap.get('id');
    this.userName = this.activateRoute.snapshot.params['userName'];
    this.loadCourseOfStudent(this.studentId);


    this.selectedCourse = '1'

    //this.getModuleFiles(this.studentId);








    // console.log(this.courses)
    // console.log(this.statusModuleProg.moduleId);


    this.getAllQuizzesByProfileId(this.studentId);
    this.getAllFileProgress();
    this.getQuizPorgressesByStudentId(this.studentId);

    this.filterUniqueModuleIds();



  }

  //loads the courses of the student using the getCourseByStudentId() method of StudentService

  loadCourseOfStudent(studentId: number) {
    this.courseService.getCourseByStudentId(studentId).subscribe(
      response => {
        this.courses = response;
        this.loadModuleOfCourse(this.courses);
        this.selectedCourseName = this.courses[0].courseName;
        this.selectedCourse = this.courses[0].courseId;

        console.log(this.selectedCourse)

        try {
          this.couresFlag = false;
          this.trackModuleProgress(this.selectedCourse)
          this.trackCourseProgress(this.selectedCourse)

          // this.chkCoursePogress(this.selectedCourse)


        }
        catch (e) {
          console.log(e)
        }

        this.sortAccessibleModules();
      },
      error => {
        console.log(error);

      }
    );
    console.log(this.courses)
    console.log(this.selectedCourse);


  }

  //triggers when video is played
  onVideoTimeUpdate() {

    //initialize flag to false
    this.flag = false


    //video element from html
    const videoElement: HTMLVideoElement = this.videoPlayerRef.nativeElement;
    const videoDuration = videoElement.duration;
    const currentTime = videoElement.currentTime;


    let percentage = (currentTime / videoDuration) * 100;

    //percentage


    percentage = Math.trunc(percentage);

    if (percentage % 10 == 0) {
      this.completionPercentage = percentage;
    }



    if ((this.completionPercentage > this.updatedPercentage) && (this.completionPercentage != 0)) {
      this.updatedPercentage = this.completionPercentage;




      console.log(this.selectedModule.moduleId)

      this.fileProgService.getAllFileProgressByModIdStudId(this.selectedModule.moduleId, this.studentId).subscribe(
        (response) => {


          this.newModuleFileProgressArr = response;
          console.log("gffgfgfg")
          console.log(this.newModuleFileProgressArr)

          // //loop through all data in file progress table
          for (let z = 0; z < this.newModuleFileProgressArr.length; z++) {
            //filter data as per current student id
            this.moduleFileId = this.newModuleFileProgressArr[z].fileId;

            //array for filtered entries for file id's as per current student id
            this.fileIdArr.push(this.moduleFileId);

            //array with unique values
            this.uniqueFileIdArr = this.fileIdArr.filter((value, index, self) => self.indexOf(value) === index);


          }

        }
      )





      if (this.uniqueFileIdArr.includes(this.selectedFile.moduleFileId) == true) {
        //loop through filtered module file progress array

        for (let k = 0; k < this.newModuleFileProgressArr.length; k++) {

          if (this.selectedFile.moduleFileId === this.newModuleFileProgressArr[k].fileId) {


            console.log("  if(this.selectedFile.moduleFileId == this.fileIdArr[i] )")
            this.moduleFileProgress = this.newModuleFileProgressArr[k];
            this.flag = true;
            k = this.newModuleFileProgressArr.length;

          }

          console.log("this.moduleFileProgress outside")
          console.log(this.moduleFileProgress)
          //if flag is true
          if (this.flag == true) {




            if (this.moduleFileProgress.progress == 100) {
              console.log("Enered in  this.moduleFileProgress.progress == 10")
              this.moduleProgresscCeateUpdate(this.selectedModule.moduleId);
              console.log(this.selectedModule)

            }

            //cond. to update moduleprogress table
            else if ((this.moduleFileProgress.progress < 100 || this.completionPercentage == 100) && (this.completionPercentage > this.moduleFileProgress.progress)) {


              console.log(" else if ((this.moduleFileProgress.progress < 100 || this.completionPercentage == 100) && (this.completionPercentage > this.moduleFileProgress.progress))");
              let modFileProg: Modulefileprogress = new Modulefileprogress();

              this.moduleFileProgress.progress = this.completionPercentage;

              this.moduleFileProgress.currentFilePageNo = 1
              console.log("Entered in else if loop")
              console.log("Value caught true");
              console.log(this.moduleFileProgress.progress)
              this.fileProgService.updatedModuleFileProgress(this.moduleFileProgress).subscribe(
                response => {
                  // alert("file status saved successfully through put method");
                  modFileProg = response

                  //if loop is mandatory here 
                  if (modFileProg.progress == 100) {
                    //function to generate tick mark or to loop throgh file progress again
                    this.getAllFileProgress();
                    this.moduleProgresscCeateUpdate(this.selectedModule.moduleId);


                  }



                }

              )




            }







          }


        }
      }
      //if file not present in table enter new entry
      else if (this.uniqueFileIdArr.includes(this.selectedFile.moduleFileId) == false) {

        console.log(" else if (this.uniqueFileIdArr.includes(this.selectedFile.moduleFileId) == false)");
        // console.log("this.selectedModule.moduleId   "+this.selectedModule.moduleId)
        let modFileProg: Modulefileprogress = new Modulefileprogress();
        this.moduleFileProgress.id = 0;
        this.moduleFileProgress.progress = this.completionPercentage;
        this.moduleFileProgress.currentFilePageNo = 1;
        this.moduleFileProgress.moduleId = this.selectedModule.moduleId;
        this.moduleFileProgress.fileId = this.selectedFile.moduleFileId;
        this.moduleFileProgress.studentId = this.studentId;
        console.log("object for post")
        console.log(this.moduleFileProgress)
        this.fileProgService.addFileProgressStatus(this.moduleFileProgress).subscribe(
          response => {

            modFileProg = response;


            console.log("inside addFileProgressStatus")




          }
        )
      }


    }



  }


  selectedFileData: any;
  selectedFileType: any;
  format: any;
  onSelectedFileChanged() {
    this.format = '';
    // Update the src attribute of the video player
    // this.videoPlayer.src = this.videoSrc;
    // this.videoPlayer.load(); // Reload the video
    // this.videoPlayer.play(); // Start playing the new video
    console.log("onSelectedFileChanged() called")
    this.updatedPercentage = 0;
    this.completionPercentage = 0;
    console.log(this.updatedPercentage)
    let blob: Blob;
    this.modulefileService.getFile(this.selectedFile.moduleFileId).subscribe(
      (response: ArrayBuffer) => {
        console.log(response);
        const bytes = new Uint8Array(response);
        // Create an ArrayBuffer
        const arrayBuffer = new ArrayBuffer(4);
        const dataView = new DataView(arrayBuffer);
        dataView.setInt32(0, 42);
        console.log(dataView);
        // Create a Blob from the ArrayBuffer
        const blob2 = new Blob([arrayBuffer]);
        console.log(blob2);
        // Check if the file is a PDF
        if (String.fromCharCode.apply(null, Array.from(bytes.subarray(0, 4))) === '%PDF') {
          blob = new Blob([response], { type: 'application/pdf' });
          this.selectedFileType = 'application/pdf';
          this.selectedFileData = URL.createObjectURL(blob);
          this.format = 'pdf';
        }
        // Check if the file is a video
        const mp4Signature = String.fromCharCode.apply(null, Array.from(bytes.subarray(4, 8)));
        console.log(mp4Signature);
        if (mp4Signature === 'ftypisom' || mp4Signature === 'ftypmp42' || mp4Signature.startsWith('ftyp')) {
          blob = new Blob([response], { type: 'video/mp4' });
          this.selectedFileType = 'video/mp4'
          this.selectedFileData = URL.createObjectURL(blob);
          this.format = 'video';
          this.videoPlayer.src = this.selectedFileData;
        }
        console.log(this.selectedFileData);
      }
    );
  }

  //triggers when video is pause
  pauseVideo() {
    this.videoPlayerRef.nativeElement.pause(); // Pause the video
  }



  //function is called when video ends
  videoEnd() {
    this.flag = false;


    this.changeSelectedFileAndModule(this.selectedFile, this.selectedModule)

    this.sortAccessibleModules();
  }




  get videoPlayer() {
    return this.videoPlayerRef.nativeElement;
  }




  // onSelectedFileChanged() {
  //   // Update the src attribute of the video player
  //   // this.videoPlayer.src = this.videoSrc;
  //   this.videoPlayer.load(); // Reload the video
  //   // this.videoPlayer.play(); // Start playing the new video
  //   console.log("onSelectedFileChanged() called")
  //   this.updatedPercentage = 0;
  //   this.completionPercentage = 0;
  //   console.log(this.updatedPercentage)

  // }
  //Loads the modules of the courses using the getModuleByCourseId() method of StudentService
  loadModuleOfCourse(studentCourses: Course[]) {

    studentCourses.forEach(course => {

      this.moduleService.getModuleByModuleId(course.courseId).subscribe(
        response => {
          response.forEach(module => {
            this.modules.push(module);
            console.log(module)
            console.log(this.selectedCourse)
            if (this.selectedCourse == module.courseId_id) {
              this.selectedModule = module;

              console.log("inside loadModuleOfCourse")
              console.log(module)
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
        console.log("Failed to load student course");
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
    this.courProgPercentage = 0;
    this.changeSelectedCourseName(courseId);

    this.selectedCourse = courseId;

    this.selectedModule = undefined;
    this.trackCourseProgress(courseId)
    console.log(this.selectedCourse);
    console.log(this.selectedModule);



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



    this.sortAccessibleModules();
  }


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
    this.quizzes.filter(quiz => quiz.moduleId == module.moduleId)
    this.onSelectedFileChanged();



    this.moduleName = module.moduleName;
    console.log(this.moduleName)



    this.moduleFileName = file.moduleFileId;
    //console.log(name);























  }


  //function to check if given module id and student id already exist in moduleprogress table
  trackModuleProgress(courseId: number) {
    this.statusModuleProg;
    let trackModules: Module[] = [];
    console.log("Called")
    let moduleId: number;
    //get modules from module table
    this.moduleService.getModuleByModuleId(courseId).subscribe(
      response => {
        console.log("Inside getModuleByModuleId(moduleId)")
        response.forEach(module => {
          trackModules.push(module);
          console.log(module);
          console.log(moduleId)
          if (courseId == module.courseId_id) {
            this.trackedModule = module;
            console.log(module.courseId_id)

            try {

              //get moduleprogress entry  by module Id and student Id
              this.moduleProgSErv.getModuleProgressByModIdStudId(module.moduleId, this.studentId).subscribe(
                (response) => {

                  //ModuleProgress Entity
                  this.statusModuleProg = response;
                  if (this.statusModuleProg.progress == 100) {
                    this.trackCourseProgress(this.selectedCourse)
                  }
                  console.log(this.statusModuleProg)
                  this.statusModuleProgArr.push(this.statusModuleProg.moduleId)
                  //function to get Unique entries
                  this.filterUniqueModuleIds();
                }

              )

            }
            catch (e) { }
          }
        })


      })
    console.log(this.statusModuleProgArr);
    this.unistatusModuleProgArr = this.statusModuleProgArr.filter((value, index, self) => self.indexOf(value) === index);

    console.log(this.unistatusModuleProgArr);

  }

  existingmoduleProgress(moduleId: number, courseId: number) {

    console.log(moduleId)
    this.moduleProgSErv.getModuleProgressByModIdStudId(moduleId, this.studentId).subscribe(
      (response) => {

        //ModuleProgress Entity
        this.updatedModuleProgress = response;

        if (this.updatedModuleProgress.progress == 100) {
          this.trackCourseProgress(courseId)
        }
        this.sortAccessibleModules();
      })
  }

  filterUniqueModuleIds() {
    // Filter and store unique values in unistatusModuleProgArr
    this.unistatusModuleProgArr = this.statusModuleProgArr.filter((value, index, self) => self.indexOf(value) === index);
    console.log(this.unistatusModuleProgArr);
  }



  trackCourseProgress(courseId: number) {

    let moduleArray: Module[] = [];
    let moduleProgArray: Moduleprogress[] = [];


    this.chkCoursePogress(courseId);
    this.moduleService.getModulesByCourseId(courseId).subscribe(
      (response) => {

        moduleArray = response;

        console.log(response)
        this.moduleArray = moduleArray;



        this.moduleProgSErv.getModuleProgByCourseId(courseId).subscribe(
          (response) => {
            console.log(this.selectedCourse)
            moduleProgArray = response;

            this.moduleProgArray = moduleProgArray.filter((array) => array.studentId == this.studentId && array.progress == 100)
            console.log(response)


            console.log("moduleProgArray.length " + this.moduleProgArray.length + "moduleProgArray.length " + this.moduleArray.length)
            if ((this.moduleProgArray.length <= this.moduleArray.length) && this.moduleProgArray.length != 0) {

              console.log(this.existingCourseProg)
              console.log("if ((this.moduleProgArray.length <= this.moduleArray.length) &&  this.moduleProgArray.length != 0)")

              console.log(this.existingCourseProg)
              if (this.existingCourseProg.courseId != courseId) {
                let addedcourseProgress: CourseProgress = new CourseProgress();
                console.log("if(this.existingCourseProg.courseId != courseId && this.existingCourseProg.studentId != this.studentId)")

                this.courseProgress.id = 0;
                this.courseProgress.courseId = this.selectedCourse;
                this.courseProgress.studentId = this.studentId;
                this.courseProgress.currentAssignNo = 1;
                this.courseProgress.currentModuleNo = 1;
                this.courseProgress.currentUnitNo = 1;
                this.courseProgress.grade = 100;
                this.courseProgress.progress = (this.moduleProgArray.length * 100) / this.moduleArray.length;
                this.courseProgServ.addCourseProgressStatus(this.courseProgress).subscribe(
                  (response) => {

                    addedcourseProgress = response;
                    this.courProgPercentage = addedcourseProgress.progress;

                  }
                )

              }


              else if ((this.existingCourseProg.courseId == courseId) && (this.existingCourseProg.studentId == this.studentId)) {
                let updatedcourseProgress: CourseProgress = new CourseProgress();
                console.log(" else if(this.existingCourseProg.courseId === courseId && this.existingCourseProg.studentId === this.studentId)")
                this.existingCourseProg.progress = (this.moduleProgArray.length * 100) / this.moduleArray.length;

                this.courseProgServ.updateCourseProgress(this.existingCourseProg).subscribe(
                  (response) => {
                    updatedcourseProgress = response;
                    this.courProgPercentage = updatedcourseProgress.progress;
                  }
                )

              }
            }
          }
        )
      }

    )
  }


  chkCoursePogress(courseId: number) {



    console.log(this.selectedCourse)
    try {
      this.courseProgServ.getCourseProgByCourseIdStudId(courseId, this.studentId).subscribe(
        (response) => {

          this.existingCourseProg = response;



        }
      )
    }
    catch (e) { }


  }
  // Filter the modules array based on selectedCourse
  getFilteredModules(): any[] {
    console.log("in module function data")
    console.log(this.modules);
    for (const i in this.modules) {
      if (this.modules[i].courseId_id === this.selectedCourse) {
        return this.modules
      }

    }
    // return this.modules.filter(module => module.courseId_id === this.selectedCourse);
    return [];
  }

  getAllFileProgress() {

    console.log("getAllFileProgress()")
    this.fileProgService.getAllFileProgressStatus().subscribe(
      (response) => {
        this.fileProgress = response

        console.log(this.studentId)
        console.log(this.fileProgress)
        this.filteredFileProg = this.fileProgress.filter(obj => obj.studentId == this.studentId && obj.progress == 100);
        this.filteredProgressFileIds = this.filteredFileProg.map(progress => progress.fileId);

        console.log(this.filteredFileProg)


        console.log(this.filteredProgressFileIds);

        // this.cdr.detectChanges();
      }


    )

  }

  private moduleProgresscCeateUpdate(moduleId: number) {
    console.log("Entered in moduleProgresscCeateUpdate()")
    let updatedModuleProgress: Moduleprogress = new Moduleprogress;
    let moduleArr: ModuleFile[] = [];
    let modFileProgress: Modulefileprogress[] = [];
    this.existingmoduleProgress(moduleId, this.selectedCourse);
    console.log(moduleId)
    this.getAllQuizzesByModuleId(moduleId);
    console.log(this.quizIdArr1);
    this.getAllQuizProgress(moduleId);
    console.log(this.quizIdArr2);

    // get data from modulefile table my module Id
    this.modulefileService.getModuleFilesByModuleId(moduleId).subscribe(
      (response) => {

        moduleArr = response;

        console.log("moduleArr.length inside " + moduleArr.length);
        this.moduleArrCopy = moduleArr;
        // this.getAllFileProgress();

        console.log("moduleArr.length outside " + this.moduleArrCopy.length);

        //get data from ModuleFileProgress table where progress is 100
        this.fileProgService.getAllFileProgressByModIdStudIdProg(moduleId, this.studentId).subscribe(
          (response) => {

            modFileProgress = response;

            console.log("modulebasedArr.length inside " + modFileProgress);
            this.modFileProgressCopy = modFileProgress;
            console.log("two lenghts outside " + this.moduleArrCopy.length + "     " + this.modFileProgressCopy.length);

            let arr1Len = this.quizIdArr1.length + this.moduleArrCopy.length;
            let arr2Len = this.quizIdArr2.length + this.modFileProgressCopy.length;

            console.log("this.quizIdArr2.length " + this.quizIdArr2.length + " this.modFileProgressCopy.length" + this.modFileProgressCopy.length)
            console.log(" arr2Len   " + arr2Len)
            console.log("this.quizIdArr1.length " + this.quizIdArr1.length + " this.moduleArrCopy.length" + this.moduleArrCopy.length)
            console.log(" arr1Len   " + arr1Len)

            // if ((this.modFileProgressCopy.length <= this.moduleArrCopy.length) && this.modFileProgressCopy.length != 0) {
            if ((arr2Len <= arr1Len) && arr2Len != 0) {


              this.modulePercentage = (arr2Len * 100) / (arr1Len);
              console.log("moduleArr.length == this.modulebasedArr.length")

              console.log(arr2Len + "       " + arr1Len)
              console.log("module Percentage" + "  " + this.modulePercentage)

              this.moduleProgress.moduleId = moduleId;
              console.log("this.selectedModule.moduleId   " + moduleId)
              this.moduleProgress.courseId = this.selectedCourse;
              this.moduleProgress.studentId = this.studentId;
              this.moduleProgress.progress = this.modulePercentage;

              //condition to check if moduleProgress entity array filtered by course includes current array
              console.log(this.unistatusModuleProgArr);
              // if ((this.statusModuleProg.moduleId == moduleId) && (this.statusModuleProg.studentId == this.studentId)) {

              // this.fileProgService.getModuleProgressByModIdStudId(moduleId, this.studentId).subscribe(
              //   (response) => {

              //     //ModuleProgress Entity
              //     updatedModuleProgress = response;
              console.log(this.updatedModuleProgress)
              if (this.updatedModuleProgress.moduleId == moduleId) {

                // if (this.unistatusModuleProgArr.includes(moduleId) == true){

                console.log(" if (this.unistatusModuleProgArr.includes(this.selectedModule.moduleId) == true)");

                this.updatedModuleProgress.progress = this.modulePercentage;

                console.log(" this.statusModuleProg.progress ")
                console.log(this.statusModuleProg)

                this.moduleProgSErv.updateModuleProgress(this.updatedModuleProgress).subscribe(
                  (response) => {

                    this.existingmoduleProgress(moduleId, this.selectedCourse);
                    console.log(this.updatedModuleProgress)
                  }

                )

              }

              else if (this.updatedModuleProgress.moduleId != moduleId) {
                //   else if (this.unistatusModuleProgArr.includes(moduleId) == false){
                console.log(" else if (this.unistatusModuleProgArr.includes(this.selectedModule.moduleId) == false) ")
                console.log(this.moduleProgress)

                //service to save data in module progress table
                this.moduleProgSErv.addModuleProgressStatus(this.moduleProgress).subscribe(
                  (reponse) => {
                    this.existingmoduleProgress(moduleId, this.selectedCourse);

                    // this.trackModuleProgress(this.selectedCourse);
                    // this.filterUniqueModuleIds()

                  }
                )

              }

            }

          }
        )

      }
    )

    // console.log(" this.trackCourseProgress() called")
    // this.trackCourseProgress(this.selectedCourse);


  }
  // private moduleProgresscCeateUpdate(moduleId:number) {
  //   console.log("Entered in moduleProgresscCeateUpdate()")

  //   let moduleArr: ModuleFile[] = [];
  //   let modFileProgress: Modulefileprogress[] = [];

  //   console.log(moduleId)
  //             this.getAllQuizzesByModuleId(moduleId);
  //             console.log(this.quizIdArr1);
  //             this.getAllQuizProgress(moduleId);
  //             console.log(this.quizIdArr2);

  //   // get data from modulefile table my module Id
  //   this.modulefileService.getModuleFilesByModuleId(moduleId).subscribe(
  //     (response) => {

  //       moduleArr = response;
  //       console.log("moduleArr.length inside " + moduleArr.length);
  //       this.moduleArrCopy = moduleArr;
  //       // this.getAllFileProgress();
  //   //   }
  //   // )
  //   console.log("moduleArr.length outside " + this.moduleArrCopy.length);

  //   //get data from ModuleFileProgress table where progress is 100
  //   this.fileProgService.getAllFileProgressByModIdStudIdProg(moduleId, this.studentId).subscribe(
  //     (response) => {

  //       modFileProgress = response;

  //       console.log("modulebasedArr.length inside " + modFileProgress);
  //       this.modFileProgressCopy = modFileProgress;
  //       console.log("two lenghts outside " + this.moduleArrCopy.length + "     " + this.modFileProgressCopy.length);

  //       let arr1Len = this.quizIdArr1.length + this.moduleArrCopy.length;
  //       let arr2Len = this.quizIdArr2.length + this.modFileProgressCopy.length;

  //       console.log("this.quizIdArr2.length " +this.quizIdArr2.length +" this.modFileProgressCopy.length"+ this.modFileProgressCopy.length)
  //       console.log(" arr2Len   "+  arr2Len)
  //       console.log("this.quizIdArr1.length " +this.quizIdArr1.length +" this.moduleArrCopy.length"+ this.moduleArrCopy.length)
  //       console.log(" arr1Len   "+  arr1Len)

  //       // if ((this.modFileProgressCopy.length <= this.moduleArrCopy.length) && this.modFileProgressCopy.length != 0) {
  //         if ((arr2Len <= arr1Len) && arr2Len != 0) {

  //         this.trackModuleProgress(this.selectedCourse);
  //         this.modulePercentage = (arr2Len * 100) / (arr1Len);
  //         console.log("moduleArr.length == this.modulebasedArr.length")

  //         console.log(arr2Len + "       " + arr1Len)
  //         console.log("module Percentage" + "  " + this.modulePercentage)

  //         this.moduleProgress.moduleId = moduleId;
  //         console.log("this.selectedModule.moduleId   " + moduleId)
  //         this.moduleProgress.courseId = this.selectedCourse;
  //         this.moduleProgress.studentId = this.studentId;
  //         this.moduleProgress.progress = this.modulePercentage;

  //         //condition to check if moduleProgress entity array filtered by course includes current array
  //         console.log(this.unistatusModuleProgArr);
  //         if (this.unistatusModuleProgArr.includes(moduleId) == true) {


  //           console.log(" if (this.unistatusModuleProgArr.includes(this.selectedModule.moduleId) == true)");
  //           this.statusModuleProg.progress = this.modulePercentage;

  //           console.log(" this.statusModuleProg.progress ")
  //           console.log(this.statusModuleProg)

  //           this.fileProgService.updateModuleProgress(this.statusModuleProg).subscribe(
  //             (response) => {

  //             }

  //           )

  //         }

  //         else if (this.unistatusModuleProgArr.includes(moduleId) == false) {

  //           console.log(" else if (this.unistatusModuleProgArr.includes(this.selectedModule.moduleId) == false) ")
  //           console.log(this.moduleProgress)

  //           //service to save data in module progress table
  //           this.fileProgService.addModuleProgressStatus(this.moduleProgress).subscribe(
  //             (reponse) => {

  //               // this.trackModuleProgress(this.selectedCourse);
  //               // this.filterUniqueModuleIds()

  //             }
  //           )

  //         }


  //       }

  //     }
  //   )
  //   })


  //   // console.log(" this.trackCourseProgress() called")
  //   // this.trackCourseProgress(this.selectedCourse);


  // }







  private getAllQuizzesByProfileId(studentId: number) {
    this.quizService.getAllQuizzesByProfileId(studentId).subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
      }
    )
  }

  //data from quiz table filtered by module id
  private getAllQuizzesByModuleId(moduleId: number) {
    let quizArr: Quiz[] = [];
    this.quizService.getAllQuizzesByModuleId(moduleId).subscribe(
      (data: Quiz[]) => {
        quizArr = data;

        // Map the quiz array to an array of quiz IDs
        this.quizIdArr1 = quizArr.map(quiz => quiz.quizId);

      }
    )
  }

  // all data from quizprogress table
  private getAllQuizProgress(moduleId: number) {

    let quizprogress: QuizProgress[] = [];
    let filteredQuizProgressId: number[] = [];
    let completedQuizProgressId: number[] = [];


    this.quizProgServ.getAllQuizProgressdata().subscribe(
      (response) => {
        quizprogress = response.filter((prog) => prog.studentId == this.studentId && prog.completed == true);
        // Extract quiz IDs from filtered quiz progress array'

        filteredQuizProgressId = quizprogress.map((prog) => prog.quizId);
        console.log(response)
        console.log(quizprogress)
        console.log(filteredQuizProgressId)

        console.log(this.quizIdArr1)
        this.quizIdArr2 = filteredQuizProgressId.filter(element => this.quizIdArr1.includes(element));
        console.log(this.quizIdArr2)
      }
    )


  }
  onQuizProgressAdded(addeedQuizProgress: any) {
    console.log(addeedQuizProgress);
    let quizArr: Quiz[] = [];
    let filteredQuizArr: Quiz[] = [];
    let moduleIdArr: number[] = [];
    this.quizService.getAllQuizzes().subscribe(
      (data: Quiz[]) => {
        quizArr = data;
        filteredQuizArr = quizArr.filter((array) => array.quizId == addeedQuizProgress.quizId)

        // Map the quiz array to an array of quiz IDs
        moduleIdArr = filteredQuizArr.map(quiz => quiz.moduleId);

        console.log(moduleIdArr[0])


        console.log(moduleIdArr[0])
        // handle the emitted value here
        if (addeedQuizProgress.completed == true) {
          this.moduleProgresscCeateUpdate(moduleIdArr[0]);
        }
      }
    )
  }

  onQuizClicked(quiz: Quiz) {
    this.selectedFile = '';
    this.selectedQuiz = quiz;
  }


  getQuizPorgressesByStudentId(studentId: number) {
    this.quizProgServ.getQuizProgressesByStudentId(studentId).subscribe(
      (data) => {
        data.forEach(quiz => {
          if (quiz.completed == true) {
            this.quizPassedProgresses.push(quiz.quizId);
          } else {
            this.quizFailedProgresses.push(quiz.quizId);
          }

        })
        console.log(this.quizPassedProgresses);
        console.log(this.quizFailedProgresses);


      },
      (error) => {
        console.log("failed to fetch progress data");

      }
    )
  }

  onSaveQuizProgress(quizProgress: any) {
    this.quizPassedProgresses = this.removeElementFromStringArray(this.quizPassedProgresses, quizProgress.quizId)
    this.quizFailedProgresses = this.removeElementFromStringArray(this.quizFailedProgresses, quizProgress.quizId)
    if (quizProgress.completed == true) {
      this.quizPassedProgresses.push(quizProgress.quizId);
    } else {
      this.quizFailedProgresses.push(quizProgress.quizId);
    }
    console.log(this.quizPassedProgresses);
    console.log(this.quizFailedProgresses);
    this.sortAccessibleModules();
  }

  removeElementFromStringArray(array: any[], element: any) {
    array.forEach((value, index) => {
      if (value == element) array.splice(index, 1);
    });
    return array;
  }

  private sortAccessibleModules() {

    let studentModules: Module[];
    this.moduleService.getModulesByCourseId(this.selectedCourse).subscribe(
      (data) => {
        studentModules = data;
        // let numberOfModules = studentModules.length;
        // let maxModuleOrderNo = studentModules[studentModules.length - 1].moduleOrderNo;
        let studentModuleProgress: Moduleprogress[] = [];
        this.moduleProgSErv.getModuleProgressesByCourseIdAndStudentId(this.selectedCourse, this.studentId).subscribe(
          (response) => {
            response.forEach(moduleProgress => {
              // console.log(response);

              const foundedModule = studentModules.find(module => module.moduleId == moduleProgress.moduleId);
              // console.log(foundedModule);
              if (foundedModule) {
                this.accessibleModuleIds.add(foundedModule.moduleId);
                studentModuleProgress.push(moduleProgress);
              }

            })

            if (studentModuleProgress.length <= 0) {
              this.accessibleModuleIds.add(studentModules[0].moduleId);
              console.log(this.accessibleModuleIds);

            } else {
              let lastModuleProgress = studentModuleProgress[studentModuleProgress.length - 1];
              // this.accessibleModuleIds.push(lastModuleProgress.moduleId);
              // let moduleOrderNo = lastModuleProgress.moduleOrderNo;
              let indexOfLastModuleProgress = studentModuleProgress.length - 1;

              if (lastModuleProgress.progress == 100) {
                // if (maxModuleOrderNo >= moduleOrderNo + 1) {
                this.accessibleModuleIds.add(studentModules[indexOfLastModuleProgress + 1].moduleId);
                // }

              }

            }
          }

        );
      }
    );

  }

  onSavePDFProgress(progressData: any) {
    const progressedPageNumber = progressData.progressedPageNumber;
    const totalNumPages = progressData.totalNumPages;
    // console.log(progressData);

    let pdfProgressInPercentage = (100 / totalNumPages) * progressedPageNumber;
    pdfProgressInPercentage = Math.floor(pdfProgressInPercentage);
    // console.log(this.selectedFile);
    // console.log(this.studentId);
    const moduleFileProgress: Modulefileprogress = {
      id: 0,
      progress: pdfProgressInPercentage,
      currentFilePageNo: progressedPageNumber,
      fileId: this.selectedFile.moduleFileId,
      moduleId: this.selectedFile.moduleId,
      studentId: this.studentId
    };

    this.fileProgService.updateModuleFileProgressByFileIdAndStudentId(this.selectedFile.moduleFileId, this.studentId, moduleFileProgress).subscribe(
      (response) => {
        // console.log("pdf progress saved : " + response);
        if (pdfProgressInPercentage == 100) {
          console.log("Completed");
          this.filteredProgressFileIds.push(response.fileId);
          this.sortAccessibleModules();

          this.moduleProgresscCeateUpdate(this.selectedModule.moduleId);
        }
      }
    )



  }

}

function ngOnInit() {
  throw new Error('Function not implemented.');
}



