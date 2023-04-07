import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Quiz } from 'app/quiz/class/quiz';
import { Category } from 'app/category/class/category';
import { Course } from 'app/teacher-course/class/course';
import { Module } from 'app/module/class/module';
import { Question } from 'app/question/class/question';
import { QuestionAllColumn, QuestionColumn } from 'app/question/column/question-column';
import { QuestionService } from 'app/question/services/question.service';
import { Answer } from 'app/question/class/answer';
import { NgForm } from '@angular/forms';
import { QuestionAnswer } from 'app/question/class/question-answer';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';

@Component({
  selector: 'app-add-question-answer',
  templateUrl: './add-question-answer.component.html',
  styleUrls: ['./add-question-answer.component.css']
})
export class AddQuestionAnswerComponent implements OnInit {
  @ViewChild('myForm') myForm: NgForm | undefined; // Access the form using ViewChild

  // for pagination 
  currentPage = 1;

  // title heading
  moduleName: string = "Question Administration";

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  allData: Question[] = []; // list of active question
  allInActiveData: Question[] = []; // list of inactive question

  emptyAnswer: Answer;
  emptyQuestion: Question;  // empty question
  currentData!: Question;  // for update and view, to show existing data


  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'questionId';

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  sessionData: any;
  data: any;

  quizzes: Quiz[] = [];
  categories: Category[] = [];
  courses: Course[] = [];
  modules: Module[] = [];

  selectedCourseId: any;
  selectedModuleId: any;
  selectedCategoryId: any;
  selectedQuizId: any;

  currentQuestions: Question[] = [];
  currentAnswers: Answer[] = [];

  questionAnswers: QuestionAnswer[] = [];
  questionAnswer: QuestionAnswer;  // empty question

  selectedQuiz: any

  profileId: any;
  constructor(private location: Location,
    private service: QuestionService,
    private courseService: TeacherCourseService
  ) {
    // 
    this.profileId = sessionStorage.getItem('profileId');
    this.columnNames = QuestionColumn;
    this.allColumnNames = QuestionAllColumn;

    // creating empty object
    this.emptyQuestion = new Question();
    this.emptyAnswer = new Answer();

    this.questionAnswer = new QuestionAnswer();
    this.loadCategories();
    this.loadQuizzes();
    this.loadCourses();
    this.loadModules();
    const str = '2024-07-21';

    const date = new Date(str);
    // this.emptyQuestion = {
    //   "questionId": 33, "questionFigure": "figure1", "questionContent": "What is Addition of 2 and 3?", "questionExplanation": "sum of 2 and 3", "questionOrderNo": 0, "questionIsMCQ": false, "questionQuizId": 90, "questionCategoryId": 2, "questionIsActive": true, "questionCreatedBy": "admin", "questionCreatedOn": date, "questionModifiedBy": "admin", "questionModifiedOn": date
    // }
    // this.currentQuestions.push(this.emptyQuestion);
  }

  ngOnInit(): void {
    // this.getAllQuestions();  // for getting all active questions
    // this.getInActiveQuestions(); // for getting all inactive questions
  }

  onFormSubmit(queAns: QuestionAnswer): void {
    this.questionAnswer = {} as QuestionAnswer;

    // Form is valid, do something with the form data
    // console.log(form.value);

    this.questionAnswer = queAns;
    // separating question from object 
    this.emptyQuestion.questionContent = this.questionAnswer.questionContent;
    this.emptyQuestion.questionExplanation = this.questionAnswer.questionExplanation;
    this.emptyQuestion.questionOrderNo = this.questionAnswer.questionOrderNo;
    this.emptyQuestion.questionIsMCQ = false;
    this.emptyQuestion.questionQuizId = this.selectedQuizId;
    this.emptyQuestion.questionCategoryId = this.selectedQuiz.categoryId;
    this.emptyQuestion.questionIsActive = true;

    // separating answer from object
    this.emptyAnswer = {} as Answer;

    this.emptyAnswer.content = this.questionAnswer.answerContent;
    this.emptyAnswer.correct = true;
    this.emptyAnswer.questionorderno = this.questionAnswer.questionOrderNo;


    console.log(this.emptyQuestion);
    console.log(this.emptyAnswer);

    // this.service.addQuestion(this.emptyQuestion).subscribe(
    //   (response) => {
    //     this.emptyQuestion = response;
    //     this.emptyAnswer.questionid = this.emptyQuestion.questionId;
    //     this.service.addAnswer(this.emptyAnswer).subscribe(
    //       (response) => {
    //         alert("Question Added Successfully");
    //       },
    //       (error) => {
    //         alert("Question added but failed to assign answer;")
    //       }
    //     )
    //   },
    //   (error) => {
    //     alert("failed to add Question");
    //   }
    // )




    // this.questionAnswers.forEach(queAns => {
    //   this.emptyQuestion.questionContent = queAns.questionContent;
    //   this.emptyQuestion.questionExplanation = queAns.questionExplanation;
    //   this.emptyQuestion.questionExplanation = queAns.questionExplanation;

    //   this.currentQuestions.push(

    //   )
    // })
    // ... other form submission logic ...
    // }
  }

