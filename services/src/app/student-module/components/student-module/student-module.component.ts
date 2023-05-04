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

import { QuizProgress } from 'app/quiz-progress/class/quiz-progress';
import { QuizProgressService } from 'app/quiz-progress/services/quiz-progress.service';
import { map, switchMap } from 'rxjs/operators';
import { StudentQuizComponent } from '../student-quiz/student-quiz.component';



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
  trackedModule: any; //stores the selected module by the student.
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

  fileProgress: Modulefileprogress[] = [];
  filteredFileProg: Modulefileprogress[] = [];

  moduleArrCopy: ModuleFile[] = [];
  modFileProgressCopy: Modulefileprogress[] = [];
  modulebasedArr: Modulefileprogress[] = [];
  moduleProgress: Moduleprogress = new Moduleprogress;
  filteredProgressFileIds: number[] = [];

  refVar: number = 0;
  statusModuleProg: Moduleprogress = new Moduleprogress;
  updatedModuleProgress : Moduleprogress = new Moduleprogress;
  statusModuleProgArr: number[] = [];
  unistatusModuleProgArr: number[] = [];
  updatedPercentage: number = 0;
  courseProgress: CourseProgress = new CourseProgress();
  moduleProgressArr: Moduleprogress[] = [];
  moduleArr: Module[] = [];
  couresFlag: boolean = false;
  fileFlag: boolean = false;

  modulePercentage: number = 0;
  quizIdArr1 : number[] =[];
  quizIdArr2: number[] =[];
  quizPassedProgresses: any[] = [];
  quizFailedProgresses: any[] = [];
  couIdArrInCouProg :number[] =[];
  existingCourseProg: CourseProgress=  new CourseProgress();
 
  moduleArray : Module[] = [];
  moduleProgArray : Moduleprogress[] = [];

  constructor(private activateRoute: ActivatedRoute, private courseService: TeacherCourseService, private moduleService: ModuleService, private modulefileService: ModuleFileService, private quizProgServ: QuizProgressService,
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
    this.getQuizPorgressesByStudentId(this.studentId);
    // this.selectedCourse = '1'

    // this.trackModuleProgress(this.selectedCourse)
    this.filterUniqueModuleIds();
    // this.chkCoursePogress(this.selectedCourse);
    // this.trackCourseProgress(this.selectedCourse)
    // console.log("modules" + this.getFilteredModules());
    
    
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['selectedFile']) {
  //     console.log("")
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

        console.log( this.selectedCourse)

        try {
          this.couresFlag = false;
          this.trackModuleProgress(this.selectedCourse)
          this.trackCourseProgress(this.selectedCourse)

          // this.chkCoursePogress(this.selectedCourse)


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

            // this.uniquemofileprogarr = this.updatedModuleFileProgressArr.filter((value, index, self) => self.indexOf(value) === index);
            // console.log(this.fileIdArr)
            // console.log(this.uniqueFileIdArr)
          }

        }
      )


      //   console.log("outside loop")

      // console.log(this.uniqueFileIdArr)
      // console.log("result value")
      // console.log(this.newModuleFileProgressArr)
      // console.log(this.uniqueFileIdArr.includes(this.selectedFile.moduleFileId))


      if (this.uniqueFileIdArr.includes(this.selectedFile.moduleFileId) == true) {
        //loop through filtered module file progress array
        // console.log("ffggfgffgf")
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
              this.moduleProgresscCeateUpdate(this.selectedModule.moduleId);
              console.log(this.selectedModule)
              // this.getAllQuizzesByModuleId(this.selectedModule.moduleId);
              // console.log(this.quizIdArr1);
              // this.getAllQuizProgress(this.selectedModule.moduleId).subscribe((quizIds) => {
              // console.log(quizIds);
              // });
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
                  if(modFileProg.progress == 100)
                  {
                  //function to generate tick mark or to loop throgh file progress again
                  this.getAllFileProgress();
                  this.moduleProgresscCeateUpdate(this.selectedModule.moduleId);
                  // console.log(this.selectedModule.mooduleId)
                  // this.getAllQuizzesByModuleId(this.selectedModule.moduleId);
                  // console.log(this.quizIdArr1);
                  // this.getAllQuizProgress(this.selectedModule.moduleId).subscribe((quizIds) => {
                  //   console.log(quizIds);
                  // });
                  
                  }
                  console.log("inside updatedModuleFileProgress")
                  ///////////////////////////////////////////////////////

                  // this.moduleProgresscCeateUpdate();

                  ////////////////////////////////////////////////


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

            //function to generate tick mark or to loop throgh file progress again
            // this.getAllFileProgress();

            console.log("inside addFileProgressStatus")

            ///////////////////////////////////////////////////////

            // this.moduleProgresscCeateUpdate();


            /////////////////////////////////////////////////


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


//function to check if given module id and student id already exist in moduleprogress table
  trackModuleProgress(courseId: number) {
    this.statusModuleProg ;
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
              this.fileProgService.getModuleProgressByModIdStudId(module.moduleId, this.studentId).subscribe(
                (response) => {

                  //ModuleProgress Entity
                  this.statusModuleProg = response;
                  if(this.statusModuleProg.progress == 100)
                  {
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

  existingmoduleProgress(moduleId:number,courseId:number){

    console.log(moduleId)
    this.fileProgService.getModuleProgressByModIdStudId(moduleId, this.studentId).subscribe(
      (response) => {

        //ModuleProgress Entity
        this.updatedModuleProgress = response;

        if(this.updatedModuleProgress.progress == 100)
        {
          this.trackCourseProgress(courseId)
        }
      })
  }

  filterUniqueModuleIds() {
    // Filter and store unique values in unistatusModuleProgArr
    this.unistatusModuleProgArr = this.statusModuleProgArr.filter((value, index, self) => self.indexOf(value) === index);
    console.log(this.unistatusModuleProgArr);
  }

 

  trackCourseProgress(courseId: number) {

    let moduleArray : Module[] = [];
    let moduleProgArray : Moduleprogress[] = [];

   
   this.chkCoursePogress(courseId);
    this.moduleService.getModulesByCourseId(courseId).subscribe(
      (response) => {

        moduleArray = response;
        
        console.log(response)
        this.moduleArray = moduleArray;
    
      

    this.fileProgService.getModuleProgByCourseId(courseId).subscribe(
      (response) => {
        console.log(this.selectedCourse)
        moduleProgArray= response;

        this.moduleProgArray = moduleProgArray.filter((array)=>array.studentId == this.studentId && array.progress == 100 )
        console.log(response)
     
   
    console.log("moduleProgArray.length "+this.moduleProgArray.length+"moduleProgArray.length "+ this.moduleArray.length)
    if ((this.moduleProgArray.length <= this.moduleArray.length) &&  this.moduleProgArray.length != 0) {

      console.log(this.existingCourseProg)
console.log("if ((this.moduleProgArray.length <= this.moduleArray.length) &&  this.moduleProgArray.length != 0)")

console.log(this.existingCourseProg)
      if(this.existingCourseProg.courseId != courseId)
      {
        console.log("if(this.existingCourseProg.courseId != courseId && this.existingCourseProg.studentId != this.studentId)")
        
      this.courseProgress.id = 0;
      this.courseProgress.courseId = this.selectedCourse;
      this.courseProgress.studentId = this.studentId;
      this.courseProgress.currentAssignNo = 1;
      this.courseProgress.currentModuleNo = 1;
      this.courseProgress.currentUnitNo = 1;
      this.courseProgress.grade = 100;
      this.courseProgress.progress = (this.moduleProgArray.length*100)/this.moduleArray.length;
      this.fileProgService.addCourseProgressStatus(this.courseProgress).subscribe(
        (response) => {

        }
      )

     }
     

      else if((this.existingCourseProg.courseId == courseId) && (this.existingCourseProg.studentId == this.studentId))
      {
        console.log(" else if(this.existingCourseProg.courseId === courseId && this.existingCourseProg.studentId === this.studentId)")
        this.existingCourseProg.progress = (this.moduleProgArray.length*100)/this.moduleArray.length;
        
        this.fileProgService.updateCourseProgress(this.existingCourseProg).subscribe(
          (response)=>{}
        )

      }
    }
  }
    ) }
      
    )
  }


  chkCoursePogress(courseId: number) {

   

    console.log(this.selectedCourse)
    try {
      this.fileProgService.getCourseProgByCourseIdStudId(courseId, this.studentId).subscribe(
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

  private moduleProgresscCeateUpdate(moduleId:number) {
    console.log("Entered in moduleProgresscCeateUpdate()")
    let updatedModuleProgress :Moduleprogress = new Moduleprogress;
    let moduleArr: ModuleFile[] = [];
    let modFileProgress: Modulefileprogress[] = [];
    this.existingmoduleProgress(moduleId,this.selectedCourse);
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

        console.log("this.quizIdArr2.length " +this.quizIdArr2.length +" this.modFileProgressCopy.length"+ this.modFileProgressCopy.length)
        console.log(" arr2Len   "+  arr2Len)
        console.log("this.quizIdArr1.length " +this.quizIdArr1.length +" this.moduleArrCopy.length"+ this.moduleArrCopy.length)
        console.log(" arr1Len   "+  arr1Len)

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
            
            this.updatedModuleProgress.progress= this.modulePercentage;

            console.log(" this.statusModuleProg.progress ")
            console.log(this.statusModuleProg)

            this.fileProgService.updateModuleProgress(this.updatedModuleProgress).subscribe(
              (response) => {

                this.existingmoduleProgress(moduleId,this.selectedCourse);
                console.log(this.updatedModuleProgress)
              }

            )

          }

          else if (this.updatedModuleProgress.moduleId != moduleId) {
          //   else if (this.unistatusModuleProgArr.includes(moduleId) == false){
            console.log(" else if (this.unistatusModuleProgArr.includes(this.selectedModule.moduleId) == false) ")
            console.log(this.moduleProgress)

            //service to save data in module progress table
            this.fileProgService.addModuleProgressStatus(this.moduleProgress).subscribe(
              (reponse) => {
                this.existingmoduleProgress(moduleId,this.selectedCourse);

                // this.trackModuleProgress(this.selectedCourse);
                // this.filterUniqueModuleIds()

              }
            )

          }
        // })






///////////////////////////////




///////////////

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
   let  quizArr : Quiz[] = [];
    this.quizService.getAllQuizzesByModuleId(moduleId).subscribe(
      (data: Quiz[]) => {
        quizArr = data;

      // Map the quiz array to an array of quiz IDs
      this.quizIdArr1 = quizArr.map(quiz => quiz.quizId);

      }
    )
  }

  // all data from quizprogress table
private getAllQuizProgress(moduleId:number){
  
  let quizprogress:QuizProgress[] =[];
  let filteredQuizProgressId:number[] = [];
  let completedQuizProgressId:number[] = [];
  // return this.quizProgServ.getAllQuizProgressdata().pipe(
  //   // Filter quiz progress by student ID and completed status
  //   map((quizProgress) => quizProgress.filter((prog) => prog.studentId === this.studentId && prog.completed === true)),
  //   // Extract quiz IDs from filtered quiz progress array
  //   map((filteredQuizProgress) => filteredQuizProgress.map((prog) => prog.quizId)),
  //   // Merge the quiz ID array with this.quizIdArr1
  //   // switchMap((completedQuizIds) => this.quizService.getAllQuizzesByModuleId(moduleId).pipe(
  //   //   map((quizzes) => [...this.quizIdArr1, ...quizzes.filter((quiz) => completedQuizIds.includes(quiz.quizId)).map((quiz) => quiz.quizId)])
  //   // ))

  this.quizProgServ.getAllQuizProgressdata().subscribe(
    (response)=>{
   quizprogress = response.filter((prog) => prog.studentId == this.studentId && prog.completed == true);
      // Extract quiz IDs from filtered quiz progress array'
      
   filteredQuizProgressId = quizprogress.map((prog) => prog.quizId);
   console.log(response)
   console.log(quizprogress)
   console.log(filteredQuizProgressId)
   
   console.log(this.quizIdArr1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
this.quizIdArr2  = filteredQuizProgressId.filter(element => this.quizIdArr1.includes(element));
console.log(this.quizIdArr2)
    }
  )
   
  
}
onQuizProgressAdded(addeedQuizProgress: any) {
  console.log(addeedQuizProgress);
  let  quizArr : Quiz[] = [];
  let filteredQuizArr : Quiz[] = [];
  let moduleIdArr : number[] = [];
    this.quizService.getAllQuizzes().subscribe(
      (data: Quiz[]) => {
        quizArr = data;
        filteredQuizArr = quizArr.filter((array)=>array.quizId == addeedQuizProgress.quizId)
      
      // Map the quiz array to an array of quiz IDs
      moduleIdArr = filteredQuizArr.map(quiz => quiz.moduleId);

      console.log(moduleIdArr[0])
      
     
    console.log(moduleIdArr[0])
  // handle the emitted value here
  if(addeedQuizProgress.completed == true)
  {
  this.moduleProgresscCeateUpdate( moduleIdArr[0]);
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

  }

  removeElementFromStringArray(array: any[], element: any) {
    array.forEach((value, index) => {
      if (value == element) array.splice(index, 1);
    });
    return array;
  }
}

function ngOnInit() {
  throw new Error('Function not implemented.');
}



