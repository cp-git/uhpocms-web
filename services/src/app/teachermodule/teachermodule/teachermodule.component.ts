import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Module } from '../module';
import { TeachermoduleserviceService } from '../teachermoduleservice.service';


@Component({
  selector: 'app-teachermodule',
  templateUrl: './teachermodule.component.html',
  styleUrls: ['./teachermodule.component.css']
})
export class TeachermoduleComponent {
  module = new Module();
  _teacherModule: Module[] = [];

  isVisible: boolean = true;

  _backupModule: Module[] = [];

  constructor(private _service: TeachermoduleserviceService, private _activatedRoute: ActivatedRoute, private _route: Router) { }

  moduleName!: string;


  addmodule(module: Module) {
    //alert(JSON.stringify(module));
    this.module.moduleName = module.moduleName;
    this.module.moduleDescription = module.moduleDescription;
    this.module.moduleIsActive = module.moduleIsActive;
    this.module.moduleStartDate = module.moduleStartDate;
    this.module.moduleEndDate = module.moduleEndDate;
    this.module.moduleCourse = module.moduleCourse;
    this.module.moduleOrderNo = module.moduleOrderNo;
    this.module.courseId_id = module.courseId_id;
    this._service.addTeacherModule(this.module).subscribe(
      data => {
        //console.log(data);
        alert("Module Added successfully");
        this.ngOnInit();
      },
      error => alert("Module Name already exists")
    )
  }




  ngOnInit(): void {
    this._service.fetchModuleList().subscribe(
      data => {
        console.log("Response Received...");
        this._teacherModule = data;

        if (this._teacherModule.length > 0) {
          this.isVisible = false;
        }

        this._teacherModule.forEach(module => {
          this._backupModule.push(Object.assign({}, module))
        })

      },
      error => console.log("exception")
    )
  }

  updatemodule(module: Module) {

    if (this._backupModule.findIndex(data => data.moduleName === (module.moduleName)) < 0) {
      alert("moduleName not exist for update. please enter another.");

    } else {
      this.module.moduleName = module.moduleName;
      this.module.moduleDescription = module.moduleDescription;
      this.module.moduleIsActive = module.moduleIsActive;
      this.module.moduleStartDate = module.moduleStartDate;
      this.module.moduleEndDate = module.moduleEndDate;
      this.module.moduleCourse = module.moduleCourse;
      this.module.moduleOrderNo = module.moduleOrderNo;
      this.module.courseId_id = module.courseId_id;
      this._service.updateModuleList(this.module.moduleName, this.module).subscribe(
        data => {
          // console.log(data)
          alert("Data Updated...")
          this.ngOnInit();
        }, error => console.log(error));
    }
  }


  deletemodule(moduleName: string) {
    this._service.deleteModule(moduleName)
      .subscribe(
        data => {
          alert("Data Deleted...")
          location.reload();


        },
        error => console.log(error));

  }

}
