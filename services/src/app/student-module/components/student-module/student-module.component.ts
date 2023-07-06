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
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { OneQuestionAnswer } from 'app/question/class/one-question-answer';
import { StudentAnswer } from 'app/student-module/class/student-answer';


@Component({
  selector: 'app-student-module',
  templateUrl: './student-module.component.html',
  styleUrls: ['./student-module.component.css']
})
export class StudentModuleComponent implements OnInit {

  // ------------------------VARIABLE DECLARATION START------------------------------
  @ViewChild('videoPlayer', { static: false })
  videoPlayerRef!: ElementRef<HTMLVideoElement>;

  @ViewChild(StudentQuizComponent, { static: false })
  private studentQuizComponent!: StudentQuizComponent;

  @ViewChild('cd', { static: false })
  cd!: CountdownComponent;

  studentId: any;
  userName: any;
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
  selectedQuizProgress: QuizProgress;
  moduleFileProgress: Modulefileprogress = new Modulefileprogress;// Object of ModuleFileProgress
  moduleFileProgressArr: Modulefileprogress[] = [];// Array of Object of ModuleFileProgress
  updatedModuleFileProgressArr: Modulefileprogress[] = [];// Array of Object of ModuleFileProgress

  quizzes: Quiz[] = [];

  newModuleFileProgressArr: Modulefileprogress[] = [];// Array of Object of ModuleFileProgress
  uniquemofileprogarr: Modulefileprogress[] = [];
  selectedCourse!: Course;
  selectedCourseId: any; //stores the selected course by the student. 
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

  moduleFileIdsForCour: any[] = [];

  quizIdsForCour: number[] = [];

  selectedQuizName: string = '';
  completedFileIds: number[] = [];
  completedQuizids: number[] = [];
  accessibleModuleIds = new Set();    // module ids which are accessible to student
  flag: boolean = false;
  secondflag!: boolean;
  completionPercentage: number = 0;
  moduleFileArr: ModuleFile[] = [];
  modFileArrLen!: number;
  currentTime!: number;
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

  score = 0;
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
  quizProgressOfStudent: QuizProgress[] = [];
  modulePercentage: number = 0;
  quizIdArr1: number[] = [];
  quizIdArr2: number[] = [];
  quizPassedProgresses: any[] = [];
  quizFailedProgresses: any[] = [];
  couIdArrInCouProg: number[] = [];
  existingCourseProg: CourseProgress = new CourseProgress();
  courProgPercentage: number = 0;
  modFilesArray: ModuleFile[] = [];

  moduleProgArray: Moduleprogress[] = [];

  quizProgress!: QuizProgress;  // quizProgress object used to save progress in table
  questionAnswers: OneQuestionAnswer[] = [];    // array of question and answers
  addeedQuizProgress: QuizProgress = new QuizProgress();; //to store quizprogress data
  submitted: boolean = false;

  studentAnswer: StudentAnswer = new StudentAnswer();  // for storing student answers
  studentAnswers: StudentAnswer[] = [];

