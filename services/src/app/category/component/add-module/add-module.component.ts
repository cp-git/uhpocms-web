import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'app/teacher-course/class/course';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Module } from 'app/module/class/module';
import { ModuleService } from 'app/module/services/module.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent {
  module = new Module();
  _teacherModule: Module[] = [];  //for all module data

  isVisible: boolean = true;

  _backupModule = new Map();


  // array of course
  courses: Course[] = [];  //for drop down data
  sessionData: any;
  data: any;

  teacherId: any;
  userName!: string;



  constructor(private _service: ModuleService, private _activatedRoute: ActivatedRoute, private _route: Router) {


  }

  Back() {
    this._route.navigate(['teachermodule', this.userName, { id: this.teacherId }])
  }
  moduleName!: string;


  addmodule(module: Module) {

    var moduleId = module.moduleId;

    module.moduleIsActive = true;
    // module.moduleId = null;

    this._service.addTeacherModule(module).subscribe(
      data => {

        this.module = data;



        if (this._teacherModule.length > 0) {
          this.isVisible = false;
        }
        this._route.navigate(['teachermodule']);
      },
      error => console.log("Module Name already exists")
    )
  }

  private loadCourses() {
    this.sessionData = sessionStorage.getItem("course");
    this.data = JSON.parse(this.sessionData);

    for (var course in this.data) {
      this.courses.push(this.data[course]);
    }

  }

  ngOnInit(): void {
    this.teacherId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    this.loadCourses();
  }
}
