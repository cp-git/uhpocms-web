import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Module } from 'app/module/class/module';
import { ModuleService } from 'app/module/services/module.service';
import { ModuleFile } from 'app/module-file/class/module-file';
import { ModuleFileService } from 'app/module-file/services/module-file.service';
import { ModuleFileAllColumn, ModuleFileColumn } from 'app/module-file/column-name/modulefile-column';
import { Course } from 'app/teacher-course/class/course';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';

import { UploadFileService } from 'app/FileUpload/services/upload-file.service';
// import { Profile } from 'app/profiles/class/profile';
// import { AssignedteachercourseComponent } from 'app/displayAssignedCourseToTeacher/components/assignedteachercourse/assignedteachercourse.component';
@Component({
  selector: 'app-module-file',
  templateUrl: './module-file.component.html',
  styleUrls: ['./module-file.component.css']
})
export class ModuleFileComponent {



  // title heading
  moduleName: string = "Module Contents";

  controlEnabled: boolean = true;
  module = new Module();
  modules: Module[] = []; //for all module data

  modulesFile: ModuleFile[] = [];
  moduleFile = new ModuleFile();


  inActivationScreenStatus: boolean = false;
  activationScreenStatus: boolean = false;
  isVisible: boolean = true;
  //screen view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewOne: boolean = false;
  viewAll: boolean = true;
  viewActivate: boolean = false;

  columnNames: any;
  allColumnNames: any;

  readonly primaryIdColumnName: string = 'id';

  allData: ModuleFile[] = [];
  allInActiveData: ModuleFile[] = [];

  sessionData: any;
  data: any;

  profileId: any;

  emptyModuleFile: ModuleFile;  // empty module file
  currentData!: ModuleFile;  // for update and view, to show existing data


  _backupModule = new Map();



  constructor(

    private _route: Router,
    private location: Location,
    private moduleFileService: ModuleFileService,
    private service: TeacherCourseService,
    private uploadfileService: UploadFileService
  ) {

    this.columnNames = ModuleFileColumn;
    this.allColumnNames = ModuleFileAllColumn;
    this.profileId = sessionStorage.getItem('profileId');
    // creating empty object
    this.emptyModuleFile = new ModuleFile();
    this.loadCourses();
    this.loadModules();

    //this.profileId = sessionStorage.getItem('profileId');
  }

  ngOnInit(): void {
    this.activationScreenStatus = false;

    this.getAllModulesFile();
    this.getAssignedCoursesOfTeacher(this.profileId);
    this.getInactiveModuleFiles();
  }


  navAddModuleFile() {
    this._route.navigate(['addModuleFile']);
  }
  navupdModuleFile() {
    this._route.navigate(['updateModuleFile']);
  }



  RedirectToModuleFile() {
    this._route.navigate(['modulefile']);
  }

  modulefile!: string;

  courses: Course[] = [];

  // back button functionality
  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;
    } else {
      this.location.back();
    }

  }



  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all module file screen 
    this.viewOne = true;
    this.viewAll = false;
    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: ModuleFile): void {

    // hiding update screen and displaying all module files screen 
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: ModuleFile): void {
    this.deleteModuleFileById(objectReceived.moduleFileId);
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onChildActivateClick(objectReceived: ModuleFile): void {
    this.activeModuleFile(objectReceived.moduleFileId);
  }

  // for navigating to add screen
  onAddClick() {
    this.viewAll = false;
    this.viewAdd = true;
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
  }

  // on addComponents's submit button clicked
  onAddModuleSubmit(objectReceived: ModuleFile): void {
    this.addModuleFile(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateModuleSubmit(objectReceived: ModuleFile) {
    this.updateModuleFileById(objectReceived);
  }


  private loadModules() {
    this.sessionData = sessionStorage.getItem('module');
    this.data = JSON.parse(this.sessionData);

    for (var module in this.data) {
      this.modules.push(this.data[module]);
    }
    //alert(this.courses);
  }

  private loadCourses() {
    this.sessionData = sessionStorage.getItem('course');
    // alert(this.sessionData);
    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.courses.push(this.data[inst]);
    }
  }

  //getting courses assigned to teacher using profileId
  private getAssignedCoursesOfTeacher(teacherId: number) {
    this.service.getAssignedCourseOfTeacher(teacherId).subscribe(
      (data) => {
        console.log(data);

        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  // getCoursesByProfileId(teacherId: any) {
  //   this.service.getAssignedCourseToTeacher(teacherId).subscribe(
  //     response => {
  //       this.courses = response;
  //       console.log(response);
  //     },
  //     error => {
  //       alert("failed to fetch data");
  //     }
  //   );
  // }

  Home() {
    this.location.back();

  }



  BackToActivatedScreen() {
    location.reload();
  }


  // Add module file
  addModuleFile(objectReceived: ModuleFile) {
    objectReceived.moduleFileIsActive = true;

    this.moduleFileService.addModuleFile(objectReceived).subscribe(
      (data) => {
        // alert(this.moduleFile)
        // console.log(data);
        //this.uploadfileService.uploadFiles();
        this.moduleFile = data;


        alert('File Added successfully');
        this.ngOnInit();
        this.back();
      },
      (error) => alert('failed to upload ')
    );
  }

  // For updating module files by id
  private updateModuleFileById(currentData: ModuleFile) {
    // calling service for updating data
    this.moduleFileService.updateModuleFileById(currentData.moduleFileId, currentData).subscribe(
      response => {
        alert(`Module File updated successfully !`);
        this.back();
      },
      error => {
        alert(`Module File updation failed !`);
      }
    );
  }


  // for getting all module files
  private getAllModulesFile() {
    // calling service to get all data
    this.moduleFileService.fetchModuleFileList().subscribe(
      response => {

        this.allData = [];
        response.forEach((moduleFile: ModuleFile) => {
          this.modules.find((module: Module) => {
            if (moduleFile.moduleId == module.moduleId) {
              this.allData.push({
                ...moduleFile,
                courseId: module.courseId_id,
              });
            }
          })
        })
        // this.allData = response; //assign data to local variable

      },
      error => {
        console.log('No data in table ');
      }
    );
  }


  // For deleting (soft delete) by Id
  private deleteModuleFileById(moduleFileId: number) {

    // calling service to soft delte
    this.moduleFileService.deleteModuleFileById(moduleFileId).subscribe(
      (response) => {
        alert('Module File deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        alert('Module File deletion failed');
      }
    );
  }

  // For getting all inactive module files
  private getInactiveModuleFiles() {

    // calling service to get all inactive record
    this.moduleFileService.getInactivemoduleFileList().subscribe(
      response => {
        this.allInActiveData = response;
      },
      error => {
        console.log('No data in table ');
      }
    );

  }
  // For activating moduleFile using Id
  private activeModuleFile(moduleFileId: number) {


    this.moduleFileService.activatemoduleFileById(moduleFileId).subscribe(
      response => {
        alert("Activated modulefile");
        this.ngOnInit();
      },
      error => {
        alert("Failed to activate");
      }
    );
  }


}