  // ------------------------VARIABLE DECLARATION END------------------------------

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
    private cdr: ChangeDetectorRef, private dialogboxService: DialogBoxService,
    private courseProgServ: CourseProgressService,
  ) {
    this.selectedQuizProgress = new QuizProgress();
    this.selectedQuiz = new Quiz();
    this.selectedCourse = new Course();
  }








  ngOnInit(): void {
    // this.videoPlayer;



    this.studentId = this.activateRoute.snapshot.paramMap.get('id');
    this.userName = this.activateRoute.snapshot.params['userName'];
    this.loadCourseOfStudent(this.studentId);


    this.selectedCourseId = '1'



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
        this.selectedCourse = this.courses[0];
        this.selectedCourseName = this.courses[0].courseName;
        this.selectedCourseId = this.courses[0].courseId;

        // console.log(this.selectedCourseId)

        try {
          this.couresFlag = false;
          //FUNCTION TO TRACK MODULE PROGRESS
          this.trackModuleProgress(this.selectedCourseId)
          //FUNCTION TO TRACK COURSE PROGRESS
          this.trackCourseProgress(this.selectedCourseId)

          // console.log(this.selectedCourseId)
          this.chkCoursePogress(this.selectedCourseId)


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
    console.log(this.selectedCourseId);


  }

  //triggers when video is played
  onVideoTimeUpdate() {

    //initialize flag to false
    this.flag = false


    //video element from html
    const videoElement: HTMLVideoElement = this.videoPlayerRef.nativeElement;
    const videoDuration = videoElement.duration;
    this.currentTime = videoElement.currentTime;


    let percentage = (this.currentTime / videoDuration) * 100;

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

          // console.log("this.moduleFileProgress outside")
          // console.log(this.moduleFileProgress)
          //if flag is true
          if (this.flag == true) {




            if (this.moduleFileProgress.progress == 100) {
              console.log("Enered in  this.moduleFileProgress.progress == 10")
              this.moduleProgresscCeateUpdate(this.selectedModule.moduleId);
              //FUNCTION TO TRACK COURSE PROGRESS
              this.trackCourseProgress(this.selectedCourseId)
              // console.log(this.selectedModule)

            }

            //cond. to update moduleprogress table
            else if ((this.moduleFileProgress.progress < 100 || this.completionPercentage == 100) && (this.completionPercentage > this.moduleFileProgress.progress)) {


              console.log(" else if ((this.moduleFileProgress.progress < 100 || this.completionPercentage == 100) && (this.completionPercentage > this.moduleFileProgress.progress))");
              let modFileProg: Modulefileprogress = new Modulefileprogress();

              this.moduleFileProgress.progress = this.completionPercentage;

              this.moduleFileProgress.currentFilePageNo = this.videoPlayerRef.nativeElement.currentTime;
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
                    //FUNCTION TO TRACK COURSE PROGRESS
                    this.trackCourseProgress(this.selectedCourseId)

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
        this.moduleFileProgress.currentFilePageNo = this.videoPlayerRef.nativeElement.currentTime;
        this.moduleFileProgress.moduleId = this.selectedModule.moduleId;
        this.moduleFileProgress.fileId = this.selectedFile.moduleFileId;
        this.moduleFileProgress.studentId = this.studentId;
        this.moduleFileProgress.courseId = this.selectedCourseId;
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
  selectedFileProgress!: Modulefileprogress;

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
          this.videoPlayerRef.nativeElement.src = this.selectedFileData;

          if (this.selectedFileProgress != undefined) {
            this.videoPlayerRef.nativeElement.currentTime = this.selectedFileProgress.currentFilePageNo;
          }
        }
        console.log(this.selectedFileData);
      }
    );
  }

  //triggers when video is pause
  pauseVideo() {
    this.updateVideoProgress();
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



  // async getModFilesByModuleId(moduleId: number) {
  //   this.modFilesArray = [];
  //   await this.modFileServc.getModuleFilesByModuleId(moduleId).toPromise().then(
  //     (response) => {
  //       if (response) {
  //         this.modFilesArray = response.filter((elem) => elem.moduleFileIsActive == true)
  //       }
  //     }
  //   )
  //     .catch((error) => { console.log(error) })
  // }

  private async getModFilesByModuleId(moduleId: number) {
    this.modFilesArray = [];
    try {
      const data = await this.modFileServc.getModuleFilesByModuleId(moduleId).toPromise();
      console.log(data);
      if (data != undefined) {
        this.modFilesArray = data;
      }

    } catch (error) {
      console.log("no data fetched");
    }
  }


  //Loads the modules of the courses using the getModuleByCourseId() method of StudentService
  async loadModuleOfCourse(studentCourses: Course[]) {

    let filteredModules: Module[] = [];
    studentCourses.forEach(async course => {

      const modules: any = await this.moduleService.getModuleByCourseId(course.courseId).toPromise();
      // .subscribe(
      // response => {
      //   console.log(response)
      if (modules != undefined) {
        for (const module of await modules) {
          // modules.forEach(async module => {

          await this.getModFilesByModuleId(module.moduleId);

          if (this.modFilesArray.length != 0) {
            console.log(module);

            this.modules.push(module);
            console.log(module)
            console.log(this.selectedCourseId)
            if (this.selectedCourseId == module.courseId_id) {
              this.selectedModule = module;

              console.log("inside loadModuleOfCourse")
              console.log(module)
            }
          }
          this.loadModuleFilesOfCourses(this.studentId);
        }
      }


      // }



      // },
      //   error => {
      //     console.log(error);
      //   }
      // );
    })

  }

  //loads the module files assigned to the student using the getModuleFilesByStudentId() method of StudentService
  loadModuleFilesOfCourses(studentId: number) {
    this.modulefileService.getModuleFilesOfEnrolledCoursesOfModulesByProfileId(studentId).subscribe(
      response => {
        this.studentModuleFiles = response;

        this.studentModuleFiles = this.studentModuleFiles.filter((elem) => elem.moduleFileIsActive == true)
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
    this.moduleFileService.getModuleFilesOfEnrolledCoursesOfModulesByProfileId(studentId).subscribe(
      response => {
        console.log(response);
      }
    )
  }



  //sets the selected course by the student and resets the selected module
  onCourseSelect(courseId: any) {
    this.selectedCourse = this.courses.find(course => course.courseId == courseId) ?? {} as Course;
    console.log(JSON.stringify(this.selectedCourse));

    // this.selectedCourse = this.courses.find(course => course.courseId == courseId);
    // for store progress when user switch course
    if (this.currentTime > 0) {
      this.updateVideoProgress();
      this.videoPlayerRef.nativeElement.src = '';
      this.videoPlayerRef.nativeElement.currentTime = 0;
      this.selectedFileProgress = {} as Modulefileprogress;
    }
    this.currentTime = 0;

    // to clear screen
    this.selectedFile = false;
    this.selectedQuiz = {} as Quiz;
    this.selectedQuizName = '';

    this.showalert = false;

    this.courProgPercentage = 0;
    this.changeSelectedCourseName(courseId);

    this.selectedCourseId = courseId;

    this.selectedModule = undefined;
    //FUNCTION TO TRACK COURSE PROGRESS
    this.trackCourseProgress(courseId)
    // console.log(this.selectedCourseId);
    // console.log(this.selectedModule);

    console.log("   this.courProgPercentage  in onCourseSelect" + this.courProgPercentage)

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

    // for store progress when user change module file
    if (this.currentTime > 0) {
      this.updateVideoProgress();
      this.videoPlayerRef.nativeElement.src = '';
      this.videoPlayerRef.nativeElement.currentTime = 0;
      this.selectedFileProgress = {} as Modulefileprogress;
    }
    this.currentTime = 0;

    let modulefileId: any;

    this.cd.stop();
    this.selectedQuizName = ''
    this.selectedQuiz = {} as Quiz;
    this.selectedFile = [];
    this.selectedFile = file;
    this.selectedModule = module;
    this.quizzes.filter(quiz => quiz.moduleId == module.moduleId)

    this.fileProgService.getFileProgressByFileIdAndStudentId(this.selectedFile.moduleFileId, this.studentId).subscribe(
      (response) => {
        console.log(response);
        this.selectedFileProgress = response;
      }
    );

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
    this.moduleService.getModuleByCourseId(courseId).subscribe(
      response => {
        console.log("Inside getModuleByCourseId(moduleId)")
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
                    // this.trackCourseProgress(this.selectedCourseId)
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
          // this.trackCourseProgress(courseId)
        }
        this.sortAccessibleModules();
      })
  }

  filterUniqueModuleIds() {
    // Filter and store unique values in unistatusModuleProgArr
    this.unistatusModuleProgArr = this.statusModuleProgArr.filter((value, index, self) => self.indexOf(value) === index);
    console.log(this.unistatusModuleProgArr);
  }



  async trackCourseProgress(courseId: number) {

    let moduleArray: Module[] = [];
    let moduleProgArray: Moduleprogress[] = [];

    console.log(courseId)
    await this.totalFilesAndQuizzesInCourse(courseId)
    await this.actualModFileAndQuizCompleted(this.studentId, courseId)
    await this.chkCoursePogress(courseId);

    console.log("this.existingCourseProg")
    console.log(this.existingCourseProg)
    if (this.existingCourseProg.courseId != courseId) {
      let addedcourseProgress: CourseProgress = new CourseProgress();
      console.log("if(this.existingCourseProg.courseId != courseId && this.existingCourseProg.studentId != this.studentId)")

      this.courseProgress.id = 0;
      this.courseProgress.courseId = this.selectedCourseId;
      this.courseProgress.studentId = this.studentId;
      this.courseProgress.currentAssignNo = 1;
      this.courseProgress.currentModuleNo = 1;
      this.courseProgress.currentUnitNo = 1;
      this.courseProgress.grade = 0;

      this.courseProgress.progress = ((this.completedFileIds.length + this.completedQuizids.length) * 100) / (this.moduleFileIdsForCour.length + this.quizIdsForCour.length);
      this.courseProgServ.addCourseProgressStatus(this.courseProgress).subscribe(
        (response) => {

          addedcourseProgress = response;
          this.courProgPercentage = addedcourseProgress.progress;
          console.log("   this.courProgPercentage  in add  " + this.courProgPercentage)

        }
      )

    }


    else if ((this.existingCourseProg.courseId == courseId) && (this.existingCourseProg.studentId == this.studentId)) {
      let updatedcourseProgress: CourseProgress = new CourseProgress();
      console.log(" else if(this.existingCourseProg.courseId === courseId && this.existingCourseProg.studentId === this.studentId)")
      this.existingCourseProg.progress = ((this.completedFileIds.length + this.completedQuizids.length) * 100) / (this.moduleFileIdsForCour.length + this.quizIdsForCour.length);

      this.courseProgServ.updateCourseProgress(this.existingCourseProg).subscribe(
        (response) => {
          updatedcourseProgress = response;
          this.courProgPercentage = updatedcourseProgress.progress;


          console.log("   this.courProgPercentage  in update " + this.courProgPercentage)

        }
      )


    }

    // this.moduleService.getModulesByCourseId(courseId).subscribe(
    //   (response) => {

    //     moduleArray = response;

    //     console.log(response)
    //     this.moduleArray = moduleArray;



    //     this.moduleProgSErv.getModuleProgByCourseId(courseId).subscribe(
    //       (response) => {
    //         console.log(this.selectedCourseId)
    //         moduleProgArray = response;

    //         this.moduleProgArray = moduleProgArray.filter((array) => array.studentId == this.studentId && array.progress == 100)
    //         console.log(response)



    //         console.log("moduleProgArray.length " + this.moduleProgArray.length + "moduleProgArray.length " + this.moduleArray.length)
    //         if ((this.moduleProgArray.length <= this.moduleArray.length) && this.moduleProgArray.length != 0) {

    //           console.log(this.existingCourseProg)
    //           console.log("if ((this.moduleProgArray.length <= this.moduleArray.length) &&  this.moduleProgArray.length != 0)")

    //           console.log(this.existingCourseProg)
    //           if (this.existingCourseProg.courseId != courseId) {
    //             let addedcourseProgress: CourseProgress = new CourseProgress();
    //             console.log("if(this.existingCourseProg.courseId != courseId && this.existingCourseProg.studentId != this.studentId)")

    //             this.courseProgress.id = 0;
    //             this.courseProgress.courseId = this.selectedCourseId;
    //             this.courseProgress.studentId = this.studentId;
    //             this.courseProgress.currentAssignNo = 1;
    //             this.courseProgress.currentModuleNo = 1;
    //             this.courseProgress.currentUnitNo = 1;
    //             this.courseProgress.grade = 0;
    //             this.courseProgress.progress = (this.moduleProgArray.length * 100) / this.moduleArray.length;
    //             this.courseProgServ.addCourseProgressStatus(this.courseProgress).subscribe(
    //               (response) => {

    //                 addedcourseProgress = response;
    //                 this.courProgPercentage = addedcourseProgress.progress;

    //               }
    //             )

    //           }


    //           else if ((this.existingCourseProg.courseId == courseId) && (this.existingCourseProg.studentId == this.studentId)) {
    //             let updatedcourseProgress: CourseProgress = new CourseProgress();
    //             console.log(" else if(this.existingCourseProg.courseId === courseId && this.existingCourseProg.studentId === this.studentId)")
    //             this.existingCourseProg.progress = (this.moduleProgArray.length * 100) / this.moduleArray.length;

    //             this.courseProgServ.updateCourseProgress(this.existingCourseProg).subscribe(
    //               (response) => {
    //                 updatedcourseProgress = response;
    //                 this.courProgPercentage = updatedcourseProgress.progress;
    //               }
    //             )

    //           }
    //         }
    //       }
    //     )
    //   }

    // )
  }




  chkCoursePogress(courseId: number) {



    console.log(courseId)
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
      if (this.modules[i].courseId_id === this.selectedCourseId) {
        return this.modules
      }

    }
    // return this.modules.filter(module => module.courseId_id === this.selectedCourseId);
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
    this.existingmoduleProgress(moduleId, this.selectedCourseId);
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
              this.moduleProgress.courseId = this.selectedCourseId;
              this.moduleProgress.studentId = this.studentId;
              this.moduleProgress.progress = this.modulePercentage;

              //condition to check if moduleProgress entity array filtered by course includes current array
              console.log(this.unistatusModuleProgArr);



              console.log(this.updatedModuleProgress)
              if (this.updatedModuleProgress.moduleId == moduleId) {



                console.log(" if (this.unistatusModuleProgArr.includes(this.selectedModule.moduleId) == true)");

                this.updatedModuleProgress.progress = this.modulePercentage;

                console.log(" this.statusModuleProg.progress ")
                console.log(this.statusModuleProg)

                this.moduleProgSErv.updateModuleProgress(this.updatedModuleProgress).subscribe(
                  (response) => {

                    this.existingmoduleProgress(moduleId, this.selectedCourseId);
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
                    this.existingmoduleProgress(moduleId, this.selectedCourseId);

                    // this.trackModuleProgress(this.selectedCourseId);
                    // this.filterUniqueModuleIds()

                  }
                )

              }

            }

          }
        )

      }
    )



  }




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
          //FUNCTION TO TRACK COURSE PROGRESS
          this.trackCourseProgress(this.selectedCourseId)
        }
      }
    )
  }

  showalert: boolean = false;

  showAlert(): void {
    //console.log(this.showalert);
    if (this.showalert) {
      //  alert("sorry! you cant able to attend quiz again");
      this.dialogboxService.open('sorry! you can`t able to attend quiz again', 'warning');
    }
    this.showalert = false;
    // stop timer
    this.cd.stop();
  }

  onScoreReceived(score: number) {
    this.score = score;
    console.log('Received score: ' + score);
    console.log('Current score: ' + this.score);
  }

  onQuizClicked(quiz: Quiz, retake: boolean = false) {
    this.cd.stop();
    // if clicked on retake quiz option
    if (retake) {
      // alert()
      this.isRetakingQuiz = true;
      this.retakingQuiz++;
      this.cd.restart();
    } else {
      this.onQuizClick++;
      this.isRetakingQuiz = false;
      if (!(this.quizFailedProgresses.includes(quiz.quizId) || this.quizPassedProgresses.includes(quiz.quizId))) {
        this.cd.restart();
      }
    }

    // initialise values to blank
    this.selectedFile = '';
    this.selectedQuiz = {} as Quiz;
    this.selectedQuizName = '';

    // for store progress when user switch from file to quiz
    // updating video progress
    if (this.currentTime > 0) {
      this.updateVideoProgress();
      this.videoPlayerRef.nativeElement.src = '';
      this.videoPlayerRef.nativeElement.currentTime = 0;
      this.selectedFileProgress = {} as Modulefileprogress;
    }
    this.currentTime = 0;

    this.showalert = true;
    console.log(this.showalert);

    // this.selectedFile = '';
    this.selectedQuiz = quiz;
    this.selectedQuizName = quiz.title;
    console.log(this.quizProgressOfStudent);

    // // Find the corresponding progress in quizProgressOfStudent array
    // const progress = this.quizProgressOfStudent.find(qp => qp.quizId === quiz.quizId);
    // if (progress) {
    //   this.selectedQuizProgress = progress;
    // } else {

    //   this.selectedQuizProgress = {
    //     id: 0,
    //     numberOfAttempts: 0,
    //     completed: false,
    //     studentId: this.studentId,
    //     quizId: quiz.quizId,
    //     score: 0,
    //     // Include any other properties from QuizProgress
    //   };
    // }
    this.findProgressOfSelectedQuiz(quiz);
    this.submitted = false;

  }


  findProgressOfSelectedQuiz(quiz: Quiz) {
    // Find the corresponding progress in quizProgressOfStudent array
    const progress = this.quizProgressOfStudent.find(qp => qp.quizId === quiz.quizId);
    if (progress) {
      this.selectedQuizProgress = progress;
    } else {

      this.selectedQuizProgress = {
        id: 0,
        numberOfAttempts: 0,
        completed: false,
        studentId: this.studentId,
        quizId: quiz.quizId,
        score: 0,
        // Include any other properties from QuizProgress
      };
    }
  }


  getQuizPorgressesByStudentId(studentId: number) {
    this.quizProgServ.getQuizProgressesByStudentId(studentId).subscribe(
      (data) => {
        this.quizProgressOfStudent = data;
        data.forEach(quiz => {
          if (quiz.completed == true) {
            this.quizPassedProgresses.push(quiz.quizId);
          } else {
            this.quizFailedProgresses.push(quiz.quizId);
          }

        })
      },
      (error) => {
        console.log("failed to fetch progress data");

      }
    )
  }

  onSaveQuizProgress(quizProgress: any) {
    console.log(quizProgress);

    this.quizPassedProgresses = this.removeElementFromStringArray(this.quizPassedProgresses, quizProgress.quizId)
    this.quizFailedProgresses = this.removeElementFromStringArray(this.quizFailedProgresses, quizProgress.quizId)
    console.log(this.quizProgressOfStudent);

    this.quizProgressOfStudent = this.removeElementFromArray(this.quizProgressOfStudent, quizProgress.id);
    console.log(this.quizProgressOfStudent);

    if (quizProgress.completed == true) {
      this.quizPassedProgresses.push(quizProgress.quizId);
    } else {
      this.quizFailedProgresses.push(quizProgress.quizId);
    }
    this.quizProgressOfStudent.push(quizProgress);
    console.log(this.quizProgressOfStudent);

    console.log(this.quizPassedProgresses);
    console.log(this.quizFailedProgresses);
    this.sortAccessibleModules();
    this.findProgressOfSelectedQuiz(this.selectedQuiz);
  }

  removeElementFromStringArray(array: any[], element: any) {
    array.forEach((value, index) => {
      if (value == element) array.splice(index, 1);
    });
    return array;
  }

  private removeElementFromArray(arrayToFilter: any[], idToRemove: number): QuizProgress[] {
    const index = arrayToFilter.findIndex(obj => obj.id === idToRemove);

    if (index !== -1) {
      arrayToFilter.splice(index, 1);
    }

    return arrayToFilter;
  }

  private sortAccessibleModules() {

    let studentModules: Module[];
    this.moduleService.getModulesByCourseId(this.selectedCourseId).subscribe(
      (data) => {
        studentModules = data;
        // let numberOfModules = studentModules.length;
        // let maxModuleOrderNo = studentModules[studentModules.length - 1].moduleOrderNo;
        let studentModuleProgress: Moduleprogress[] = [];
        this.moduleProgSErv.getModuleProgressesByCourseIdAndStudentId(this.selectedCourseId, this.studentId).subscribe(
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

  //function to get total count of module files and quiz files belonging to specific courseId
  async totalFilesAndQuizzesInCourse(courseId: number) {
    //variable declarations
    let modulesForCourId: Module[] = [];
    let moduleIds: number[] = [];
    let moduleFilesForCourId: ModuleFile[] = [];
    let quizForCourId: Quiz[] = [];
    let filteredQuizForCourId: Quiz[] = [];
    this.moduleFileIdsForCour = [];
    this.quizIdsForCour = [];

    // Code to get module ids based on course id
    await this.moduleService.getModulesByCourseId(courseId).toPromise()
      .then((response) => {
        modulesForCourId = response;
        modulesForCourId = modulesForCourId.filter((elem) => elem.moduleIsActive == true)
        moduleIds = modulesForCourId.map((elem) => elem.moduleId)

      })
      .catch((error) => {
        console.error('Error fetching modules:', error);
      });


    // console.log('moduleIds');
    // console.log(moduleIds);

    // Code to get file id based on module id's array
    for (let j of moduleIds) {
      try {
        const response = await this.moduleFileService.getModuleFilesByModuleId(j).toPromise();
        // console.log('moduleIds in for loop');
        // console.log(moduleIds);
        if (response) {
          moduleFilesForCourId = response;
          moduleFilesForCourId = moduleFilesForCourId.filter((elem) => elem.moduleFileIsActive == true)
          for (let i of moduleFilesForCourId) {
            if (!this.moduleFileIdsForCour.includes(i.moduleFileId)) {
              this.moduleFileIdsForCour.push(i.moduleFileId);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching module files:', error);
      }
    }

    // Code to get quiz ids based on course id
    this.quizService.getAllQuizzes().subscribe(
      (response) => {
        quizForCourId = response;
        filteredQuizForCourId = quizForCourId.filter((quiz) => (quiz.courseId == courseId) && (quiz.active == true));
        this.quizIdsForCour = filteredQuizForCourId.map((elem) => elem.quizId)
        // for (let i in quizForCourId) {
        //   this.quizIdsForCour.push(filteredQuizForCourId[i].quizId);
        // }
      }
    );

    // console.log('Module id and quiz ids array');
    // console.log(this.moduleFileIdsForCour);
    // console.log(this.quizIdsForCour);

  }


  //funct to get count of files and quizzes belonging to particular course id with progress 100
  async actualModFileAndQuizCompleted(studentId: number, courseId: number) {
    //variable declaration
    let modFileProgress: Modulefileprogress[] = [];
    let filteredModFileProgress: Modulefileprogress[] = [];
    let filteredModFileProgressIds: number[] = [];
    let quizProgress: QuizProgress[] = [];
    let filteredQuizProgress: QuizProgress[] = [];
    let filteredQuizProgressQuizIds: number[] = [];
    this.completedFileIds = [];
    this.completedQuizids = [];

    // console.log(this.moduleFileIdsForCour);
    await this.totalFilesAndQuizzesInCourse(courseId);

    //function to get array of moduke files completed progress 100
    await this.fileProgService.getAllFileProgressStatus().toPromise().then((response) => {
      if (response) {
        modFileProgress = response;
        // console.log(modFileProgress)
        // console.log(studentId + "    " + courseId)
        filteredModFileProgress = modFileProgress.filter((element) => (element.studentId == studentId) && (element.courseId == courseId) && (element.progress == 100));
        filteredModFileProgressIds = filteredModFileProgress.map((elem) => elem.fileId)

        // console.log(filteredModFileProgress)
        // console.log(this.moduleFileIdsForCour)
        // console.log(filteredModFileProgressIds)
        for (let fileId of this.moduleFileIdsForCour) {

          // console.log("  for (let j in this.moduleFileIdsForCour) {")
          if ((filteredModFileProgressIds.includes(fileId)) && (!this.completedFileIds.includes(fileId))) {
            // console.log(fileId)
            this.completedFileIds.push(fileId)
          }

        }
        // console.log(this.completedFileIds)
        // console.log()
      }


    })

    //CODE TO GET ARRAY OF QUIZZES WITH 100% PROGRESS BELONGING TO PARTICULAR COURSE
    const data = await this.quizProgServ.getQuizProgressesByStudentId(studentId).toPromise();

    if (data) {
      quizProgress = data;
      filteredQuizProgress = quizProgress.filter((elem) => elem.completed == true)
      filteredQuizProgressQuizIds = filteredQuizProgress.map((elem) => elem.quizId)
      // console.log("filteredModFileProgressIds")
      // console.log(filteredQuizProgressQuizIds)
      // console.log(this.quizIdsForCour)
      // console.log(this.quizIdsForCour)
      for (let quizId of this.quizIdsForCour) {

        // console.log("Entered in for loop")
        // console.log(this.quizIdsForCour)
        if ((filteredQuizProgressQuizIds.includes(quizId)) && (!this.completedQuizids.includes(quizId))) {
          // console.log("entered in if loop")
          this.completedQuizids.push(quizId)
        }
      }




    }


    // console.log("complted file ids and quiz ids")
    // console.log(this.completedFileIds)
    // console.log(this.completedQuizids)


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
      studentId: this.studentId,
      courseId: this.selectedCourseId
    };

    this.fileProgService.updateModuleFileProgressByFileIdAndStudentId(this.selectedFile.moduleFileId, this.studentId, moduleFileProgress).subscribe(
      (response) => {
        // console.log("pdf progress saved : " + response);
        if (pdfProgressInPercentage == 100) {
          // console.log("Completed");
          this.filteredProgressFileIds.push(response.fileId);
          this.sortAccessibleModules();
          //FUNCTION TO UPDATE MODULE PROGRESS ON QUIZ PROGRESS REACHED 100%
          this.moduleProgresscCeateUpdate(this.selectedModule.moduleId);
          //FUNCTION TO UPDATE COURSE PROGRESS ON QUIZ PROGRESS REACHED 100%
          this.trackCourseProgress(this.selectedCourseId)
        }
      }
    )
  }

  updateVideoProgress() {
    this.moduleFileProgress.id = 0;
    this.moduleFileProgress.currentFilePageNo = this.videoPlayerRef.nativeElement.currentTime;
    this.moduleFileProgress.moduleId = this.selectedModule.moduleId;
    this.moduleFileProgress.fileId = this.selectedFile.moduleFileId;
    this.moduleFileProgress.studentId = this.studentId;
    this.moduleFileProgress.courseId = this.selectedCourseId;
    this.moduleFileProgress.progress = this.completionPercentage;
    console.log(this.moduleFileProgress);

    this.fileProgService.updateModuleFileProgressByFileIdAndStudentId(this.selectedFile.moduleFileId, this.studentId, this.moduleFileProgress).subscribe(
      response => {
        console.log(response);
        console.log("updated progress after paused")
      }
    )
  }

  onQuizSubmit(questionAnswersArray: OneQuestionAnswer[]) {

    this.questionAnswers = questionAnswersArray;
    this.quizProgress = new QuizProgress();

    console.log(this.questionAnswers);
    console.log(this.selectedQuiz);


    let notAttendedQuestions: any[] = [];
    let score: number = 0;
    const marksPerQuestion: number = 100 / (this.questionAnswers.length);

    this.questionAnswers.forEach((queAns, index) => {


      // finding correct answer for current question in loop
      let trueAnswer: string = '';
      if (queAns.correct1) {
        trueAnswer = queAns.content1;
      } else if (queAns.correct2) {
        trueAnswer = queAns.content2;
      } else if (queAns.correct3) {
        trueAnswer = queAns.content3;
      } else if (queAns.correct4) {
        trueAnswer = queAns.content4;
      }

      // checking that user attended the question or not
      if (queAns.selectedAnswer == undefined || queAns.selectedAnswer == '') {
        notAttendedQuestions.push(index + 1);
      }

      // checking if answer is correct then incresing the score
      if (queAns.selectedAnswer == trueAnswer) {
        score = score + (marksPerQuestion);
      }

      this.studentAnswer.quizId = this.selectedQuiz.quizId;
      this.studentAnswer.studentId = this.studentId;
      this.studentAnswer.questionContent = queAns.selectedAnswer;
      this.studentAnswer.questionId = queAns.questionId;
      this.studentAnswer.selectedOption = (queAns.selectedAnswer == trueAnswer);
      this.studentAnswer.answerId = 0;
      console.log("@@@@@@@@@@@@@@@@@@@@@", this.studentAnswer);
      this.quizProgServ.addStudentAnswers(this.studentAnswer).subscribe(
        (response) => {
          // this.studentAnswers.push(response);
          // this.studentAnswers = response;
          console.log("Student answers saved");
        },
        (error) => {
          console.log("Failed to save student answers");
        }
      );

    })

    // if there is any not attended questions available 
    // current always false because auto submit on timer
    if (notAttendedQuestions.length > 0 && this.cd.left > 0) {
      // alert("Please answer the questions  " + (notAttendedQuestions))
      this.dialogboxService.open('Please answer the questions ' + (notAttendedQuestions), 'warning');
      return;
    }
    this.addQuizProgress(score);

    if (score >= this.selectedQuiz.passMark) {
      // show dialog box with green exam pass
      var grade = '';
      if (score >= 90) {
        grade = 'A+';
      } else if (score >= 80) {
        grade = 'A';
      } else if (score >= 75) {
        grade = 'B+';
      } else if (score >= 70) {
        grade = 'B';
      } else if (score >= 60) {
        grade = 'C';
      } else if (score >= 50) {
        grade = 'D';
      } else if (score >= 40) {
        grade = 'E';
      }
      this.dialogboxService.open(this.selectedQuiz.successText + '  ' + grade, 'information');
      //alert("Total score: " + score);
    } else {
      // show dialog box with red exam fail
      this.dialogboxService.open(this.selectedQuiz.failText, 'information');
    }
    this.submitted = true;

    // stop timer
    this.cd.stop();
  }

  addQuizProgress(score: number) {
    console.log(score);

    // adding all value to quizprogress object to store result
    this.quizProgress.studentId = this.studentId;
    this.quizProgress.quizId = this.selectedQuiz.quizId;
    this.quizProgress.score = score;
    if (score >= this.selectedQuiz.passMark) {
      this.quizProgress.completed = true;
    } else {
      this.quizProgress.completed = false;
    }
    this.quizProgress.numberOfAttempts = 1;
    console.log(this.quizProgress);

    this.quizProgServ.addQuizProgressOfStudent(this.quizProgress).subscribe(
      (response) => {

        this.addeedQuizProgress = response;
        // alert("Quiz progress saved");
        console.log("Quiz progress saved");
        this.onQuizProgressAdded(this.addeedQuizProgress);
        // alert("Quiz progress saved");
        this.onSaveQuizProgress(this.addeedQuizProgress);

      },
      (error) => {
        console.log("Failed to save Progress");
      }
    );
  }


  handleEvent(ev: CountdownEvent) {
    // alert(ev.action);
    if (ev.action === 'start' || ev.action === 'notify') {
      localStorage.setItem('time', `${ev.left / 1000}`)
    }
    if (ev.action === 'done') {
      // Save current value
      localStorage.setItem('time', `${ev.left / 1000}`)
      // console.log(this.studentQuizComponent.questionAnswers);

      this.onQuizSubmit(this.studentQuizComponent.questionAnswers);

    }

  }

  isRetakingQuiz: boolean = false;
  retakingQuiz: number = 0;
  onQuizClick: number = 0;
  onRetakeQuizClicked(quiz: Quiz) {

    this.onQuizClicked(quiz, true);
  }
}

// function ngOnInit() {
//   throw new Error('Function not implemented.');
// }



