import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Question } from 'app/question/class/question';

import { QuestionAllColumn, QuestionColumn } from 'app/question/column/question-column'

import { QuestionService } from 'app/question/services/question.service';
import { Quiz } from 'app/class/quiz';
import { Category } from 'app/class/category';
import { QuestionAnswer } from 'app/question/class/question-answer';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  // title heading
  moduleName: string = "Question Administration";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;
  // If all data is available or not
  dataAvailable: boolean = false;

  // QuestionHeader: any; // header for minimum visible column data
  // QuestionAllHeader: any;  // header for all visible column data

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'questionId';

  readonly dropdownColumnId1: string = 'quizId';
  readonly dropdownColumnName1: string = 'title';

  readonly dropdownColumnId2: string = 'categoryId';
  readonly dropdownColumnName2: string = 'categoryName';

  // Questions: Question[] = []; 
  allData: Question[] = []; // list of active question
  allInActiveData: Question[] = []; // list of inactive question

  emptyQuestion: Question;  // empty question
  currentData!: Question;  // for update and view, to show existing data

  sessionData: any;
  data: any;

  quizzes: Quiz[] = [];
  catagories: Category[] = [];

  file!: File;

  constructor(private service: QuestionService, private location: Location,private dialogBoxService:DialogBoxService) {

    // assigng headers
    // this.QuestionHeader = QuestionColumn;
    // this.QuestionAllHeader = QuestionAllColumn;

    this.columnNames = QuestionColumn;
    this.allColumnNames = QuestionAllColumn;

    // creating empty object
    this.emptyQuestion = new Question();

    this.loadCategories();
    this.loadQuizzes();
  }

  ngOnInit(): void {
    this.getAllQuestions();  // for getting all active questions
    this.getInActiveQuestions(); // for getting all inactive questions

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


  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.emptyQuestion.questionFigure = this.file.name;
    console.log(this.file);

  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
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
  onChildUpdateClick(objectReceived: Question): void {

    // hiding update screen and displaying all questions screen 
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Question): void {
    this.deleteQuestion(objectReceived.questionFigure);
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onChildActivateClick(objectReceived: Question): void {
    this.activateQuestion(objectReceived.questionFigure);
  }

  // on addComponents's submit button clicked
  onAddQuestionSubmit(objectReceived: QuestionAnswer): void {
    this.addQuestion(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateQuestionSubmit(objectReceived: Question) {
    this.updateQuestion(objectReceived);
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // for getting all questions
  private getAllQuestions() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service.getAllQuestions().subscribe(
      response => {

        this.allData = response; //assign data to local variable

        // if no data available
        if (this.allData.length > 0) {
          this.dataAvailable = true;
        }
      },
      error => {
        console.log('No data in table ');
      }
    );
  }


  // For adding question
  private addQuestion(questionAnswer: QuestionAnswer) {

    const instituteJson = JSON.stringify(questionAnswer);

    const blob = new Blob([instituteJson], {
      type: 'application/json'
    })

    let formData = new FormData();
    formData.append("file", this.file);
    formData.append("request", new Blob([JSON.stringify(questionAnswer)], { type: 'application/json' }));

    questionAnswer.question['questionIsActive'] = true;  // setting active true

    // calling service for adding data
    this.service.addQuestion(formData).subscribe(
      response => {
        this.dialogBoxService.open('Question Added successfully', 'information');
        // this.emptyQuestion = {} as Question;
        this.ngOnInit();
        this.back();
      },
      error => {
        this.dialogBoxService.open('Failed to add Question', 'warning');
      });
  }

  // For updating Question
  private updateQuestion(currentData: Question) {
    // calling service for updating data
    this.service.updatedQuestion(currentData).subscribe(
      response => {
        this.dialogBoxService.open('Question updated successfully', 'information');
        this.back();
      },
      error => {
        this.dialogBoxService.open('Failed to update Question', 'warning');
      }
    );
  }

  // For deleting (soft delete) question using questionFigure
  private deleteQuestion(questionFigure: string) {
    this.dialogBoxService.open('Are you sure you want to delete this Question ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
    // calling service to soft delete
    this.service.deleteQuestion(questionFigure).subscribe(
      (response) => {
        this.dialogBoxService.open('Question deleted successfully', 'information');
        this.ngOnInit();
      },
      (error) => {
        this.dialogBoxService.open('Question deletion Failed', 'warning');
      }
    );
  } else {
    console.log('User clicked Cancel');
    // Do something if the user clicked Cancel
  }
});
}

  // For getting all inactive questions
  private getInActiveQuestions() {

    // calling service to get all inactive record
    this.service.getInactiveQuestionsList().subscribe(
      response => {
        this.allInActiveData = response;
      },
      error => {
        console.log('No data in table ');
      }
    );

  }


  // For activating question using role id
  private activateQuestion(questionFigure: string) {

    // calling service to activating question
    this.service.activateQuestion(questionFigure).subscribe(
      response => {
        this.dialogBoxService.open('Question Activated', 'information');
        this.ngOnInit();
      },
      error => {
        this.dialogBoxService.open('Failed to Activate', 'warning');
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
        this.catagories.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err)
    }
  }






  /////////////////teacher Question components function///////////////






}
