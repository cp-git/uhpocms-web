import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Course } from 'app/class/course';
import { Module } from '../module';
import { TeachermoduleserviceService } from '../service/teachermoduleservice.service';

@Component({
  selector: 'app-teachermodule',
  templateUrl: './teachermodule.component.html',
  styleUrls: ['./teachermodule.component.css'],
})
export class TeachermoduleComponent {
  controlEnabled: boolean = true;
  module = new Module();
  _teacherModule: Module[] = []; //for all module data

  inActivationScreenStatus: boolean = false;
  activationScreenStatus: boolean = false;
  isVisible: boolean = true;

  _backupModule = new Map();

  // array of course
  courses: Course[] = []; //for drop down data
  sessionData: any;
  data: any;
  navAddModule() {
    this._route.navigate(['addModule']);
  }
  navupdModule() {
    this._route.navigate(['updateModule']);
  }
  ngOnInit(): void {
    this.activationScreenStatus = false;
    this.getAllModules();

    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.getAllModules();
      this.loadCourses();
    }
  }
  constructor(
    private _service: TeachermoduleserviceService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router
  ) { }

  moduleName!: string;

  addmodule(module: Module) {
    //alert(JSON.stringify(module));
    var moduleId = module.moduleId;

    module.moduleId = null;

    this._service.addTeacherModule(module).subscribe(
      (data) => {
        //console.log(data);
        this.module = data;
        if (this._backupModule.size > 0) {
          this._teacherModule[this._teacherModule.indexOf(module)] =
            Object.assign({}, this._backupModule.get(moduleId));
        }
        this._teacherModule.push(this.module);
        this._backupModule.set(
          this.module.moduleId,
          Object.assign({}, this.module)
        );
        alert('Module Added successfully');
        location.reload();
        if (this._teacherModule.length > 0) {
          this.isVisible = false;
        }
      },
      (error) => alert('Module Name already exists')
    );
  }

  getAllModules() {

    this._service.fetchModuleList().subscribe(
      (data) => {
        console.log('Response Received...');
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
        alert('Data not found');
      }
    );
  }

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
    this._service
      .updateModuleList(this.module.moduleName, this.module)
      .subscribe(
        (data) => {
          // console.log(data)
          this.module = data;
          this._backupModule.set(
            this.module.moduleId,
            Object.assign({}, this.module)
          );
          // this.ngOnInit();
          alert('Data updated successfuly');

          if (this._teacherModule.length > 0) {
            this.isVisible = false;
          }
        },
        (error) => {
          alert('Failed to update');
        }
      );
  }

  deletemodule(toDeleteModule: Module) {
    this._service.deleteModule(toDeleteModule.moduleName).subscribe(
      (data) => {
        this._teacherModule.splice(
          this._teacherModule.indexOf(toDeleteModule),
          1
        );
        this._backupModule.delete(toDeleteModule.moduleId);
        // this.ngOnInit();
        alert(toDeleteModule.moduleName + ' deleted successfuly');

        if (this._teacherModule.length > 0) {
          this.isVisible = false;
        }
      },
      (error) => {
        alert('Failed to delete');
      }
    );
  }

  private loadCourses() {
    this.sessionData = sessionStorage.getItem('course');
    this.data = JSON.parse(this.sessionData);

    for (var course in this.data) {
      this.courses.push(this.data[course]);
    }
    //alert(this.courses);
  }

  Home() {
    this._route.navigate(['teacherdisplay/teacher']);
  }

  getInactivateModule() {
    this.inActivationScreenStatus = true;
    this.activationScreenStatus = true;
    this._service.getInactivemoduleList().subscribe(
      (data) => {
        console.log('Response Received...');
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
        alert('Data not found');
      }
    );
  }

  BackToActivatedScreen() {
    location.reload();
  }

  activateModule(module: Module, moduleName: string) {
    console.log(module, moduleName)
    // this.module = ({} as Module);
    // this.module.moduleName = module.moduleName;
    // this.module.moduleDescription = module.moduleDescription;
    // this.module.moduleIsActive = module.moduleIsActive;
    // this.module.moduleStartDate = module.moduleStartDate;
    // this.module.moduleEndDate = module.moduleEndDate;
    // this.module.moduleCourse = module.moduleCourse;
    // this.module.moduleOrderNo = module.moduleOrderNo;
    // this.module.courseId_id = module.courseId_id;
    this._service
      .updateActiveStatus(module.moduleName, module)
      .subscribe(
        (data) => {
          // console.log(data)
          this.module = data;
          // this._backupModule.set(
          //   this.module.moduleId,
          //   Object.assign({}, this.module)
          // );
          // this.ngOnInit();]
          console.log(this.module)
          alert('Module activated successfuly');
          location.reload();

          if (this._teacherModule.length > 0) {
            this.isVisible = false;
          }
        },
        (error) => {
          alert('Failed to update');
        }
      );
  }



}
