import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/class/category';
import { Quiz } from 'app/class/quiz';
import { Question } from 'app/teacher-question/class/question';
import { TeacherQuestionService } from 'app/teacher-question/service/teacher-question.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher-question',
  templateUrl: './teacher-question.component.html',
  styleUrls: ['./teacher-question.component.css']
})
export class TeacherQuestionComponent {
question = new Question();  //question property holds an instance of the Question class
  _question: Question[] = [];  //array of Question instances
  inActivationScreenStatus: boolean = false; //display the inactivation screen
  activationScreenStatus: boolean = false; //display the activation screen
  backupQuesiton = new Map(); //Map object that stores a copy of the original question object before it gets updated

  //Creating array
  category: Category[] = [];
  quiz: Quiz[] = [];

  sessionData: any;
  data: any;

  //Empty row
  isHidden: boolean = true;

  constructor(
    private _service: TeacherQuestionService,
    private _activeRoute: ActivatedRoute,
    private _route: Router,
    private location: Location
  ) { }

  //adds a new question to the database by calling the addQuestion()
  // function from the TeacherQuestionService
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

  // updates an existing question in the database by calling the updatedQuestion()
  // function from the TeacherQuestionService
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
      //updates the question in the _question array and displays a success message
        (data) => {
          this.question = data;
          this.backupQuesiton.set(
            this.question.questionId,
            Object.assign({}, this.question)
          );
        
          alert('updated successfully');
          
        },
        (error) => alert('please enter valid details')
      );
  }

  //deletes a question from the database by calling the deleteQuestion() 
  //function from the TeacherQuestionService
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
        
      },
      (error) => alert('Failed to delete Question')
    );
  }

  //it checks if there is an authenticated user in the session storage, and if there is,
  // it calls the getAll(), loadCategories(), and loadQuiz() functions
  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.getAll();
      this.loadCategories();
      this.loadQuiz();
    }
  }

  // retrieves a list of categories from the session storage and adds them to the category array
  private loadCategories() {
    this.sessionData = sessionStorage.getItem('category');

    this.data = JSON.parse(this.sessionData);

    for (var inst in this.data) {
      this.category.push(this.data[inst]);
    }
  }

  //retrieves a list of questions and adds them to the _question array. 
  //It also makes a copy of each question object and stores it in the backupQuestion map
  private getAll() {
    this._service.questionList().subscribe(
      (data) => {
        this._question = data;
     
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

  //retrieves a list of quizzes from the session storage and adds them to the quiz array
  private loadQuiz() {
    this.sessionData = sessionStorage.getItem('quiz');

    this.data = JSON.parse(this.sessionData);
    for (var qiz in this.data) {
      this.quiz.push(this.data[qiz]);
    }
  }

  //sets the inActivationScreenStatus and activationScreenStatus variables to true 
  //and retrieves a list of inactive questions, which is then added to the _question array
  getInactiveQuestions() {
    this.inActivationScreenStatus = true;
    this.activationScreenStatus = true;
    this._service.getInactiveQuestionList().subscribe(
      (data) => {
        this._question = data;
        
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

  //updates the active status of a question in the database by calling the updatedQuestion() 
  //function from the TeacherQuestionService
  updateActiveStatus(que: Question) {
    // this.question.questionId = que.questionId;
    // this.question.questionFigure = que.questionFigure;
    // this.question.questionContent = que.questionContent;
    // this.question.questionExplanation = que.questionExplanation;
    // this.question.questionOrderNo = que.questionOrderNo;
    // this.question.questionIsMCQ = que.questionIsMCQ;
    // this.question.questionQuizId = que.questionQuizId;
    // this.question.questionCategoryId = que.questionCategoryId;
    // this.question.questionIsActive = que.questionIsActive;
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

