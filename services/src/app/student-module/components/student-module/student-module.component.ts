import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleFile } from 'app/class/module-file';

import { Course } from 'app/teacher-course/class/course';
import { ModuleService } from 'app/module/services/module.service';
import { Location } from '@angular/common';
import { Module } from 'app/module/class/module';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { ModuleFileService } from 'app/module-file/services/module-file.service';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';

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
import { CorrectQuestionAnswer } from 'app/question/class/correct-question-answer';
import { QuizresultService } from 'app/quiz/services/quizresult.service';
import { QuestionService } from 'app/question/services/question.service';
import { QuestionAnswer } from 'app/question/class/question-answer';
import { Question } from 'app/question/class/question';
import { StudentQuiz } from 'app/quiz-progress/class/student-quiz';
import { ProfileService } from 'app/profiles/services/profile.service';
import { HttpClient } from '@angular/common/http';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';


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

  @Output() submitClicked: EventEmitter<number> = new EventEmitter<number>();

  studentId: any;
  userName: any;
  courseId: any;
  setTimer: number = 0;
  moduleId: any;
  instituteName: any;
  moduleName: any;
  courseName: any;
  departmentName: any;
  selectedCategoryName: any;
  courses: Course[] = []; //array of Course objects that stores the courses of the student
  courseList: Course[] = [];
  modules: Module[] = []; //array of Module objects that stores the modules of the courses
  studentModuleFiles: ModuleFile[] = []; //array of ModuleFile objects that stores the module files assigned to the student
  selectedQuizProgress: QuizProgress;
  moduleFileProgress: Modulefileprogress = new Modulefileprogress;// Object of ModuleFileProgress
  moduleFileProgressArr: Modulefileprogress[] = [];// Array of Object of ModuleFileProgress
  updatedModuleFileProgressArr: Modulefileprogress[] = [];// Array of Object of ModuleFileProgress
  reviewButtonStat: boolean = false;
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

  Date: any;
  questionAnswer!: QuestionAnswer;  // empty question
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
  showReviewButton: boolean = false;
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
  queAns!: OneQuestionAnswer;
  moduleProgArray: Moduleprogress[] = [];
  correctQueAns: CorrectQuestionAnswer = new CorrectQuestionAnswer();
  quizProgress!: QuizProgress;  // quizProgress object used to save progress in table
  studentQuiz!: StudentQuiz;
  questionAnswers: OneQuestionAnswer[] = [];    // array of question and answers
  addeedQuizProgress: QuizProgress = new QuizProgress();
  addedQuizOverAllProgress: StudentQuiz = new StudentQuiz();
  addeedQuizProgress1: QuizProgress[] = [];
  quizDataStore: any[] = [];
  reviewStatusLocal: any[] = [];
  ; //to store quizprogress data
  submitted: boolean = false;
  viewAdd: boolean = false;
  studentAnswer: StudentAnswer = new StudentAnswer();  // for storing student answers
  studentAnswers: StudentAnswer[] = [];
  selectedQuiz: any
  correctQuestionAnswer: CorrectQuestionAnswer[] = []
  quizResult: StudentAnswer[] = [];
  totalQuizMarks: any;
  totalReviewMarks: any = 0;
  selectedStudProfileId: any;
  oneQuestionAnswer: OneQuestionAnswer = new OneQuestionAnswer;  // empty question
  generatedQuestionAnswerId: number = 0;;
  selectedQuizId: any = 0;
  selectedCategoryId: any = 0;
  quizIdArrInStudRes: number[] = [];
  private quizReviewStatusCache: { [quizId: number]: boolean[] } = {};
  shouldShowReviewButtonStatValue!: boolean;
  showReview: boolean = false;
  totalPercent!: number;
  PercentageGrade!: number;
  QuizGrade!: String;

  quizData: String = '';
  quizCOurseId: any[] = [];

  grade: any = '';

  downloadLink: any
  instId: number = 0;
  instName: string = '';
  instPicture: string = '';
  videoPlayed: boolean = false;
  // ------------------------VARIABLE DECLARATION END------------------------------

  constructor(private activateRoute: ActivatedRoute,
    private profServ: ProfileService,
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
    private quizReService: QuizresultService,
    private service: QuestionService, private dialogBoxServices: DialogBoxService,
    private reviewServ: QuizresultService, private ngZone: NgZone, private router: Router, private http: HttpClient
  ) {
    this.selectedQuizProgress = new QuizProgress();
    this.selectedQuiz = new Quiz();
    this.selectedCourse = new Course();


  }








  ngOnInit(): void {
    // this.videoPlayer;


    this.reviewButtonStat = false;
    this.cdr.detectChanges();
    //.log("reviewButtonStat in ngonint" + this.reviewButtonStat)
    this.studentId = this.activateRoute.snapshot.paramMap.get('id');
    this.userName = this.activateRoute.snapshot.params['userName'];
    this.loadCourseOfStudent(this.studentId);

    this.videoPlayed = false;









    this.selectedCourseId = '1'



    this.getAllQuizzesByProfileId(this.studentId);
    this.getAllFileProgress();
    this.getQuizPorgressesByStudentId(this.studentId);

    this.addQuizProgress(this.selectedCourseId);

    this.filterUniqueModuleIds();
    //.log(this.reviewButtonStat)

    this.quizProgServ.displayStudentProgress(this.studentId).subscribe(
      dd => {
        console.log("dd" + dd);
        this.quizDataStore = dd;

        for (let m = 0; m < this.quizDataStore.length; m++) {
          console.log("Final Grade..." + this.quizDataStore[m]);

          this.quizData = this.quizDataStore[m];

        }

      }
    )







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

        // //.log(this.selectedCourseId)

        try {
          this.couresFlag = false;
          //FUNCTION TO TRACK MODULE PROGRESS
          this.trackModuleProgress(this.selectedCourseId)
          //FUNCTION TO TRACK COURSE PROGRESS
          this.trackCourseProgress(this.selectedCourseId)

          // //.log(this.selectedCourseId)
          this.chkCoursePogress(this.selectedCourseId)







        }
        catch (e) {
          //.log(e)
        }

        this.sortAccessibleModules();
      },
      error => {
        //.log(error);

      }
    );
    //.log(this.courses)
    //.log(this.selectedCourseId);


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




      //.log(this.selectedModule.moduleId)

      this.fileProgService.getAllFileProgressByModIdStudId(this.selectedModule.moduleId, this.studentId).subscribe(
        (response) => {


          this.newModuleFileProgressArr = response;
          //.log("gffgfgfg")
          //.log(this.newModuleFileProgressArr)

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


            //.log("  if(this.selectedFile.moduleFileId == this.fileIdArr[i] )")
            this.moduleFileProgress = this.newModuleFileProgressArr[k];
            this.flag = true;
            k = this.newModuleFileProgressArr.length;

          }

          // //.log("this.moduleFileProgress outside")
          // //.log(this.moduleFileProgress)
          //if flag is true
          if (this.flag == true) {




            if (this.moduleFileProgress.progress == 100) {
              //.log("Enered in  this.moduleFileProgress.progress == 10")
              this.moduleProgresscCeateUpdate(this.selectedModule.moduleId);
              //FUNCTION TO TRACK COURSE PROGRESS
              this.trackCourseProgress(this.selectedCourseId)
              // //.log(this.selectedModule)

            }

            //cond. to update moduleprogress table
            else if ((this.moduleFileProgress.progress < 100 || this.completionPercentage == 100) && (this.completionPercentage > this.moduleFileProgress.progress)) {


              //.log(" else if ((this.moduleFileProgress.progress < 100 || this.completionPercentage == 100) && (this.completionPercentage > this.moduleFileProgress.progress))");
              let modFileProg: Modulefileprogress = new Modulefileprogress();

              this.moduleFileProgress.progress = this.completionPercentage;

              this.moduleFileProgress.currentFilePageNo = this.videoPlayerRef.nativeElement.currentTime;
              //.log("Entered in else if loop")
              //.log("Value caught true");
              //.log(this.moduleFileProgress.progress)
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

        //.log(" else if (this.uniqueFileIdArr.includes(this.selectedFile.moduleFileId) == false)");
        // //.log("this.selectedModule.moduleId   "+this.selectedModule.moduleId)
        let modFileProg: Modulefileprogress = new Modulefileprogress();
        this.moduleFileProgress.id = 0;
        this.moduleFileProgress.progress = this.completionPercentage;
        this.moduleFileProgress.currentFilePageNo = this.videoPlayerRef.nativeElement.currentTime;
        this.moduleFileProgress.moduleId = this.selectedModule.moduleId;
        this.moduleFileProgress.fileId = this.selectedFile.moduleFileId;
        this.moduleFileProgress.studentId = this.studentId;
        this.moduleFileProgress.courseId = this.selectedCourseId;
        //.log("object for post")
        //.log(this.moduleFileProgress)
        this.fileProgService.addFileProgressStatus(this.moduleFileProgress).subscribe(
          response => {

            modFileProg = response;


            //.log("inside addFileProgressStatus")




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
    //.log("onSelectedFileChanged() called")
    this.updatedPercentage = 0;
    this.completionPercentage = 0;
    //.log(this.updatedPercentage)
    let blob: Blob;
    this.modulefileService.getFile(this.selectedFile.moduleFileId).subscribe(
      (response: ArrayBuffer) => {
        //.log(response);
        const bytes = new Uint8Array(response);
        // Create an ArrayBuffer
        const arrayBuffer = new ArrayBuffer(4);
        const dataView = new DataView(arrayBuffer);
        dataView.setInt32(0, 42);
        //.log(dataView);
        // Create a Blob from the ArrayBuffer
        const blob2 = new Blob([arrayBuffer]);
        //.log(blob2);
        // Check if the file is a PDF
        if (String.fromCharCode.apply(null, Array.from(bytes.subarray(0, 4))) === '%PDF') {
          blob = new Blob([response], { type: 'application/pdf' });
          this.selectedFileType = 'application/pdf';
          this.selectedFileData = URL.createObjectURL(blob);
          this.format = 'pdf';
        }
        // Check if the file is a video
        const mp4Signature = String.fromCharCode.apply(null, Array.from(bytes.subarray(4, 8)));
        //.log(mp4Signature);
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
        //.log(this.selectedFileData);
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

  onViedoPlayed() {
    this.videoPlayed = true;
  }



  private async getModFilesByModuleId(moduleId: number) {
    this.modFilesArray = [];
    try {
      const data = await this.modFileServc.getModuleFilesByModuleId(moduleId).toPromise();
      console.log(data);
      if (data != undefined) {
        this.modFilesArray = data;
      }

    } catch (error) {
      //.log("no data fetched");
    }
  }


  //Loads the modules of the courses using the getModuleByCourseId() method of StudentService
  async loadModuleOfCourse(studentCourses: Course[]) {
    this.reviewButtonStat = false
    //.log("reviewButtonStat in loadModules" + this.reviewButtonStat)
    let filteredModules: Module[] = [];
    studentCourses.forEach(async course => {

      const modules: any = await this.moduleService.getModuleByCourseId(course.courseId).toPromise();
      // .subscribe(
      // response => {
      //   //.log(response)
      if (modules != undefined) {
        for (const module of await modules) {
          // modules.forEach(async module => {

          await this.getModFilesByModuleId(module.moduleId);

          if (this.modFilesArray.length != 0) {
            //.log(module);

            this.modules.push(module);
            //.log(module)
            //.log(this.selectedCourseId)
            if (this.selectedCourseId == module.courseId_id) {
              this.selectedModule = module;

              //.log("inside loadModuleOfCourse")
              //.log(module)
            }
          }
          this.loadModuleFilesOfCourses(this.studentId);
        }
      }


      // }



      // },
      //   error => {
      //     //.log(error);
      //   }
      // );
    })

  }

  //loads the module files assigned to the student using the getModuleFilesByStudentId() method of StudentService
  loadModuleFilesOfCourses(studentId: number) {
    this.reviewButtonStat = false;
    //.log("reviewButtonStat in loadModulesFiles" + this.reviewButtonStat)
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
        //.log("Failed to load student course");
      }
    );

  }


  getModuleFiles(studentId: number) {
    this.moduleFileService.getModuleFilesOfEnrolledCoursesOfModulesByProfileId(studentId).subscribe(
      response => {
        //.log(response);
      }
    )
  }




  //sets the selected course by the student and resets the selected module
  onCourseSelect(courseId: any) {

    this.reviewButtonStat = false;
    //.log("reviewButtonStat in loadCourses" + this.reviewButtonStat)
    this.selectedCourse = this.courses.find(course => course.courseId == courseId) ?? {} as Course;
    //.log(JSON.stringify(this.selectedCourse));

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
    this.chkCoursePogress(courseId);
    // this.courProgPercentage = 0;

    this.changeSelectedCourseName(courseId);

    this.selectedCourseId = courseId;

    this.selectedModule = undefined;
    //FUNCTION TO TRACK COURSE PROGRESS
    this.trackCourseProgress(courseId)
    // //.log(this.selectedCourseId);
    // //.log(this.selectedModule);

    //.log("   this.courProgPercentage  in onCourseSelect" + this.courProgPercentage)

    //names of attributes
    let departmentname: any;




    let departId: any;






    let modulecourseId: any;
    let institutioncourseId: any;
    let deptinstituteId: any;
    this.moduleService.getAllModules().subscribe(
      response => {
        ////.log(response);
        this.modulesArray = response;
        //  //.log(this.modulesArray);

        for (let i = 0; i < this.modulesArray.length; i++) {
          // //.log(this.modulesArray[i]);

          if (courseId == this.modulesArray[i].courseId_id) {
            modulecourseId = this.modulesArray[i].courseId_id;

            let modulesId = this.modulesArray[i].moduleId;
            //.log("Modules Id" + modulesId)
            //.log("module course : " + this.modulesArray[i].moduleName);

            // //.log("module course id" + this.modulesArray[i].courseId_id);

            // //.log("course table" + courseId);

            this.courseService.getAllCourses().subscribe(
              response => {

                this.courseArray = response;
                for (let k = 0; k < this.courseArray.length; k++) {
                  // //.log(this.courseArray[i])

                  if (modulecourseId == this.courseArray[k].courseId) {
                    institutioncourseId = this.courseArray[k].instId;
                    // //.log("course name :" + this.courseArray[k].courseName)

                    this.courseName = this.courseArray[k].courseName;
                    //.log("Course Name :" + this.courseName)

                    this.instituteadminService.fetchAdminInstitutionList().subscribe(
                      response => {
                        this.instituteArray = response;

                        for (let h = 0; h < this.instituteArray.length; h++) {
                          ////.log(this.instituteArray[i]);

                          if (institutioncourseId == this.instituteArray[h].adminInstitutionId) {
                            deptinstituteId = this.instituteArray[h].adminInstitutionId;
                            ////.log("institute name : " + this.instituteArray[h].adminInstitutionName);
                            this.instituteName = this.instituteArray[h].adminInstitutionName;
                            //.log(this.instituteName);

                            this.courseService.getCoursesDepartmentId().subscribe(
                              response => {
                                this.coursedepartmentArray = response;

                                for (let z = 0; z < this.coursedepartmentArray.length; z++) {
                                  //  //.log(this.coursedepartmentArray[z]);

                                  if (courseId == this.coursedepartmentArray[z].courseId) {
                                    // //.log(courseId);
                                    // //.log(this.coursedepartmentArray[z].department_id);
                                    departId = this.coursedepartmentArray[z].department_id;


                                    this.departmentService.getAllDepartments().subscribe(
                                      response => {
                                        this.departmentArray = response;
                                        // //.log(response)

                                        for (let c = 0; c < this.departmentArray.length; c++) {

                                          ////.log(this.departmentArray[c]);

                                          if (departId == this.departmentArray[c].id) {
                                            // //.log(this.departmentArray[c].name);
                                            this.departmentName = this.departmentArray[c].name;
                                            //.log(this.departmentName);










                                          }
                                        }
                                      })



                                  }

                                }

                              })



                          }
                        }
                        // //.log(response)

                      })


                  }
                }
                // //.log(response);
                ////.log("in course" + modulecourseId);
              }
            )






          }
        }

      })



    this.sortAccessibleModules();
  }


  //navigates back to the student data page
  back() {
    this.courseProgServ.getAllCourseProgress();
    // Use window.onpopstate to detect when the user navigates back
    window.onpopstate = () => {
      // Reload the previous page when the user navigates back
      window.location.reload();
    };

    // Navigate back using Location.back()
    this._location.back();

    // this.route.navigate(['studentdata/student', this.userName])
  }

  changeselectedModuleName(moduleId: any) {
    this.selectedModule = moduleId;
    ////.log(moduleId);

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
        //.log(response);
        this.selectedFileProgress = response;
      }
    );

    this.onSelectedFileChanged();



    this.moduleName = module.moduleName;
    //.log(this.moduleName)



    this.moduleFileName = file.moduleFileId;
    ////.log(name);

  }


  //function to check if given module id and student id already exist in moduleprogress table
  trackModuleProgress(courseId: number) {
    this.statusModuleProg;
    let trackModules: Module[] = [];
    //.log("Called")
    let moduleId: number;
    //get modules from module table
    this.moduleService.getModuleByCourseId(courseId).subscribe(
      response => {
        //.log("Inside getModuleByCourseId(moduleId)")
        response.forEach(module => {
          trackModules.push(module);
          //.log(module);
          //.log(moduleId)
          if (courseId == module.courseId_id) {
            this.trackedModule = module;
            //.log(module.courseId_id)

            try {

              //get moduleprogress entry  by module Id and student Id
              this.moduleProgSErv.getModuleProgressByModIdStudId(module.moduleId, this.studentId).subscribe(
                (response) => {

                  //ModuleProgress Entity
                  this.statusModuleProg = response;
                  if (this.statusModuleProg.progress == 100) {
                    // this.trackCourseProgress(this.selectedCourseId)
                  }
                  //.log(this.statusModuleProg)
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
    //.log(this.statusModuleProgArr);
    this.unistatusModuleProgArr = this.statusModuleProgArr.filter((value, index, self) => self.indexOf(value) === index);

    //.log(this.unistatusModuleProgArr);

  }

  existingmoduleProgress(moduleId: number, courseId: number) {

    //.log(moduleId)
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
    //.log(this.unistatusModuleProgArr);
  }



  async trackCourseProgress(courseId: number) {

    let moduleArray: Module[] = [];
    let moduleProgArray: Moduleprogress[] = [];
    let institutionId: number = 0;
    let adminInstitution: AdminInstitution[] = [];
    //.log(courseId)
    await this.totalFilesAndQuizzesInCourse(courseId)
    await this.actualModFileAndQuizCompleted(this.studentId, courseId)
    await this.chkCoursePogress(courseId);

    //.log("this.existingCourseProg")
    //.log(this.existingCourseProg)
    this.courseProgress.progress = ((this.completedFileIds.length + this.completedQuizids.length) * 100) / (this.moduleFileIdsForCour.length + this.quizIdsForCour.length);
    this.instituteadminService
      .getInstitutionByProfileId(this.studentId)
      .subscribe((response) => {
        adminInstitution = response
        this.instId = adminInstitution[0].adminInstitutionId;
        this.instName = adminInstitution[0].adminInstitutionName;
        this.instPicture = adminInstitution[0].adminInstitutionPicture



        if (this.existingCourseProg.courseId != courseId) {
          let addedcourseProgress: CourseProgress = new CourseProgress();
          //.log("if(this.existingCourseProg.courseId != courseId && this.existingCourseProg.studentId != this.studentId)")

          this.courseProgress.id = 0;
          this.courseProgress.courseId = this.selectedCourseId;
          this.courseProgress.studentId = this.studentId;
          this.courseProgress.currentAssignNo = 1;
          this.courseProgress.currentModuleNo = 1;
          this.courseProgress.currentUnitNo = 1;
          this.courseProgress.grade = 0;

          let adminInstitution: AdminInstitution[] = [];





          this.courseProgServ.addCourseProgressStatus(this.courseProgress).subscribe(
            (response) => {

              addedcourseProgress = response;
              this.courProgPercentage = addedcourseProgress.progress;

              console.log("this.videoPlayed  " + this.videoPlayed);
              if ((this.courProgPercentage == 100) && (this.videoPlayed == true)) {
                this.dialogboxService.open('Congratulations you have successfully completed the course \uD83D\uDC90', 'information');
                this.profServ.sendCertificateEmail(this.studentId, this.instId, this.instName, this.instPicture, this.selectedCourseName).subscribe(
                  (response) => {
                    console.log(" Certificate Generated Successfully")

                    this.downloadLink = response
                    console.log(this.downloadLink)

                  }
                )

              }
              this.courseProgServ.getAllCourseProgress().subscribe(
                (response) => { }
              )
              //.log("   this.courProgPercentage  in add  " + this.courProgPercentage)
            }
          )

        }


        else if ((this.existingCourseProg.courseId == courseId) && (this.existingCourseProg.studentId == this.studentId)) {
          let updatedcourseProgress: CourseProgress = new CourseProgress();
          //.log(" else if(this.existingCourseProg.courseId === courseId && this.existingCourseProg.studentId === this.studentId)")
          this.existingCourseProg.progress = ((this.completedFileIds.length + this.completedQuizids.length) * 100) / (this.moduleFileIdsForCour.length + this.quizIdsForCour.length);

          this.courseProgServ.updateCourseProgress(this.existingCourseProg).subscribe(
            (response) => {
              updatedcourseProgress = response;
              this.courProgPercentage = updatedcourseProgress.progress;
              console.log("this.videoPlayed  " + this.videoPlayed);
              if ((this.courProgPercentage == 100) && (this.videoPlayed == true)) {
                this.dialogboxService.open('Congratulations you have successfully completed the course \uD83D\uDC90', 'information');
                this.profServ.sendCertificateEmail(this.studentId, this.instId, this.instName, this.instPicture, this.selectedCourseName).subscribe(
                  (response) => {
                    console.log(" Certificate Generated Successfully")
                    this.downloadLink = response
                    console.log(this.downloadLink)
                  }
                )
              }
              this.courseProgServ.getAllCourseProgress().subscribe(
                (response) => {

                }
              )

              //.log("   this.courProgPercentage  in update " + this.courProgPercentage)

            }
          )






        }
      });
  }


  chkCoursePogress(courseId: number) {



    //.log(courseId)
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
    //.log("in module function data")
    //.log(this.modules);
    for (const i in this.modules) {
      if (this.modules[i].courseId_id === this.selectedCourseId) {
        return this.modules
      }

    }
    // return this.modules.filter(module => module.courseId_id === this.selectedCourseId);
    return [];
  }

  getAllFileProgress() {

    //.log("getAllFileProgress()")
    this.fileProgService.getAllFileProgressStatus().subscribe(
      (response) => {
        this.fileProgress = response

        //.log(this.studentId)
        //.log(this.fileProgress)
        this.filteredFileProg = this.fileProgress.filter(obj => obj.studentId == this.studentId && obj.progress == 100);
        this.filteredProgressFileIds = this.filteredFileProg.map(progress => progress.fileId);

        //.log(this.filteredFileProg)


        //.log(this.filteredProgressFileIds);

        // this.cdr.detectChanges();
      }


    )

  }

  downloadCertificate(userId: number, instId: number, instName: string, instImg: string, courName: string) {

    // Replace these placeholders with the actual values you need
    // const userId = 9;
    // const instId = 1;
    // const instName = 'abc';
    // const courName = 'Compiler Construction';

    // Make an HTTP request to fetch the certificate content
    // this.http
    // .get(`http://localhost:8080/uhpocms/profile/generateCertificate/${userId}/${instId}/${instName}/${instImg}/${courName}`, { responseType: 'text' })
    // .subscribe((certificateHtml) => {
    this.profServ.downloadCertificateEmail(userId, instId, instName, instImg, courName).subscribe(
      (certificateHtml) => {



        // Create a blob from the HTML content
        const blob = new Blob([certificateHtml], { type: 'text/html' });

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificate.html';
        document.body.appendChild(a);
        a.click();

        // Clean up the temporary URL
        window.URL.revokeObjectURL(url);
      });
  }


  private moduleProgresscCeateUpdate(moduleId: number) {
    //.log("Entered in moduleProgresscCeateUpdate()")
    let updatedModuleProgress: Moduleprogress = new Moduleprogress;
    let moduleArr: ModuleFile[] = [];
    let modFileProgress: Modulefileprogress[] = [];
    this.existingmoduleProgress(moduleId, this.selectedCourseId);
    //.log(moduleId)
    this.getAllQuizzesByModuleId(moduleId);
    //.log(this.quizIdArr1);
    this.getAllQuizProgress(moduleId);
    //.log(this.quizIdArr2);

    // get data from modulefile table my module Id
    this.modulefileService.getModuleFilesByModuleId(moduleId).subscribe(
      (response) => {

        moduleArr = response;

        //.log("moduleArr.length inside " + moduleArr.length);
        this.moduleArrCopy = moduleArr;
        // this.getAllFileProgress();

        //.log("moduleArr.length outside " + this.moduleArrCopy.length);

        //get data from ModuleFileProgress table where progress is 100
        this.fileProgService.getAllFileProgressByModIdStudIdProg(moduleId, this.studentId).subscribe(
          (response) => {

            modFileProgress = response;

            //.log("modulebasedArr.length inside " + modFileProgress);
            this.modFileProgressCopy = modFileProgress;
            //.log("two lenghts outside " + this.moduleArrCopy.length + "     " + this.modFileProgressCopy.length);

            let arr1Len = this.quizIdArr1.length + this.moduleArrCopy.length;
            let arr2Len = this.quizIdArr2.length + this.modFileProgressCopy.length;

            //.log("this.quizIdArr2.length " + this.quizIdArr2.length + " this.modFileProgressCopy.length" + this.modFileProgressCopy.length)
            //.log(" arr2Len   " + arr2Len)
            //.log("this.quizIdArr1.length " + this.quizIdArr1.length + " this.moduleArrCopy.length" + this.moduleArrCopy.length)
            //.log(" arr1Len   " + arr1Len)

            // if ((this.modFileProgressCopy.length <= this.moduleArrCopy.length) && this.modFileProgressCopy.length != 0) {
            if ((arr2Len <= arr1Len) && arr2Len != 0) {


              this.modulePercentage = (arr2Len * 100) / (arr1Len);
              //.log("moduleArr.length == this.modulebasedArr.length")

              //.log(arr2Len + "       " + arr1Len)
              //.log("module Percentage" + "  " + this.modulePercentage)

              this.moduleProgress.moduleId = moduleId;
              //.log("this.selectedModule.moduleId   " + moduleId)
              this.moduleProgress.courseId = this.selectedCourseId;
              this.moduleProgress.studentId = this.studentId;
              this.moduleProgress.progress = this.modulePercentage;

              //condition to check if moduleProgress entity array filtered by course includes current array
              //.log(this.unistatusModuleProgArr);



              //.log(this.updatedModuleProgress)
              if (this.updatedModuleProgress.moduleId == moduleId) {



                //.log(" if (this.unistatusModuleProgArr.includes(this.selectedModule.moduleId) == true)");

                this.updatedModuleProgress.progress = this.modulePercentage;

                //.log(" this.statusModuleProg.progress ")
                //.log(this.statusModuleProg)

                this.moduleProgSErv.updateModuleProgress(this.updatedModuleProgress).subscribe(
                  (response) => {

                    this.existingmoduleProgress(moduleId, this.selectedCourseId);
                    //.log(this.updatedModuleProgress)
                  }

                )

              }

              else if (this.updatedModuleProgress.moduleId != moduleId) {
                //   else if (this.unistatusModuleProgArr.includes(moduleId) == false){
                //.log(" else if (this.unistatusModuleProgArr.includes(this.selectedModule.moduleId) == false) ")
                //.log(this.moduleProgress)

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




  // private getAllQuizzesByProfileId(studentId: number) {

  //   let quizIdArr :number[] = [];
  //   let quizIdArrInStudRes :number[] = [];
  //   this.quizService.getAllQuizzesByProfileId(studentId).subscribe(
  //     (data: Quiz[]) => {
  //       this.quizzes = data;

  //       quizIdArr =  this.quizzes.map((quiz)=>quiz.quizId);
  //       for(const quizId of quizIdArr){
  //       this.quizReService.getAllStudentAnswersByStduentIdAndQuizId(studentId,quizId).subscribe(
  //         (response)=>{
  //           quizIdArrInStudRes = [...new Set(response.map((quiz) => quiz.quizId))];



  //         },
  //         (error)=>{}


  //       )


  //       }
  //     }
  //   )
  // }


  // private getAllQuizzesByProfileId(studentId: number) {
  //   let quizIdArr: number[] = [];
  //   let quizIdArrInStudRes: number[] = [];

  //   this.quizService.getAllQuizzesByProfileId(studentId).subscribe(
  //     (data: Quiz[]) => {
  //       this.quizzes = data;

  //       quizIdArr = this.quizzes.map((quiz) => quiz.quizId);

  //       for (const quizId of quizIdArr) {
  //         this.quizReService
  //           .getAllStudentAnswersByStduentIdAndQuizId(studentId, quizId)
  //           .subscribe(
  //             (response) => {
  //               quizIdArrInStudRes = [...new Set(response.map((quiz) => quiz.quizId))];

  //               // Check if any quiz ID in quizIdArrInStudRes is present in quizIdArr
  //               if (quizIdArrInStudRes.some((id) => quizIdArr.includes(id))) {
  //                 this.showReviewButton = true;
  //               } else {
  //                 this.showReviewButton = false;
  //               }
  //             },
  //             (error) => {}
  //           );
  //       }
  //     }
  //   );
  // }

  public shouldShowReviewButton(quizId: number): boolean {
    return this.quizIdArrInStudRes.includes(quizId);
  }
  public shouldShowReviewButtonStat(quizId: number): boolean {

    ////.log(this.reviewStatusLocal)

    return this.reviewStatusLocal.includes(quizId) && this.reviewStatusLocal.includes(true);
  }

  private getAllQuizzesByProfileId(studentId: number) {
    let quizIdArr: number[] = [];

    this.quizService.getAllQuizzesByProfileId(studentId).subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;

        quizIdArr = this.quizzes.map((quiz) => quiz.quizId);

        for (const quizId of quizIdArr) {
          this.quizReService
            .getAllStudentAnswersByStduentIdAndQuizId(studentId, quizId)
            .subscribe(
              (response) => {
                // const reviewStat = [...new Set(response.map((studRez) => studRez.reviewStat && studRez.quizId))];
                const combinedArray = [...new Set(response.filter(studRez => studRez.reviewStat && studRez.quizId).flatMap(studRez => [studRez.reviewStat, studRez.quizId]))];

                //.log(combinedArray); // Array containing unique values of studRez.reviewStat and studRez.quizId

                this.reviewStatusLocal = this.reviewStatusLocal.concat(combinedArray)
                const quizIdsInResponse = [...new Set(response.map((quiz) => quiz.quizId))];
                this.quizIdArrInStudRes = this.quizIdArrInStudRes.concat(quizIdsInResponse);
              },
              (error) => { }
            );
        }
      }
    );
  }

  // public getQuizByStudIdAndQuizId(quizId:number)
  // { this.reviewStatusLocal =[];
  //   this.quizReService.getAllStudentAnswersByStduentIdAndQuizId(this.studentId, quizId)
  //   .subscribe(
  //     (response) => {
  //       const reviewStat = [...new Set(response.map((studRez) => studRez.reviewStat))];
  //       this.reviewStatusLocal = this.reviewStatusLocal.concat(reviewStat);

  //     },
  //     (error) => {}
  //   );
  // }

  public getQuizByStudIdAndQuizId(quizId: number) {
    if (this.quizReviewStatusCache[quizId]) {
      // Use the cached result
      this.reviewStatusLocal = this.quizReviewStatusCache[quizId];
    } else {
      this.reviewStatusLocal = [];
      this.quizReService.getAllStudentAnswersByStduentIdAndQuizId(this.studentId, quizId)
        .subscribe(
          (response) => {
            const reviewStat = [...new Set(response.map((studRez) => studRez.reviewStat))];
            this.reviewStatusLocal = this.reviewStatusLocal.concat(reviewStat);

            // Cache the result
            this.quizReviewStatusCache[quizId] = this.reviewStatusLocal;
          },
          (error) => { }
        );
    }
  }




  private getAllQuizResult(studentId: number) {

  }


  //data from quiz table filtered by module id
  private getAllQuizzesByModuleId(moduleId: number) {
    this.reviewButtonStat = false;
    this.cdr.detectChanges();
    //.log("reviewButtonStat in loadQuizzes" + this.reviewButtonStat)
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
        //.log(response)
        //.log(quizprogress)
        //.log(filteredQuizProgressId)

        //.log(this.quizIdArr1)
        this.quizIdArr2 = filteredQuizProgressId.filter(element => this.quizIdArr1.includes(element));
        //.log(this.quizIdArr2)
      }
    )


  }
  onQuizProgressAdded(addeedQuizProgress: any) {
    //.log(addeedQuizProgress);
    let quizArr: Quiz[] = [];
    let filteredQuizArr: Quiz[] = [];
    let moduleIdArr: number[] = [];
    this.quizService.getAllQuizzes().subscribe(
      (data: Quiz[]) => {
        quizArr = data;
        filteredQuizArr = quizArr.filter((array) => array.quizId == addeedQuizProgress.quizId)

        // Map the quiz array to an array of quiz IDs
        moduleIdArr = filteredQuizArr.map(quiz => quiz.moduleId);

        //.log(moduleIdArr[0])


        //.log(moduleIdArr[0])
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
    ////.log(this.showalert);
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
    //.log('Received score: ' + score);
    //.log('Current score: ' + this.score);
  }

  onQuizClicked(quiz: Quiz, retake: boolean = false) {
    this.reviewButtonStat = false;
    //.log("reviewButtonStat in QuizClicked" + this.reviewButtonStat)
    this.cd.stop();
    // if clicked on retake quiz option
    if (retake) {
      // alert()
      this.isRetakingQuiz = true;
      this.retakingQuiz++;
      this.cd.restart();
      //console.log(" Retake Quiz..." + this.addeedQuizProgress1);
      console.log("Welcome...######");



    } else {
      this.onQuizClick++;
      this.isRetakingQuiz = false;
      if (!(this.quizFailedProgresses.includes(quiz.quizId) || this.quizPassedProgresses.includes(quiz.quizId))) {
        this.cd.restart();
        console.log("Without Retake Quiz..." + this.addeedQuizProgress1);
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
    //.log(this.showalert);

    // this.selectedFile = '';
    this.selectedQuiz = quiz;
    this.setTimer = this.selectedQuiz.setTimer;
    this.selectedQuizName = quiz.title;
    //.log(this.quizProgressOfStudent);

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
      if (this.selectedQuizProgress.score >= quiz.passMark * 1.0) {

        this.grade = 'A+';

      } else if (this.selectedQuizProgress.score >= quiz.passMark * 0.9) {
        this.grade = 'A';
      } else if (this.selectedQuizProgress.score >= quiz.passMark * 0.8) {
        this.grade = 'B+';
      } else if (this.selectedQuizProgress.score >= quiz.passMark * 0.75) {
        this.grade = 'B';
      } else if (this.selectedQuizProgress.score >= quiz.passMark * 0.6) {
        this.grade = 'C';
      } else if (this.selectedQuizProgress.score >= quiz.passMark * 0.5) {
        this.grade = 'D';
      } else if (this.selectedQuizProgress.score >= quiz.passMark * 0.4) {
        this.grade = 'E';
      }




      console.log("Progress of Quiz..." + this.selectedQuizProgress.score)

    } else {

      this.selectedQuizProgress = {
        id: 0,
        numberOfAttempts: 0,
        completed: false,
        studentId: this.studentId,
        quizId: quiz.quizId,
        score: 0,
        courseId: quiz.courseId


        // Include any other properties from QuizProgress
      };
      console.log(quiz.courseId);
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
        //.log("failed to fetch progress data");

      }
    )
  }





  onSaveQuizProgress(quizProgress: any) {
    //.log(quizProgress);

    this.quizPassedProgresses = this.removeElementFromStringArray(this.quizPassedProgresses, quizProgress.quizId)
    this.quizFailedProgresses = this.removeElementFromStringArray(this.quizFailedProgresses, quizProgress.quizId)
    //.log(this.quizProgressOfStudent);

    this.quizProgressOfStudent = this.removeElementFromArray(this.quizProgressOfStudent, quizProgress.id);
    //.log(this.quizProgressOfStudent);

    if (quizProgress.completed == true) {
      this.quizPassedProgresses.push(quizProgress.quizId);
    } else {
      this.quizFailedProgresses.push(quizProgress.quizId);
    }
    this.quizProgressOfStudent.push(quizProgress);
    //.log("Passed Data for quiz..." + this.quizProgressOfStudent);

    //.log(this.quizPassedProgresses);
    //.log(this.quizFailedProgresses);
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
              // //.log(response);

              const foundedModule = studentModules.find(module => module.moduleId == moduleProgress.moduleId);
              // //.log(foundedModule);
              if (foundedModule) {
                this.accessibleModuleIds.add(foundedModule.moduleId);
                studentModuleProgress.push(moduleProgress);
              }

            })

            if (studentModuleProgress.length <= 0) {
              this.accessibleModuleIds.add(studentModules[0].moduleId);
              //.log(this.accessibleModuleIds);

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
        //.error('Error fetching modules:', error);
      });


    // //.log('moduleIds');
    // //.log(moduleIds);

    // Code to get file id based on module id's array
    for (let j of moduleIds) {
      try {
        const response = await this.moduleFileService.getModuleFilesByModuleId(j).toPromise();
        // //.log('moduleIds in for loop');
        // //.log(moduleIds);
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
        //.error('Error fetching module files:', error);
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

    // //.log('Module id and quiz ids array');
    // //.log(this.moduleFileIdsForCour);
    // //.log(this.quizIdsForCour);

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

    // //.log(this.moduleFileIdsForCour);
    await this.totalFilesAndQuizzesInCourse(courseId);

    //function to get array of moduke files completed progress 100
    await this.fileProgService.getAllFileProgressStatus().toPromise().then((response) => {
      if (response) {
        modFileProgress = response;
        // //.log(modFileProgress)
        // //.log(studentId + "    " + courseId)
        filteredModFileProgress = modFileProgress.filter((element) => (element.studentId == studentId) && (element.courseId == courseId) && (element.progress == 100));
        filteredModFileProgressIds = filteredModFileProgress.map((elem) => elem.fileId)

        // //.log(filteredModFileProgress)
        // //.log(this.moduleFileIdsForCour)
        // //.log(filteredModFileProgressIds)
        for (let fileId of this.moduleFileIdsForCour) {

          // //.log("  for (let j in this.moduleFileIdsForCour) {")
          if ((filteredModFileProgressIds.includes(fileId)) && (!this.completedFileIds.includes(fileId))) {
            // //.log(fileId)
            this.completedFileIds.push(fileId)
          }

        }
        // //.log(this.completedFileIds)
        // //.log()
      }


    })

    //CODE TO GET ARRAY OF QUIZZES WITH 100% PROGRESS BELONGING TO PARTICULAR COURSE
    const data = await this.quizProgServ.getQuizProgressesByStudentId(studentId).toPromise();

    if (data) {
      quizProgress = data;
      filteredQuizProgress = quizProgress.filter((elem) => elem.completed == true)
      filteredQuizProgressQuizIds = filteredQuizProgress.map((elem) => elem.quizId)
      // //.log("filteredModFileProgressIds")
      // //.log(filteredQuizProgressQuizIds)
      // //.log(this.quizIdsForCour)
      // //.log(this.quizIdsForCour)
      for (let quizId of this.quizIdsForCour) {

        // //.log("Entered in for loop")
        // //.log(this.quizIdsForCour)
        if ((filteredQuizProgressQuizIds.includes(quizId)) && (!this.completedQuizids.includes(quizId))) {
          // //.log("entered in if loop")
          this.completedQuizids.push(quizId)
        }
      }




    }


    // //.log("complted file ids and quiz ids")
    // //.log(this.completedFileIds)
    // //.log(this.completedQuizids)


  }




  onSavePDFProgress(progressData: any) {
    const progressedPageNumber = progressData.progressedPageNumber;
    const totalNumPages = progressData.totalNumPages;
    // //.log(progressData);

    let pdfProgressInPercentage = (100 / totalNumPages) * progressedPageNumber;
    pdfProgressInPercentage = Math.floor(pdfProgressInPercentage);
    // //.log(this.selectedFile);
    // //.log(this.studentId);
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
        // //.log("pdf progress saved : " + response);
        if (pdfProgressInPercentage == 100) {
          // //.log("Completed");
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
    //.log(this.moduleFileProgress);

    this.fileProgService.updateModuleFileProgressByFileIdAndStudentId(this.selectedFile.moduleFileId, this.studentId, this.moduleFileProgress).subscribe(
      response => {
        //.log(response);
        //.log("updated progress after paused")
      }
    )
  }
  allQueMarks: any;
  onQuizSubmit(questionAnswersArray: OneQuestionAnswer[]) {

    // alert(this.selectedCategoryName);
    this.questionAnswers = questionAnswersArray;
    this.quizProgress = new QuizProgress();



    //.log(this.questionAnswers);
    //.log(this.selectedQuiz);


    let notAttendedQuestions: any[] = [];
    let score: number = 0;

    const marksPerQuestion: number = 100 / (this.questionAnswers.length);

    this.questionAnswers.forEach((queAns, index) => {

      this.allQueMarks = queAns.maxMarks;
      //alert(this.allQueMarks);
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
        score += this.allQueMarks;
      }

      this.studentAnswer.quizId = this.selectedQuiz.quizId;
      this.studentAnswer.studentId = this.studentId;
      this.studentAnswer.questionContent = queAns.selectedAnswer;
      this.studentAnswer.questionId = queAns.questionId;
      this.studentAnswer.selectedOption = (queAns.selectedAnswer == trueAnswer);
      this.studentAnswer.answerId = 0;
      this.studentAnswer.reviewStat = false;
      //.log("@@@@@@@@@@@@@@@@@@@@@", this.studentAnswer);
      this.quizProgServ.addStudentAnswers(this.studentAnswer).subscribe(
        (response) => {
          // this.studentAnswers.push(response);
          // this.studentAnswers = response;
          //.log("Student answers saved");
          //.log(response);
        },
        (error) => {
          //.log("Failed to save student answers");
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
      // var grade = '';
      var maxMarks = this.selectedQuiz.maxMarks;
      alert(score);

      if (score >= maxMarks * 1.0) {

        this.grade = 'A+';
      } else if (score >= maxMarks * 0.9) {
        this.grade = 'A';
      } else if (score >= maxMarks * 0.8) {
        this.grade = 'B+';
      } else if (score >= maxMarks * 0.75) {
        this.grade = 'B';
      } else if (score >= maxMarks * 0.6) {
        this.grade = 'C';
      } else if (score >= maxMarks * 0.5) {
        this.grade = 'D';
      } else if (score >= maxMarks * 0.4) {
        this.grade = 'E';
      }
      this.getQuizByStudIdAndQuizId(this.selectedQuiz)

      this.dialogboxService.open(this.selectedQuiz.successText + '  ' + this.grade, 'information');
      //alert("Total score: " + score);

    } else {
      // show dialog box with red exam fail
      this.getQuizByStudIdAndQuizId(this.selectedQuiz)

      this.dialogboxService.open(this.selectedQuiz.failText, 'information');

    }
    this.submitted = true;

    // stop timer
    this.cd.stop();
  }

  async addQuizProgress(score: number) {
    //.log(score);
    //alert(score);
    // adding all value to quizprogress object to store result
    this.quizProgress.studentId = this.studentId;
    this.quizProgress.quizId = this.selectedQuiz.quizId;
    this.quizProgress.score = score;
    this.quizProgress.courseId = this.selectedCourseId;



    if (score >= this.selectedQuiz.passMark) {
      this.quizProgress.completed = true;
    } else {
      this.quizProgress.completed = false;
    }
    this.quizProgress.numberOfAttempts = 1;

    //.log(this.quizProgress);

    this.quizProgServ.addQuizProgressOfStudent(this.quizProgress).subscribe(
      (response) => {
        this.addeedQuizProgress = response;









        let val = 0;
        let myaData = 0;

        // this.quizProgServ.getQuizProgressesByStudentId(this.quizProgress.studentId).subscribe(
        //   response => {
        //     this.addeedQuizProgress1 = response;

        //     this.quizProgServ.displayStudentProgress(this.quizProgress.studentId).subscribe(
        //       data => {
        //         console.log("Data..." + data);

        //         this.quizDataStore = data;

        //         for (let i = 0; i < this.quizDataStore.length; i++) {
        //           this.quizData = this.quizDataStore[i];
        //         }

        //         console.log("This is Individual Data...." + this.quizData);



        //       }

        //     )


        // for (let j = 0; j < this.addeedQuizProgress1.length; j++) {

        //   myaData = this.addeedQuizProgress1[j].score;
        //   // console.log("Response based on student" + this.addeedQuizProgress1[j].score);


        //   val = val + this.addeedQuizProgress1[j].score;

        // }

        // console.log("This is val" + val);



        // for (let h = 0; h < this.addeedQuizProgress1.length; h++) {
        //   // console.log("Quiz id based on student id" + this.addeedQuizProgress1[h].quizId);



        //   this.quizService.getQuizQuizId(this.quizProgress.quizId).subscribe(
        //     response => {

        //       if (this.addeedQuizProgress1[h].quizId == response.quizId) {
        //         console.log("This is quiz id" + response.quizId);
        //         console.log("This is max marks" + response.maxMarks);


        //         console.log(this.isRetakingQuiz);

        //         let myVal = 0;
        //         if (this.isRetakingQuiz == false) {
        //           this.quizDataStore.push(response);
        //           console.log(this.quizDataStore);


        //           for (let m = 0; m <= this.quizDataStore.length; m++) {
        //             console.log(this.quizDataStore[m].maxMarks);


        //             myVal = myVal + this.quizDataStore[m].maxMarks;
        //             console.log(myVal);


        //             this.PercentageGrade = (val * 100) / myVal;
        //             console.log(this.PercentageGrade);

        //             console.log("DDD" + this.studentQuiz);

        //             if (this.PercentageGrade >= 0 && this.PercentageGrade <= 25) {
        //               this.QuizGrade = 'D';
        //             }
        //             else if (this.PercentageGrade > 25 && this.PercentageGrade <= 50) {
        //               this.QuizGrade = 'C';
        //             }
        //             else if (this.PercentageGrade > 50 && this.PercentageGrade <= 75) {
        //               this.QuizGrade = 'B';
        //             }
        //             else if (this.PercentageGrade > 75 && this.PercentageGrade <= 100) {
        //               this.QuizGrade = 'A';
        //             }



        //           }






        //         }
        //         else {

        //           let myVal = 0;

        //           for (let m = 0; m <= this.quizDataStore.length; m++) {
        //             console.log(this.quizDataStore[m].maxMarks);

        //             myVal = myVal + this.quizDataStore[m].maxMarks;
        //             console.log(myVal);

        //             this.PercentageGrade = (val * 100) / myVal;
        //             console.log(this.PercentageGrade);

        //             if (this.PercentageGrade >= 0 && this.PercentageGrade <= 25) {
        //               this.QuizGrade = 'D';
        //             }
        //             else if (this.PercentageGrade >= 25 && this.PercentageGrade <= 50) {
        //               this.QuizGrade = 'C';
        //             }
        //             else if (this.PercentageGrade >= 50 && this.PercentageGrade <= 75) {
        //               this.QuizGrade = 'B';
        //             }
        //             else if (this.PercentageGrade >= 75 && this.PercentageGrade <= 100) {
        //               this.QuizGrade = 'A';
        //             }




        //           }








        //         }





























        //       }





        //     }
        //   )






        // }















      }


    )







    // alert("Quiz progress saved");
    //.log("Quiz progress saved");
    this.onQuizProgressAdded(this.addeedQuizProgress);
    // alert("Quiz progress saved");
    this.onSaveQuizProgress(this.addeedQuizProgress);


    this.quizProgServ.getQuizProgressesByStudentId(this.quizProgress.studentId).subscribe(
      response => {
        this.addeedQuizProgress1 = response;

        this.quizProgServ.displayStudentProgress(this.quizProgress.studentId).subscribe(
          data => {
            console.log("Data..." + data);

            this.quizDataStore = data;

            for (let i = 0; i < this.quizDataStore.length; i++) {
              this.quizData = this.quizDataStore[i];
            }

            console.log("This is Individual Data...." + this.quizData);




          }

        )

      },
      (error) => {
        //.log("Failed to save Progress");
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
      // //.log(this.studentQuizComponent.questionAnswers);

      this.onQuizSubmit(this.studentQuizComponent.questionAnswers);

    }

  }

  isRetakingQuiz: boolean = false;
  retakingQuiz: number = 0;
  onQuizClick: number = 0;

  onRetakeQuizClicked(quiz: Quiz) {
    this.reviewButtonStat = false;
    this.cdr.detectChanges();
    //.log("reviewButtonStat in onretake quizClicked" + this.reviewButtonStat)
    // alert(this.reviewButtonStat)
    this.onQuizClicked(quiz, true);
    console.log("In Retake Quiz..");




  }

  getAllAnswersAttempted(quizId: number) {

    this.correctQuestionAnswer = [];
    this.quizResult = [];
    this.totalQuizMarks = 0;
    this.totalReviewMarks = 0;
    //.log(quizId)
    //.log("QuizId in  getAllAnswersAttempted")
    this.reviewButtonStat = true;
    this.cdr.detectChanges();

    //.log("reviewButtonStat in allanswersattempted" + this.reviewButtonStat)
    // alert(this.reviewButtonStat)
    //.log(this.selectedStudProfileId)
    try {
      this.quizReService.getAllStudentAnswersByStduentIdAndQuizId(this.studentId, quizId).subscribe(
        (result) => {

          this.quizResult = result;
          //.log(this.quizResult)
          this.questionAnswers = []; // Initialize questionAnswers as an array
          this.correctQuestionAnswer = []

          //.log(quizId)
          if (this.quizResult.length != 0) {
            this.service.getAllQuestionsByQuizId(quizId).subscribe(
              (response: any[]) => {

                //.log("responses for question")
                //.log(response);

                response.forEach(
                  question => {
                    //.log(question)
                    this.totalQuizMarks = this.totalQuizMarks + question.maxMarks;

                    //.log(" this.totalQuizMarks   " + this.totalQuizMarks + "  this.totalReviewMarks  " + this.totalReviewMarks)
                    this.queAns = {} as OneQuestionAnswer;
                    this.correctQueAns = {} as CorrectQuestionAnswer

                    const filteredAnswers = this.quizResult.filter(answer => answer.questionId == question.questionId);




                    filteredAnswers.forEach((answer: StudentAnswer, index: number) => {
                      this.totalReviewMarks = this.totalReviewMarks + answer.marks;
                      // //.log(answer);
                      // //.log(index)
                      if (index === 0) {
                        this.correctQueAns.content1 = answer.questionContent;
                        this.correctQueAns.marks =
                          this.correctQueAns.questionId = answer.questionId;
                        this.correctQueAns.questionQuizId = quizId;
                        this.correctQueAns.reviewcontent = answer.teacherRemark;

                        //.log("ANSWERS ")
                        //.log(this.correctQueAns.content1)
                        //.log(answer.marks)
                        //.log(question.maxMarks)

                        //.log(answer.marks)
                        //.log(question.maxMarks)

                        this.correctQueAns.marks = answer.marks;
                        this.correctQueAns.profileId = this.selectedStudProfileId;
                        //.log(this.correctQueAns)
                      }
                    })



                    // Push question and filtered answers into questionAnswers array
                    let isFormSubmitted = false;
                    if (question.questionId > 0) {
                      isFormSubmitted = true;
                    }

                    this.correctQuestionAnswer.push({
                      ...question,
                      maxMarks: question.maxMarks,
                      content1: this.correctQueAns.content1,
                      isFormDirty: false,
                      isFormSubmitted: isFormSubmitted,
                      image: false,
                      isOptionSelected: true,
                      selectedAnswer: '',
                      questionId: this.correctQueAns.questionId,
                      questionQuizId: this.correctQueAns.questionQuizId,
                      profileId: this.correctQueAns.profileId,
                      reviewcontent: this.correctQueAns.reviewcontent,
                      marks: this.correctQueAns.marks


                    });
                  });

                //.log(this.correctQuestionAnswer);
                if (this.viewAdd == true) {
                  this.initialiseQuestion(this.selectedQuiz.maxQuestions);
                }
              }



            );
          }
        },
        error => {
          //.log("failed to get answers");
        }
      );
    }
    finally {
      this.reviewButtonStat = false;
    }


  }


  private initialiseQuestion(length: number) {
    // this.questionAnswers = [];
    const quesAnsLength = this.questionAnswers.length;

    for (let i = 0; i < length - quesAnsLength; i++) {
      this.questionAnswers.push(new OneQuestionAnswer);
    }
  }



  onFormSubmit(queAns: any): void {
    let totalMarkslocal: number = 0
    let marksArray: any = [];
    let marksStatArr: boolean[] = []
    let isSecondAlertDisplayed = false;
    let isFirstAlertDisplayed = false;
    //.log(queAns)
    //.log("queAns['queAnsArray']")
    //.log(queAns['queAnsArray'])
    this.questionAnswer = {} as QuestionAnswer;
    this.oneQuestionAnswer = {} as OneQuestionAnswer;
    this.correctQueAns = {} as CorrectQuestionAnswer;
    // Form is valid, do something with the form data
    // //.log("queAns " + JSON.stringify(queAns));
    queAns['queAnsArray'].forEach((queAnsForMarks: any) => {
      marksArray.push(queAnsForMarks.marks)
      if (queAnsForMarks.marks > queAnsForMarks.maxMarks) {
        marksStatArr.push(false)
      }
      else {
        marksStatArr.push(true)
      }
    });
    queAns['queAnsArray'].forEach((queAnsNew: any) => {



      let reviewObjectStuAnswer: StudentAnswer = new StudentAnswer();
      reviewObjectStuAnswer.questionId = queAnsNew.questionId;
      reviewObjectStuAnswer.answerId = queAnsNew.answerId;
      reviewObjectStuAnswer.marks = parseFloat(queAnsNew.marks);
      reviewObjectStuAnswer.questionContent = queAnsNew.content1;
      reviewObjectStuAnswer.quizId = queAnsNew.questionQuizId;
      reviewObjectStuAnswer.studentId = queAnsNew.profileId;
      reviewObjectStuAnswer.teacherRemark = queAnsNew.reviewcontent;
      reviewObjectStuAnswer.selectedOption = false;
      //.log(queAnsNew.reviewcontent)

      this.questionAnswer.question = {} as Question;
      this.questionAnswer.question['questionId'] = queAnsNew.questionId;


      //.log(reviewObjectStuAnswer)

      // if(queAnsNew.marks != '')
      if (marksArray.includes('') == false) {
        if (marksStatArr.includes(false) == false) {
          // if( reviewObjectStuAnswer.marks <= queAnsNew.maxMarks){

          this.quizProgServ.addStudentAnswers(reviewObjectStuAnswer).subscribe(
            (response) => {
              // this.studentAnswers.push(response);
              // this.studentAnswers = response;

              //.log(response)
              //.log("Student answers saved");
              //.log(typeof this.totalReviewMarks)
              //.log(typeof reviewObjectStuAnswer.marks)
              if (queAnsNew.marks == '') {
                reviewObjectStuAnswer.marks = 0;
              }

              totalMarkslocal += reviewObjectStuAnswer.marks;
              // this.totalReviewMarks = this.totalReviewMarks + reviewObjectStuAnswer.marks;
              this.totalReviewMarks = totalMarkslocal
              this.submitClicked.emit(this.totalReviewMarks);
            },
            (error) => {
              //.log("Failed to save student answers");
            }
          );

        }
        else {
          if (!isFirstAlertDisplayed) {
            // alert("Please enter valid marks");
            this.dialogBoxServices.open("Please enter valid marks", 'information');
            queAns = [];
            isFirstAlertDisplayed = true;
          }
        }
      }

      else {
        if (!isSecondAlertDisplayed) {
          // alert("Please enter marks for all questions")
          this.dialogBoxServices.open("Please enter marks for all questions", 'information');
          queAns = [];
          isSecondAlertDisplayed = true;
        }
      }
    });






  }

  getFileIconClass(moduleFile: string): string {
    const fileExtension = moduleFile.substr(moduleFile.lastIndexOf('.') + 1).toLowerCase();
    if (fileExtension === 'pdf') {
      return 'fas fa-file-pdf';
    } else if (fileExtension === 'mp4' || fileExtension === 'avi' || fileExtension === 'mkv') {
      return 'fas fa-video';
    } else {
      return 'fa fa-file'; // Default icon class if the file type is unknown
    }
  }



}

// function ngOnInit() {
//   throw new Error('Function not implemented.');
// }