  onChangeCourse() {
    this.selectedModuleId = undefined;
    this.selectedQuiz = {} as Quiz;
    this.selectedQuizId = undefined;
    this.allData = []
  }

  onChangeModule() {
    this.selectedQuiz = {} as Quiz;
    this.selectedQuizId = undefined;
    this.allData = []
  }

  onChangeSelectedQuiz() {
    this.selectedQuiz = this.quizzes.find(quiz => quiz.quizId == this.selectedQuizId);
    // this.currentQuestions.length = this.selectedQuiz.maxQuestions;
    this.currentAnswers.length = this.selectedQuiz.maxQuestions;
    this.initialiseQuestion(this.selectedQuiz.maxQuestions);
    this.service.getAllQuestionsByQuizId(this.selectedQuizId).subscribe(
      response => {
        this.allData = response; //assign data to local variable
      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  private initialiseQuestion(length: number) {
    this.questionAnswers = [];
    for (let i = 0; i < length; i++) {
      this.questionAnswers.push(new QuestionAnswer);
    }
  }
  // for navigating to add screen
  onAddClick() {
    this.viewAll = false;
    this.viewAdd = true;
  }

  // back button functionality
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


  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
  }

  onSubmitClicked(currentQuestions: Question[], currentAnswers: Answer[]) {

  }

  onCategoryChange(categoryId: any) {
    this.selectedQuiz = {} as Quiz;
    this.selectedQuizId = 'undefined';
  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all questions screen 
    this.viewOne = true;
    this.viewAll = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Question): void {
    this.deleteQuestion(objectReceived.questionFigure);
  }



  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // for getting all questions
  private getAllQuestions() {

    // calling service to get all data
    this.service.getAllQuestions().subscribe(
      response => {

        this.allData = response; //assign data to local variable

      },
      error => {
        console.log('No data in table ');
      }
    );
  }


  // For adding question
  private addQuestion(currentData: Question) {

    currentData.questionIsActive = true;  // setting active true

    // calling service for adding data
    this.service.addQuestion(currentData).subscribe(
      response => {
        alert('Question added Successfully');
        this.emptyQuestion = {} as Question;
        this.ngOnInit();
        this.back();
      },
      error => {
        alert("Failed to add question");
      });
  }

  // For deleting (soft delete) question using questionFigure
  private deleteQuestion(questionFigure: string) {

    // calling service to soft delete
    this.service.deleteQuestion(questionFigure).subscribe(
      (response) => {
        alert('Question deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        alert('Question deletion failed');
      }
    );
  }




  /////////////////////////////////////
  // Dropdown data function calls
  ////////////////////////////////////

  private loadQuizzes() {
    try {
      this.sessionData = sessionStorage.getItem('quiz');

      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.quizzes.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err);
    }
  }

  private loadCategories() {
    try {
      this.sessionData = sessionStorage.getItem('category');

      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.categories.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err)
    }

  }
  private loadCourses() {
    // try {
    //   this.sessionData = sessionStorage.getItem('course');

    //   this.data = JSON.parse(this.sessionData);
    //   for (var inst in this.data) {
    //     this.courses.push(this.data[inst]);
    //   }
    // }
    // catch (err) {
    //   console.log("Error", err)
    // }

    this.courseService.getAssignedCourseOfTeacher(this.profileId).subscribe(
      (data) => {
        console.log(data);

        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );

  }

  private loadModules() {

    try {
      this.sessionData = sessionStorage.getItem('module');

      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.modules.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err)
    }

  }
}
