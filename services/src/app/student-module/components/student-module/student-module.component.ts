import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleFile } from 'app/class/module-file';

import { Course } from 'app/teacher-course/class/course';
import { ModuleService } from 'app/module/services/module.service';
import { Location } from '@angular/common';
import { Module } from 'app/module/class/module';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { ModuleFileService } from 'app/module-file/services/module-file.service';
import { ModulefileprogressService } from 'app/student-module/services/modulefileprogress.service';
import { Modulefileprogress } from 'app/student-module/class/modulefileprogress';
import { Moduleprogress } from 'app/student-module/class/moduleprogress';
import { CourseProgress } from 'app/student-module/class/courseprogress';

import { QuizService } from 'app/quiz/services/quiz.service';
import { Quiz } from 'app/quiz/class/quiz';


@Component({
  selector: 'app-student-module',
  templateUrl: './student-module.component.html',
  styleUrls: ['./student-module.component.css']
})
export class StudentModuleComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false })
  videoPlayerRef!: ElementRef<HTMLVideoElement>;




  studentId: any;
  userName: any;
  courseId: any;
  moduleId: any;
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
  selectedQuiz!: Quiz;
  Date: any;

  flag: boolean = false;
  secondflag!: boolean;
  completionPercentage: number = 0;
  moduleFileArr: ModuleFile[] = [];
  modFileArrLen!: number;
  private currentTime!: number;
  modprogress!: number;
  progressArr: number[] = [];
  uniqueProgressArr: number[] = [];
  modulebasedArr: Modulefileprogress[] = [];
  fileProgress: Modulefileprogress[] = [];
  filteredFileProg: Modulefileprogress[] = [];
  moduleProgress: Moduleprogress = new Moduleprogress;
  filteredProgressFileIds: number[] = [];

  refVar: number = 0;
  statusModuleProg: Moduleprogress = new Moduleprogress;
  statusModuleProgArr: number[] = [];
  unistatusModuleProgArr: number[] = [];
  updatedPercentage: number = 0;
  courseProgress: CourseProgress = new CourseProgress();
  moduleProgressArr: Moduleprogress[] = [];
  moduleArr: Module[] = [];
  couresFlag: boolean = false;
  fileFlag: boolean = false;


  constructor(private activateRoute: ActivatedRoute, private courseService: TeacherCourseService, private moduleService: ModuleService, private modulefileService: ModuleFileService,
    private fileProgService: ModulefileprogressService, private _location: Location, private elRef: ElementRef, private modFileServc: ModuleFileService, private quizService: QuizService, private cdr: ChangeDetectorRef) {

  }



  ngOnInit(): void {
    // this.videoPlayer;


    this.studentId = this.activateRoute.snapshot.paramMap.get('id');
    this.userName = this.activateRoute.snapshot.params['userName'];
    this.loadCourseOfStudent(this.studentId);

    // console.log(this.courses)
    // console.log(this.statusModuleProg.moduleId);


    this.getAllQuizzesByProfileId(this.studentId);
    this.getAllFileProgress();

    this.selectedCourse = '1'

    // this.trackModuleProgress(this.selectedCourse)
    this.filterUniqueModuleIds();
    // this.chkCoursePogress(this.selectedCourse);

    console.log("modules" + this.getFilteredModules());

  }


  loadCourseOfStudent(studentId: number) {
    this.courseService.getCourseByStudentId(studentId).subscribe(
      response => {
        this.courses = response;
        this.loadModuleOfCourse(this.courses);
        this.selectedCourseName = this.courses[0].courseName;
        this.selectedCourse = this.courses[0].courseId;

        // console.log(this.courses)

        try {
          this.couresFlag = false;
          this.trackModuleProgress(this.selectedCourse)
          this.chkCoursePogress(this.selectedCourse)


        }
        catch (e) {
          console.log(e)
        }


      },
      error => {
        console.log(error);

      }
    );
    console.log(this.courses)
    console.log(this.selectedCourse);


  }

  onVideoTimeUpdate() {



    console.log("this.updatedPercentage")
    console.log(this.updatedPercentage)

    //initialize flag to false
    this.flag = false
    this.flag = false;

    //video element from html
    const videoElement: HTMLVideoElement = this.videoPlayerRef.nativeElement;
    const videoDuration = videoElement.duration;
    const currentTime = videoElement.currentTime;


    let percentage = (currentTime / videoDuration) * 100;

    //percentage


    percentage = Math.trunc(percentage);

    if (percentage % 20 == 0) {
      this.completionPercentage = percentage;
    }

    console.log(`Video completion percentage: ${this.completionPercentage}%`);

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

            // this.uniquemofileprogarr = this.updatedModuleFileProgressArr.filter((value, index, self) => self.indexOf(value) === index);
            console.log(this.fileIdArr)
            console.log(this.uniqueFileIdArr)
          }

        }
      )


      //   console.log("outside loop")

      console.log(this.uniqueFileIdArr)
      console.log("result value")
      console.log(this.newModuleFileProgressArr)
      console.log(this.uniqueFileIdArr.includes(this.selectedFile.moduleFileId))


      if (this.uniqueFileIdArr.includes(this.selectedFile.moduleFileId) == true) {
        //loop through filtered module file progress array
        console.log("ffggfgffgf")
        for (let k = 0; k < this.newModuleFileProgressArr.length; k++) {
          // console.log(this.selectedFile.moduleFileId)
          // console.log(this.updatedModuleFileProgressArr[k])


          if (this.selectedFile.moduleFileId === this.newModuleFileProgressArr[k].fileId) {

            // console.log(this.updatedModuleFileProgressArr[k])
            console.log("  if(this.selectedFile.moduleFileId == this.fileIdArr[i] )")
            this.moduleFileProgress = this.newModuleFileProgressArr[k];
            this.flag = true;
            k = this.newModuleFileProgressArr.length;
            //  console.log(this.moduleFileProgress)
          }
          // console.log("outside flag value")
          // console.log(this.flag)'
          console.log("this.moduleFileProgress outside")
          console.log(this.moduleFileProgress)
          //if flag is true
          if (this.flag == true) {

            // console.log("Entered in flag loop")


            if (this.moduleFileProgress.progress == 100) {
              console.log("Enered in  this.moduleFileProgress.progress == 10")
              // alert("reached 100")


              console.log("this.fileFlag = true;")
              console.log(this.moduleFileProgress)
              let moduleArr: ModuleFile[] = [];


              this.modulefileService.getModuleFilesByModuleId(this.selectedModule.moduleId).subscribe(
                (response) => {

                  moduleArr = response;
                  this.getAllFileProgress();
                }
              )
              console.log(moduleArr.length);
              console.log(" if (this.moduleFileProgress.progress == 100)")


              this.fileProgService.getAllFileProgressByModIdStudIdProg(this.selectedModule.moduleId, this.studentId).subscribe(
                (response) => {

                  this.modulebasedArr = response;

                }
              )
              if (moduleArr.length == this.modulebasedArr.length) {
                console.log("moduleArr.length == this.modulebasedArr.length")


                this.moduleProgress.moduleId = this.selectedModule.moduleId;
                this.moduleProgress.courseId = this.selectedCourse;
                this.moduleProgress.studentId = this.studentId;
                this.moduleProgress.progress = 100;

                //service to save data in module progress table
                this.fileProgService.addModuleProgressStatus(this.moduleProgress).subscribe(
                  (reponse) => {

                    this.trackModuleProgress(this.selectedCourse);
                    this.filterUniqueModuleIds()

                  }
                )



              }

              console.log(" this.trackCourseProgress() called")
              this.trackCourseProgress(this.selectedCourse);



            }

            //cond. to update moduleprogress table
            else if ((this.moduleFileProgress.progress < 100 || this.completionPercentage == 100) && (this.completionPercentage > this.moduleFileProgress.progress)) {
              this.moduleFileProgress.progress = this.completionPercentage;

              this.moduleFileProgress.currentFilePageNo = 1
              console.log("Entered in else if loop")
              console.log("Value caught true");
              console.log(this.moduleFileProgress.progress)
              this.fileProgService.updatedModuleFileProgress(this.moduleFileProgress).subscribe(
                response => {
                  // alert("file status saved successfully through put method");

                  this.getAllFileProgress();
                }

              )




            }







          }


        }
      }
      //if file not present in table enter new entry
      else if (this.uniqueFileIdArr.includes(this.selectedFile.moduleFileId) == false) {
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

            return true;
          }
        )
      }

      // })
    }



  }

  pauseVideo() {
    this.videoPlayerRef.nativeElement.pause(); // Pause the video
  }



  videoEnd() {
    this.flag = false;

    console.log(File);
    this.changeSelectedFileAndModule(this.selectedFile, this.selectedModule)
    console.log(this.selectedFile)
    console.log(this.selectedModule)
    console.log(this.studentId)

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
    console.log("onSelectedFileChanged() called")
    this.updatedPercentage = 0;
    this.completionPercentage = 0;
    console.log(this.updatedPercentage)

  }
  //Loads the modules of the courses using the getModuleByCourseId() method of StudentService
  loadModuleOfCourse(studentCourses: Course[]) {

    studentCourses.forEach(course => {

      this.moduleService.getModuleByModuleId(course.courseId).subscribe(
        response => {
          response.forEach(module => {
            this.modules.push(module);
            console.log(module)
            if (this.selectedCourse.courseId == module.courseId_id) {
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
        alert("Failed to load student course");
      }
    );

  }

  //sets the selected course by the student and resets the selected module
  onCourseSelect(courseId: any) {
    this.changeSelectedCourseName(courseId);

    this.selectedCourse = courseId;
    this.selectedModule = undefined;
    console.log(this.selectedCourse);
    console.log(this.selectedModule);



  }


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
    this.quizzes.filter(quiz => quiz.moduleId == module.moduleId)
    this.onSelectedFileChanged();


  }



  trackModuleProgress(courseId: number) {
    // console.log("Called")
    // let moduleId: number;
    // this.moduleService.getModuleByModuleId(courseId).subscribe(
    //   response => {
    //     console.log("Inside getModuleByModuleId(courseId)")
    //     response.forEach(module => {
    //       this.modules.push(module);
    //       console.log(module);
    //       console.log(courseId)
    //       if (courseId == module.courseId_id) {
    //         this.selectedModule = module;
    //         console.log(module.courseId_id)

    //         try {

    //           this.fileProgService.getModuleProgressByModIdStudId(module.moduleId, this.studentId).subscribe(
    //             (response) => {

    //               this.statusModuleProg = response;
    //               console.log(this.statusModuleProg)
    //               this.statusModuleProgArr.push(this.statusModuleProg.moduleId)
    //               this.filterUniqueModuleIds();
    //             }

    //           )

    //         }
    //         catch (e) { }
    //       }
    //     })


    //   })
    // console.log(this.statusModuleProgArr);
    // this.unistatusModuleProgArr = this.statusModuleProgArr.filter((value, index, self) => self.indexOf(value) === index);

    // console.log(this.unistatusModuleProgArr);

  }


  filterUniqueModuleIds() {
    // Filter and store unique values in unistatusModuleProgArr
    this.unistatusModuleProgArr = this.statusModuleProgArr.filter((value, index, self) => self.indexOf(value) === index);
    console.log(this.unistatusModuleProgArr);
  }

  trackCourseProgress(courseId: number) {


    this.moduleService.getModulesByCourseId(courseId).subscribe(
      (response) => {

        this.moduleArr = response;

      })


    this.fileProgService.getModuleProgByCourseId(courseId).subscribe(
      (response) => {

        this.moduleProgressArr = response;

      }
    )

    if (this.moduleArr.length == this.moduleProgressArr.length) {
      this.courseProgress.id = 0;
      this.courseProgress.courseId = this.selectedCourse;
      this.courseProgress.studentId = this.studentId;
      this.courseProgress.currentAssignNo = 1;
      this.courseProgress.currentModuleNo = 1;
      this.courseProgress.currentUnitNo = 1;
      this.courseProgress.grade = 100;
      this.courseProgress.progress = 100;
      this.fileProgService.addCourseProgressStatus(this.courseProgress).subscribe(
        (response) => {

        }
      )

      this.chkCoursePogress(this.selectedCourse);
    }
  }


  chkCoursePogress(courseId: number) {

    console.log(this.selectedCourse)
    try {
      this.fileProgService.getCourseProgByCourseIdStudId(courseId, this.studentId).subscribe(
        (response) => {
          this.couresFlag = true;

          console.log("courseFlag value" + this.couresFlag)

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

        this.cdr.detectChanges();
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

  onQuizClicked(quiz: Quiz) {
    this.selectedFile = '';
    this.selectedQuiz = quiz;
  }

}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

