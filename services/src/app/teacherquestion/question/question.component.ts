import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/class/category';
import { Quiz } from 'app/class/quiz';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question = new Question();
  _question: Question[] = [];

  //Creating array 
  category: Category[] = [];
  sessionData: any;
  data: any;

  //Empty row
  isHidden: boolean = true;


  quiz: Quiz[] = [];

  constructor(private _service: QuestionService, private _activeRoute: ActivatedRoute, private _route: Router) {
    this.loadCategories(), this.loadQuiz();
  }
  insertQuestion(que: Question) {
    alert(JSON.stringify(que));
    this.question.questionFigure = que.questionFigure;
    this.question.questionContent = que.questionContent;
    this.question.questionExplanation = que.questionExplanation;
    this.question.questionOrderNo = que.questionOrderNo;
    this.question.questionIsMCQ = que.questionIsMCQ;
    this.question.questionQuizId = que.questionQuizId;
    this.question.questionCategoryId = que.questionCategoryId;
    this.question.questionIsActive = que.questionIsActive;
    this._service.addQuestion(this.question).subscribe(
      data => {
        alert(JSON.stringify(que));
        alert("Question added Successfully")
        this.ngOnInit();
      },
      error =>
        alert("please enter valid details")

    )
  }

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
    this._service.updatedQuestion(this.question.questionFigure, this.question).subscribe(
      data => {

        alert("here" + JSON.stringify(data))
        alert("updated successfully")
        this.ngOnInit();
      },
      error => alert("please enter valid details")
    )
  }

  deleteQuestion(que: Question) {
    this._service.deleteQuestion(que.questionFigure).subscribe(
      data => {
        alert("question is deleted" + JSON.stringify(que.questionFigure))
        this.ngOnInit();

      },
      error => alert("Failed to delete Question")
    )

  }
  ngOnInit(): void {
    this._service.questionList().subscribe(
      data => {
        console.log("Response");
        this._question = data;
      },
      Error => console.log("exception")
    )
  }

  private loadCategories() {
    this.sessionData = sessionStorage.getItem("category");

    this.data = JSON.parse(this.sessionData);

    for (var inst in this.data) {

      this.category.push(this.data[inst]);
    }
  }

  private loadQuiz() {
    this.sessionData = sessionStorage.getItem("quiz");

    this.data = JSON.parse(this.sessionData);
    for (var qiz in this.data) {
      this.quiz.push(this.data[qiz])
    }
  }
}
