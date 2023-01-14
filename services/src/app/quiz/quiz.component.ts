import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Category } from 'app/category/category';
import { CategoryService } from 'app/category/category.service';
import { Course } from 'app/course/course';
import { CourseService } from 'app/course/course.service';
import { Module } from 'app/module/module';
import { ModuleService } from 'app/module/module.service';
import { Quiz } from './quiz';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  

  _quizArray: Quiz[] = [];
  _quiz: Quiz = new Quiz;
  _courseArray :Course[] =[];
  _course: Course =new Course;
  _moduleArray :Module[] =[];
  _module: Module = new Module;
  _categoryArray :Category[] =[];
  _category: Category = new Category;
  
  isHidden:boolean = false;
  constructor(private _quizService: QuizService, private _route: Router,private _courseService :CourseService,private _categoryService:CategoryService,private _moduleService : ModuleService) {
    
  }

  ngOnInit(): void {
  
    this.getAllQuizzes();
    this.getAllCourses();
    this.getAllCategorys();
    this.getAllModules();
  }

  getAllQuizzes(){
    this._quizService._getAllQuizzes().subscribe(
      data => {
        this._quizArray = data;
        console.log(data);
        if(data.length == 0)
        {
          this.isHidden = true;
        }
      }
    )
  }

  getAllCourses(){
    this._courseService._getAllCourses().subscribe(
    data=> {
      this._courseArray = data;
    })
  }
  getAllCategorys()
  {
    this._categoryService._getAllCategorys().subscribe(
    data =>{
    this._categoryArray = data;
  
    }
    )
  }

  getAllModules()
  {
    this._moduleService._getAllModules().subscribe(
      data=>{
        this._moduleArray = data;
      }
    )
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
    quizObj.courseId = quiz.courseId
    quizObj.moduleId = quiz.moduleId
    quizObj.categoryId = quiz.categoryId
    quizObj.active = true;

    this._quizService._addQuiz(quizObj).subscribe(
      data=>{
      console.log(data);
      alert("Quiz Added Successfully");
      location.reload();
      }
    )



  }


  updateQuiz(quiz : Quiz,title:string)
  {
    this._quizService._getQuizByTitle(title)
    .subscribe(
      data=>{
        this._quiz = data;

        this._quizService._updateQuiz(title,quiz)
        .subscribe(data=>
          {
            alert("Data Updated Successfully")
            this._route.navigate(['quiz'])
          });
    });
   

  }
  
  deleteQuiz(quiz :Quiz,title:string)
  {
    this._quizService._deleteQuiz(title)
    .subscribe(
      data=>{
        alert("Data Deleted Successfully")
        location.reload();
      }
    )
   


  }
}
