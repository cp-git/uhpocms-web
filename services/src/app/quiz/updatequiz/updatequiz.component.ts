import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/category/class/category';
import { CategoryService } from 'app/category/services/category.service';
import { Course } from 'app/teacher-course/class/course';


import { Module } from 'app/module/class/module';
import { ModuleService } from 'app/module/services/module.service';
import { Quiz } from '../class/quiz';
import { QuizService } from '../service/quiz.service';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';


@Component({
  selector: 'app-updatequiz',
  templateUrl: './updatequiz.component.html',
  styleUrls: ['./updatequiz.component.css']
})
export class UpdatequizComponent {

  _quizArray: Quiz[] = [];
  _quiz: Quiz = new Quiz;
  _courseArray: Course[] = [];
  _course: Course = new Course;
  _moduleArray: Module[] = [];
  _module: Module = new Module;
  _categoryArray: Category[] = [];
  _category: Category = new Category;
  _quizMap = new Map();
  _courseMap = new Map();
  _categoryMap = new Map();
  _moduleMap = new Map();
  isHidden: boolean = false;

  teacherId: any;
  userName!: string;

  title!: string;
  // _quiz: Quiz = new Quiz();
  constructor(private _service: QuizService, private _activatedRoute: ActivatedRoute, private _route: Router, private _courseService: TeacherCourseService, private _moduleService: ModuleService, private _categoryService: CategoryService) { }

  ngOnInit(): void {

    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    }


    this.teacherId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    // console.log(this.userName)
    this._quizMap;
    this._categoryMap;
    this._courseMap;
    this._moduleMap;
    this.getAllCourses();
    this.getAllCategorys();
    this.getAllModules();

    this.title = this._activatedRoute.snapshot.params['title'];
    // console.log(this.title);

    this._service._getQuizByTitle(this.title)
      .subscribe(data => {
        //console.log(data)
        this._quiz = data;
        // console.log(this._quiz)
      }, error => console.log(error));
  }



  //getting the Courses As a Dropdown
  getAllCourses() {
    this._courseService.getAllCourses().subscribe(
      data => {
        this._courseArray = data;
        this._courseArray.forEach(_courseObj => {
          this._courseMap.set(_courseObj.courseId, (Object.assign({}, _courseObj)))
        })
      }
    )
  }

  //getting Category as dropdown
  getAllCategorys() {
    this._categoryService._getAllCategorys().subscribe(
      data => {
        this._categoryArray = data;
        this._categoryArray.forEach(_categoryObj => { this._categoryMap.set(_categoryObj.categoryId, Object.assign({}, _categoryObj)) })
      }
    )
  }


  //getting modules as dropdown
  getAllModules() {
    this._moduleService.getAllModules().subscribe(
      data => {
        this._moduleArray = data;
        this._moduleArray.forEach(_moduleObj => {
          this._moduleMap.set(_moduleObj.moduleId, Object.assign({}, _moduleObj))

        })
      }
    )
  }


  //updating the quiz
  updateQuiz(quiz: Quiz) {
    this._service._updateQuiz(this.title, this._quiz).subscribe(data => {
      //console.log(data)
      //console.log(this._quiz)
      this._route.navigate(['quiz', this.userName])

    }, error => console.log(error));
  }


  //Routing back to quiz home page
  back() {
    this._route.navigate(['quiz', this.userName]);
  }

}
