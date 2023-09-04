import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'app/teacher-course/class/course';
import { Module } from 'app/module/class/module';
import { ModuleService } from 'app/module/services/module.service';

@Component({
  selector: 'app-updatemodule',
  templateUrl: './updatemodule.component.html',
  styleUrls: ['./updatemodule.component.css']
})
export class UpdatemoduleComponent {
  module = new Module();
  _teacherModule: Module[] = []; //for all module data

  isVisible: boolean = true;


  teacherId: any;
  userName!: string;

  _backupModule = new Map();

  // array of course
  courses: Course[] = []; //for drop down data
  sessionData: any;
  data: any;
  navAddModule() {
    this._route.navigate(['addModule']);
  }
  ngOnInit(): void {
    this.getAllModules();

    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.teacherId = this._activatedRoute.snapshot.paramMap.get('id');
      this.userName = this._activatedRoute.snapshot.params['userName'];
      this.getAllModules();
      this.loadCourses();
    }
  }
  constructor(
    private _service: ModuleService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router
  ) { }

  moduleName!: string;



  getAllModules() {
    this._service.getAllModules().subscribe(
      (data) => {

        this._teacherModule = data;

        this._teacherModule.forEach((moduleData) => {
          this._backupModule.set(
            moduleData.moduleId,
            Object.assign({}, moduleData)
          );
        });
        if (this._teacherModule.length > 0) {
          this.isVisible = false;
        }
      },
      (error) => {
        console.log('Data not found');
      }
    );
  }

  //function for update module by name
  updatemodule(module: Module) {
    // this.module = ({} as Module);
    this.module.moduleName = module.moduleName;
    this.module.moduleDescription = module.moduleDescription;
    this.module.moduleIsActive = module.moduleIsActive;
    this.module.moduleStartDate = module.moduleStartDate;
    this.module.moduleEndDate = module.moduleEndDate;
    this.module.moduleCourse = module.moduleCourse;
    this.module.moduleOrderNo = module.moduleOrderNo;
    this.module.courseId_id = module.courseId_id;
    this._service.updateModule(this.module.moduleName, this.module).subscribe(
      (data) => {

        this.module = data;
        this._backupModule.set(
          this.module.moduleId,
          Object.assign({}, this.module)
        );



        if (this._teacherModule.length > 0) {
          this.isVisible = false;
        }
      },
      (error) => {
        console.log('Failed to update');
      }
    );
  }


  //function for deleting module by module name
  deletemodule(toDeleteModule: Module) {
    this._service.deleteModule(toDeleteModule.moduleName).subscribe(
      (data) => {
        this._teacherModule.splice(
          this._teacherModule.indexOf(toDeleteModule),
          1
        );
        this._backupModule.delete(toDeleteModule.moduleId);



        if (this._teacherModule.length > 0) {
          this.isVisible = false;
        }
      },
      (error) => {
        console.log('Failed to delete');
      }
    );
  }


  //load the courses data
  private loadCourses() {
    this.sessionData = sessionStorage.getItem('course');
    this.data = JSON.parse(this.sessionData);

    for (var course in this.data) {
      this.courses.push(this.data[course]);
    }
  }

  Back() {
    this._route.navigate(['teachermodule', this.userName, { id: this.teacherId }])
  }
}
