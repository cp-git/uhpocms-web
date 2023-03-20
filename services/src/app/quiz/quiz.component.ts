import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/category/category';
import { CategoryService } from 'app/category/category.service';
import { Course } from 'app/course/class/course';
import { CourseService } from 'app/course/service/course.service';
import { Module } from 'app/module/module';
import { ModuleService } from 'app/module/module.service';
import { Quiz } from './class/quiz';
import { QuizService } from './service/quiz.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {

  inActivationScreenStatus: boolean = false;
  activationScreenStatus: boolean = false;
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
  teacherId: any;
  userName!: string;
  constructor(
    private _quizService: QuizService,
    private _route: Router,
    private _courseService: CourseService,
    private _categoryService: CategoryService,
    private _moduleService: ModuleService,
    private _activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.getAllQuizzes();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.teacherId = this._activatedRoute.snapshot.paramMap.get('id');
      this.userName = this._activatedRoute.snapshot.params['userName'];
      // console.log(this.userName)

      this.getAllQuizzes();
    }

    this._quizMap;
    this._categoryMap;
    this._courseMap;
    this._moduleMap;
    this.getAllCourses();
    this.getAllCategorys();
    this.getAllModules();
    console.log(this._quizMap);
  }


  //getting All Quiz Data
  getAllQuizzes() {
    this._quizService._getAllQuizzes().subscribe(
      (data) => {
        this._quizArray = data;
        //console.log(data);
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


  //getting allcourses as dropdown
  getAllCourses() {
    this._courseService._getAllCourses().subscribe((data) => {
      this._courseArray = data;
      this._courseArray.forEach((_courseObj) => {
        this._courseMap.set(_courseObj.courseId, Object.assign({}, _courseObj));
      });
    });
  }

  //Getting All Category as dropdown
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


  //getting all modules as dropdown
  getAllModules() {
    this._moduleService._getAllModules().subscribe((data) => {
      this._moduleArray = data;
      this._moduleArray.forEach((_moduleObj) => {
        this._moduleMap.set(_moduleObj.moduleId, Object.assign({}, _moduleObj));
      });
    });
  }


  //Navigating the route to quiz
  Add() {
    this._route.navigate(['createQuiz', this.userName]);
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


  //Routing to the Update Quiz
  updateQuiz(title: string) {
    this._route.navigate(['updateQuiz', title, this.userName])

  }


  //Deleting the quiz (soft delete)
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


  //Getting Inactive Quiz
  getInactiveQuizzes() {
    this.inActivationScreenStatus = true;
    this.activationScreenStatus = true;
    this._quizService.getInactiveQuizList().subscribe(
      (data) => {
        this._quizArray = data;
        //console.log(data);
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


  //Activate Quiz status
  updateActiveStatus(quiz: Quiz) {

    this._quizService.updateActiveStatus(quiz.title, quiz).subscribe(data => {
      //console.log(data)
      // console.log(this._quiz)
      alert("Quiz Activated Successfully")
      location.reload();


    }, error => console.log(error));

  }

  //Routing back to panel
  back() {

    console.log("in method..")
    this._route.navigate(['teacherdisplay/teacher', this.userName])
    //this.location.back();

    // if (this._activatedRoute.snapshot.params['role'] == 'teacher') { this._route.navigate(['teacherdisplay/teacher']); }

    // else if (this._activatedRoute.snapshot.params['role'] == 'student') { this._route.navigate(['studentdata/student']); }




  }
}
