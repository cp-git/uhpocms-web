import { Component, OnInit } from '@angular/core';
import { Quiz } from 'app/quiz/class/quiz';
import { TeacherQuizAllColumn, TeacherQuizColumn, TeacherQuizUpdateColumn } from 'app/quiz/column-names/quiz-column';
import { QuizService } from 'app/quiz/services/quiz.service';
import { Location } from '@angular/common';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { ModuleService } from 'app/module/services/module.service';
import { CategoryService } from 'app/category/services/category.service';
import { Course } from 'app/teacher-course/class/course';
import { Module } from 'app/module/class/module';
import { Category } from 'app/category/class/category';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  // title heading for Quiz
  moduleName: string = "Quiz";

  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  // for buttons to view
  showAddButton: boolean = true;
  showActivateButton: boolean = true;

  //Display Column Names

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  updateColumnNames: any;


  allColumnViewNames: any; // header for all visible column data

  emptyQuiz!: Quiz;  // empty Quiz
  currentData!: Quiz;  // for update and view, to show existing data

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'quizId';

  //Storing the Data in Array
  allQuizData: Quiz[] = []; // list of active Quiz
  allInActiveData: Quiz[] = []; // list of inactive Quiz

  profileId: any;

  courses: Course[] = [];
  modules: Module[] = [];
  categories: Category[] = [];
  userRole: any;
  titleWithUserRole: boolean = true;
  constructor(
    private quizService: QuizService,
    private location: Location,
    private courseService: TeacherCourseService,
    private moduleService: ModuleService,
    private categotyService: CategoryService,
    private dialogBoxService:DialogBoxService
  ) {

    this.userRole = sessionStorage.getItem('userRole');
    // assigng headers
    this.columnNames = TeacherQuizColumn;
    this.allColumnNames = TeacherQuizAllColumn;

    this.updateColumnNames = TeacherQuizUpdateColumn;


    // creating empty object
    this.emptyQuiz = new Quiz();
    //this.loadAllCourses();

    //calling services for foreign key data (dropdown)
    this.loadAllCategories();
    // this.loadAllCourses();
    this.loadAllModules();
    this.profileId = sessionStorage.getItem('profileId');

  }


  ngOnInit(): void {
    this.getInActiveQuiz(); // for getting all inactive Quizs
    this.getAssignedCoursesOfTeacher(this.profileId)

  }

  // function will call when child update button is clicked 
  onChildActivateClick(quiz: Quiz): void {
    this.activateQuiz(quiz);
  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all Quizs screen 
    this.viewOne = true;
    this.viewAll = false;
    this.showAddButton = false;
    this.showActivateButton = false;
// assingning data to current data for child component
    this.currentData = objectReceived;
    let time = objectReceived.setTimer;
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    this.currentData.setTimerInHours= hours;
    this.currentData.setTimerInMinutes= minutes;   
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Quiz): void {

    // hiding update screen and displaying all Quizs screen 
    this.viewAll = false;
    this.viewUpdate = true;
    this.showAddButton = false;
    this.showActivateButton = false;

    // assingning data to current data for child component
    this.currentData = objectReceived;
    let time = objectReceived.setTimer;
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    this.currentData.setTimerInHours= hours;
    this.currentData.setTimerInMinutes= minutes;

  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Quiz): void {
    this.deleteQuiz(objectReceived.title);
  }

  // on addComponents's submit button clicked
  onAddQuizSubmit(objectReceived: Quiz): void {
    this.addQuiz(objectReceived);
  }

  // for navigating to add screen
  onAddClick() {
    this.viewAll = false;
    this.viewAdd = true;
    this.showAddButton = false;
    this.showActivateButton = false;
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
    this.showAddButton = false;
    this.showActivateButton = false;
  }

  // on updateComponents's submit button clicked
  onUpdateQuizSubmit(objectReceived: Quiz) {
    this.updateQuiz(objectReceived);
  }


  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;

      this.showAddButton = true;
      this.showActivateButton = true;
    } else {
      this.location.back();
    }
  }


  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // for getting all quizzes
  getAllQuizzes(courses: Course[]) {
    this.quizService.getAllQuizzes().subscribe(
      response => {

        this.allQuizData = response;
        this.allQuizData = this.allQuizData.filter(data =>
          courses.map(
            course => course.courseId).includes(data.courseId));

        this.allQuizData.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1) // order by alphabets for title
        console.log("filtered daTA " + JSON.stringify(this.allQuizData));

      },
      (error) => {
        console.log('Quiz data not found');
      }
    );
  }


  // deleting quiz using title (soft delete)
  deleteQuiz(title: string) {
    this.dialogBoxService.open('Are you sure you want to delete this Quiz ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
    this.quizService.deleteQuiz(title).subscribe(
      (data) => {

        this.dialogBoxService.open('Quiz deleted successfully', 'information');
        this.ngOnInit();
      },
      (error) => {
        this.dialogBoxService.open('Quiz deletion Failed', 'warning');
      }
    );
  } else {
    console.log('User clicked Cancel');
    // Do something if the user clicked Cancel
  }
});
}

  // for adding quiz
  addQuiz(currentData: Quiz) {
    // Calculate the total timer duration in seconds
    console.log(JSON.stringify(currentData))
    const timerInSeconds = (currentData.setTimerInHours * 3600) + (currentData.setTimerInMinutes * 60);
    console.log(timerInSeconds);
    currentData.setTimer = timerInSeconds;
    
  
    // Set other properties and make the API call to add the quiz
    currentData.active = true;
    this.quizService.addQuiz(currentData).subscribe(
      data => {
        this.dialogBoxService.open('Quiz Added successfully','information')
        this.emptyQuiz = {} as Quiz;
        this.ngOnInit();
        this.back();
      },
      error => {
        this.dialogBoxService.open('Failed to add Quiz','warning')
      }
    );
  }
  

  // for updating quiz using title
  private updateQuiz(currentData: Quiz) {
    // Calculate the total timer duration in seconds
    const timerInSeconds = (currentData.setTimerInHours * 3600) + (currentData.setTimerInMinutes * 60);
    currentData.setTimer = timerInSeconds;
  
    // calling service for updating data
    this.quizService.updateQuiz(currentData.title, currentData).subscribe(
      response => {
        this.dialogBoxService.open('Quiz Updated successfully','information')
        this.ngOnInit();
        this.back();
      },
      error => {
        this.dialogBoxService.open('Quiz updation failed','warning')
      }
    );
  }


  // for getting all inactive quiz
  private getInActiveQuiz() {

    // calling service to get all inactive record
    this.quizService.getInactiveQuizList().subscribe(
      response => {
        this.allInActiveData = response;
        this.allInActiveData.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1) // order by alphabets for title

      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  // for activating quiz using title
  private activateQuiz(quiz: Quiz) {

    // calling service to activating Quiz
    this.quizService.updateActiveStatus(quiz.title, quiz).subscribe(
      response => {
        console.log("Activated Quiz");
        this.dialogBoxService.open('Quiz Activated','information')
        this.ngOnInit();
      },
      error => {
        this.dialogBoxService.open('Failed to Activate','warning')
      }
    );
  }

  // loading courses 
  private loadAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      error => {
        console.log("No courses loaded");
      }
    );
  }

  // loading modules 
  private loadAllModules() {
    this.moduleService.getAllModules().subscribe(
      (data) => {
        this.modules = data;
      },
      error => {
        console.log("No modules loaded");
      }
    )
  }

  // loading categories 
  private loadAllCategories() {
    this.categotyService._getAllCategorys().subscribe(
      (data) => {
        this.categories = data;
      },
      error => {
        console.log("No categories loaded");
      }
    )
  }

  //getting courses assigned to teacher using profileId
  private getAssignedCoursesOfTeacher(teacherId: number) {
    this.courseService.getAssignedCourseOfTeacher(teacherId).subscribe(
      (data) => {
        console.log(data);

        this.courses = data;
        this.getAllQuizzes(this.courses);  // for getting all active Quizs

      },
      error => {
        console.log(error);
      }
    );
  }
}
