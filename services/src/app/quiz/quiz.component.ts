import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'app/course/course';
import { CourseService } from 'app/course/course.service';
import { Quiz } from './quiz';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  

  _quizArray: Quiz[] = [];
  _courseArray :Course[] =[];
  _course: Course =new Course;
  
  _quiz: Quiz = new Quiz;
  isHidden = false;
  constructor(private _quizService: QuizService, private _route: Router,private _courseService :CourseService) {
    
  }

  ngOnInit(): void {
  
    this.getAllQuizzes();
    this.getAllCourses();
  }

  getAllQuizzes(){
    this._quizService._getAllQuizzes().subscribe(
      data => {
        this._quizArray = data;
        console.log(data);
      }
    )
  }

  getAllCourses(){
    this._courseService._getAllCourses().subscribe(
    data=> {
      this._courseArray = data;
    })
  }
  addQuiz(quiz:Quiz)
  {
    let quizObj = new Quiz;
    quizObj.title = quiz.title;
    quizObj.description = quiz.description;
    quizObj.url = quiz.url;
    quizObj.randomOrder = quiz.randomOrder;
    quizObj.maxQuestions = quiz.maxQuestions;
    quizObj.answersAtEnd = quiz.answersAtEnd;
    quizObj.examPaper = quiz.examPaper;
    quizObj.singleAttempt = quiz.singleAttempt;
    quizObj.passMark = quiz.passMark;
    quizObj.successText = quiz.successText;
    quizObj.failText = quiz.failText;
    quizObj.draft = quiz.draft;
    quizObj.quizOrderNo = quiz.quizOrderNo;
    quizObj.courseidId = quiz.courseidId;
    quizObj.moduleId = quiz.moduleId;
    quizObj.categoryId = quiz.categoryId;
    quizObj.active = quiz.active;

    this._quizService._addQuiz(quizObj).subscribe()


  }


  updateQuiz(quiz : Quiz)
  {

  }
  
  deleteQuiz(quiz :Quiz)
  {
      
  }
}
