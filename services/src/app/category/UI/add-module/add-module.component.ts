import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'app/course/course';
import { Module } from 'app/module/module';
import { TeachermoduleserviceService } from 'app/teachermodule/teachermoduleservice.service';

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



  constructor(private _service: TeachermoduleserviceService, private _activatedRoute: ActivatedRoute, private _route: Router) {


  }

  moduleName!: string;


  addmodule(module: Module) {
    alert(JSON.stringify(module));
    var moduleId = module.moduleId;

    // module.moduleId = null;

    this._service.addTeacherModule(module).subscribe(
      data => {
        //console.log(data);
        this.module = data;

        alert("Module Added successfully");

        if (this._teacherModule.length > 0) {
          this.isVisible = false;
        }
        this._route.navigate(['teachermodule']);
      },
      error => alert("Module Name already exists")
    )
  }

  private loadCourses() {
    this.sessionData = sessionStorage.getItem("course");
    this.data = JSON.parse(this.sessionData);

    for (var course in this.data) {
      this.courses.push(this.data[course]);
    }
    //alert(this.courses);
  }

  ngOnInit(): void {
    this.loadCourses();
  }
}
