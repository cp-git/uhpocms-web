import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private _service: QuestionService, private _activeRoute: ActivatedRoute, private _route: Router) { }


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
}
