import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/class/category';
import { Quiz } from 'app/class/quiz';
import { Question } from '../question';
import { QuestionService } from '../service/question.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  question = new Question();
  _question: Question[] = [];
  inActivationScreenStatus: boolean = false;
  activationScreenStatus: boolean = false;
  backupQuesiton = new Map();

  //Creating array
  category: Category[] = [];
  quiz: Quiz[] = [];

  sessionData: any;
  data: any;

  //Empty row
  isHidden: boolean = true;

  constructor(
    private _service: QuestionService,
    private _activeRoute: ActivatedRoute,
    private _route: Router,
    private location: Location
  ) { }


  //Function for adding question 
  insertQuestion(que: Question) {
    this.question = {} as Question;
    this.question.questionFigure = que.questionFigure;
    this.question.questionContent = que.questionContent;
    this.question.questionExplanation = que.questionExplanation;
    this.question.questionOrderNo = que.questionOrderNo;
    this.question.questionIsMCQ = que.questionIsMCQ;
    this.question.questionQuizId = que.questionQuizId;
    this.question.questionCategoryId = que.questionCategoryId;
    this.question.questionIsActive = que.questionIsActive;

    this.question.questionId = null;

    this._service.addQuestion(this.question).subscribe(
      (data) => {

        this.question = data;
        if (this.backupQuesiton.size > 0) {
          this._question[this._question.indexOf(que)] = Object.assign(
            {},
            this.backupQuesiton.get(que.questionId)
          );
        }
        this._question.push(this.question);
        this.backupQuesiton.set(
          this.question.questionId,
          Object.assign({}, this.question)
        );
        if (this._question.length > 0) {
          this.isHidden = false;
        }
        alert('Question added Successfully');
      },
      (error) => alert('please enter valid details')
    );
  }


  //Function for updating question 
  updateQuestion(que: Question) {
    this.question.questionId = que.questionId;
    this.question.questionFigure = que.questionFigure;
    this.question.questionContent = que.questionContent;
    this.question.questionExplanation = que.questionExplanation;
    this.question.questionOrderNo = que.questionOrderNo;
    this.question.questionIsMCQ = que.questionIsMCQ;
    this.question.questionQuizId = que.questionQuizId;
    this.question.questionCategoryId = que.questionCategoryId;
    this.question.questionIsActive = que.questionIsActive;
    this._service
      .updatedQuestion(this.question.questionFigure, this.question)
      .subscribe(
        (data) => {
          this.question = data;
          this.backupQuesiton.set(
            this.question.questionId,
            Object.assign({}, this.question)
          );
          // alert("here" + JSON.stringify(data))
          alert('updated successfully');
          // this.ngOnInit();
        },
        (error) => alert('please enter valid details')
      );
  }


  //Function for delete question
  deleteQuestion(que: Question) {
    this._service.deleteQuestion(que.questionFigure).subscribe(
      (data) => {
        this._question.splice(this._question.indexOf(que), 1);
        this.backupQuesiton.delete(que.questionId);
        alert('question is deleted');
        if (this._question.length <= 0) {
          this.isHidden = true;
          this.question = {} as Question;
        }
        // this.ngOnInit();
      },
      (error) => alert('Failed to delete Question')
    );
  }


  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.getAll();
      this.loadCategories();
      this.loadQuiz();
    }
  }


  //load category data
  private loadCategories() {
    this.sessionData = sessionStorage.getItem('category');

    this.data = JSON.parse(this.sessionData);

    for (var inst in this.data) {
      this.category.push(this.data[inst]);
    }
  }


  ///Function for get all question list
  private getAll() {
    this._service.questionList().subscribe(
      (data) => {
        this._question = data;
        // console.log("Response");
        this._question.forEach((questionData) => {
          this.backupQuesiton.set(
            questionData.questionId,
            Object.assign({}, questionData)
          );
        });

        if (this._question.length > 0) {
          this.isHidden = false;
        }
      },
      (Error) => console.log('exception')
    );
  }


  ///function for load quiz data
  private loadQuiz() {
    this.sessionData = sessionStorage.getItem('quiz');

    this.data = JSON.parse(this.sessionData);
    for (var qiz in this.data) {
      this.quiz.push(this.data[qiz]);
    }
  }


  //Function for get inactve Questions list
  getInactiveQuestions() {
    this.inActivationScreenStatus = true;
    this.activationScreenStatus = true;
    this._service.getInactiveQuestionList().subscribe(
      (data) => {
        this._question = data;
        // console.log("Response");
        this._question.forEach((questionData) => {
          this.backupQuesiton.set(
            questionData.questionId,
            Object.assign({}, questionData)
          );
        });

        if (this._question.length > 0) {
          this.isHidden = false;
        }
      },
      (Error) => console.log('exception')
    );
  }

  //Function for activating deleted question
  updateActiveStatus(que: Question) {

    console.log(que)
    console.log(que.questionFigure)
    this._service
      .updateActiveStatus(que.questionFigure, que)
      .subscribe(
        (data) => {
          this.question = data;
          console.log(this.question);
          this.backupQuesiton.set(
            this.question.questionId,
            Object.assign({}, this.question)
          );
          // alert("here" + JSON.stringify(data))
          alert('Question activated successfully');
          location.reload();
        },
        (error) => alert('please enter valid details')
      );
  }
  Home() {
    this.location.back();
    // this._route.navigate(['demo']);
  }
}
