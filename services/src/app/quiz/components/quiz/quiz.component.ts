import { Component, OnInit } from '@angular/core';
import { Quiz } from 'app/quiz/class/quiz';
import { TeacherQuizAllColumn, TeacherQuizColumn } from 'app/quiz/column-names/quiz-column';
import { QuizService } from 'app/quiz/services/quiz.service';
import { Location } from '@angular/common';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { ModuleService } from 'app/module/services/module.service';
import { CategoryService } from 'app/category/services/category.service';
import { Course } from 'app/teacher-course/class/course';
import { Module } from 'app/module/class/module';
import { Category } from 'app/category/class/category';
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

  //Display Column Names

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

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
  constructor(
    private quizService: QuizService,
    private location: Location,
    private courseService: TeacherCourseService,
    private moduleService: ModuleService,
    private categotyService: CategoryService
  ) {

    this.userRole = sessionStorage.getItem('userRole');
    // assigng headers
    this.columnNames = TeacherQuizColumn;
    this.allColumnNames = TeacherQuizAllColumn;

    // creating empty object
    this.emptyQuiz = new Quiz();


    //calling services for foreign key data (dropdown)
    this.loadAllCategories();
    // this.loadAllCourses();
    this.loadAllModules();
    this.profileId = sessionStorage.getItem('profileId');

  }


  ngOnInit(): void {
    this.getAllQuizzes();  // for getting all active Quizs
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

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Quiz): void {

    // hiding update screen and displaying all Quizs screen 
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
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
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
  }

  // on updateComponents's submit button clicked
  onUpdateQuizSubmit(objectReceived: Quiz) {
    this.updateRole(objectReceived);
  }


  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;
    } else {
      this.location.back();
    }
  }


  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // for getting all quizzes
  getAllQuizzes() {
    this.quizService.getAllQuizzes().subscribe(
      (data) => {
        this.allQuizData = data;
        console.log(data);

      },
      (error) => {
        alert('Quiz data not found');
      }
    );
  }


  // deleting quiz using title (soft delete)
  deleteQuiz(title: string) {
    this.quizService.deleteQuiz(title).subscribe(
      (data) => {

        alert('Data Deleted Successfully');
        this.ngOnInit();
      },
      (error) => {
        alert('Failed to delete quiz data');
      }
    );
  }

  // for adding quiz
  addQuiz(currentData: Quiz) {

    currentData.active = true;
    this.quizService.addQuiz(currentData).subscribe(
      data => {
        alert("Quiz added successfuly!")
        this.emptyQuiz = {} as Quiz;
        this.ngOnInit();
        this.back();

      }
      ,
      error => {
        alert("Failed to add quiz data!")
      }
    )

  }


  // for updating quiz using title
  private updateRole(currentData: Quiz) {
    // calling service for updating data
    this.quizService.updateQuiz(currentData.title, currentData).subscribe(
      response => {
        alert(`Quiz updated successfully !`);
        this.ngOnInit();
        this.back();
      },
      error => {
        alert(`Quiz updation failed !`);
      }
    );
  }


  // for getting all inactive quiz
  private getInActiveQuiz() {

    // calling service to get all inactive record
    this.quizService.getInactiveQuizList().subscribe(
      response => {
        this.allInActiveData = response;
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
        alert("Activated Quiz");
        this.ngOnInit();
      },
      error => {
        alert("Failed to activate");
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
      },
      error => {
        console.log(error);
      }
    );
  }
}
