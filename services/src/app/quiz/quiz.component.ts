import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Category } from 'app/category/category';
import { CategoryService } from 'app/category/category.service';
import { Course } from 'app/course/course';
import { CourseService } from 'app/course/service/course.service';
import { Module } from 'app/module/module';
import { ModuleService } from 'app/module/module.service';
import { Quiz } from './quiz';
import { QuizService } from './service/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  _quizArray: Quiz[] = [];
  _quiz: Quiz = new Quiz();
  _courseArray: Course[] = [];
  _course: Course = new Course();
  _moduleArray: Module[] = [];
  _module: Module = new Module();
  _categoryArray: Category[] = [];
  _category: Category = new Category();
  _quizMap = new Map();
  _courseMap = new Map();
  _categoryMap = new Map();
  _moduleMap = new Map();
  isHidden: boolean = false;
  constructor(
    private _quizService: QuizService,
    private _route: Router,
    private _courseService: CourseService,
    private _categoryService: CategoryService,
    private _moduleService: ModuleService
  ) {
    this.getAllQuizzes();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.getAllQuizzes();


      this._quizMap;
      this._categoryMap;
      this._courseMap;
      this._moduleMap;
      this.getAllCourses();
      this.getAllCategorys();
      this.getAllModules();
      console.log(this._quizMap);
    }
  }

  getAllQuizzes() {
    this._quizService._getAllQuizzes().subscribe(
      (data) => {
        this._quizArray = data;
        console.log(data);
        this._quizArray.forEach((_quizData) => {
          this._quizMap.set(_quizData.quizId, Object.assign({}, _quizData));
        });
        if (data.length == 0) {
          this.isHidden = true;
        }
      },
      (error) => {
        alert('Quiz data not found');
      }
    );
  }

  getAllCourses() {
    this._courseService._getAllCourses().subscribe((data) => {
      this._courseArray = data;
      this._courseArray.forEach((_courseObj) => {
        this._courseMap.set(_courseObj.courseId, Object.assign({}, _courseObj));
      });
    });
  }
  getAllCategorys() {
    this._categoryService._getAllCategorys().subscribe((data) => {
      this._categoryArray = data;
      this._categoryArray.forEach((_categoryObj) => {
        this._categoryMap.set(
          _categoryObj.categoryId,
          Object.assign({}, _categoryObj)
        );
      });
    });
  }

  getAllModules() {
    this._moduleService._getAllModules().subscribe((data) => {
      this._moduleArray = data;
      this._moduleArray.forEach((_moduleObj) => {
        this._moduleMap.set(_moduleObj.moduleId, Object.assign({}, _moduleObj));
      });
    });
  }

  Add() {
    this._route.navigate(['createQuiz']);
    // let quizObj = new Quiz;
    // quizObj.title = quiz.title;
    // quizObj.description = quiz.description;
    // quizObj.url = quiz.url;
    // quizObj.randomOrder = quiz.randomOrder;
    // quizObj.maxQuestions = quiz.maxQuestions;
    // quizObj.answersAtEnd = quiz.answersAtEnd;
    // quizObj.examPaper = quiz.examPaper;
    // quizObj.singleAttempt = quiz.singleAttempt;
    // quizObj.passMark = quiz.passMark;
    // quizObj.successText = quiz.successText;
    // quizObj.failText = quiz.failText;
    // quizObj.draft = quiz.draft;
    // quizObj.quizOrderNo = quiz.quizOrderNo;
    // quizObj.courseId = quiz.courseId
    // quizObj.moduleId = quiz.moduleId
    // quizObj.categoryId = quiz.categoryId
    // quizObj.active = true;

    // this._quizService._addQuiz(quizObj).subscribe(
    //   data => {
    //     console.log(data);
    //     if (this._quizMap.size > 0) {
    //       this._quizArray[this._quizArray.indexOf(quiz)] = (Object.assign({}, this._quizMap.get(quiz.quizId)));
    //     }
    //     this._quizArray.push(this._quiz)
    //     this._quizMap.set(this._quiz.quizId, (Object.assign({}, this._quiz)));
    //     alert("Quiz Added Successfully");
    //     location.reload();
    //   }
    //   ,
    //   error => {
    //     alert("Failed to add quiz data")
    //   }
    // )



  }


  updateQuiz(title: string) {
    this._route.navigate(['updateQuiz', title])

  }

  deleteQuiz(quiz: Quiz, title: string) {
    this._quizService._deleteQuiz(title).subscribe(
      (data) => {
        this._quizArray.splice(this._quizArray.indexOf(quiz, 0));

        this._quizMap.delete(quiz.quizId);
        alert('Data Deleted Successfully');
        location.reload();
      },
      (error) => {
        alert('Failed to delete quiz data');
      }
    );
  }

  back() {
    this._route.navigate(['demo'])

  }
}
