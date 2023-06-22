import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Module } from 'app/module/class/module';
import { ModuleService } from 'app/module/services/module.service';
import { ModuleFile } from 'app/module-file/class/module-file';
import { ModuleFileService } from 'app/module-file/services/module-file.service';
import { ModuleFileAllColumn, ModuleFileColumn, ModuleFileUpdateColumn, ModuleFileViewColumn } from 'app/module-file/column-name/modulefile-column';
import { Course } from 'app/teacher-course/class/course';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
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
  moduleName: string = "Module Content";

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

  // for buttons to view
  showAddButton: boolean = true;
  showActivateButton: boolean = true;
  titleWithUserRole: boolean = true;

  columnNames: any;
  allColumnNames: any;
  updateColumnNames: any;
  viewColumnNames: any;
  readonly primaryIdColumnName: string = 'id';

  allData: ModuleFile[] = [];
  allInActiveData: ModuleFile[] = [];

  sessionData: any;
  data: any;
  userRole: any;
  profileId: any;

  emptyModuleFile: ModuleFile;  // empty module file
  currentData!: ModuleFile;  // for update and view, to show existing data


  _backupModule = new Map();
  files!: FileList;


  constructor(

    private _route: Router,
    private location: Location,
    private moduleFileService: ModuleFileService,
    private service: TeacherCourseService,
    private uploadfileService: UploadFileService,
    private dialogBoxServices: DialogBoxService
  ) {
    this.userRole = sessionStorage.getItem('userRole');
    this.columnNames = ModuleFileColumn;
    this.allColumnNames = ModuleFileAllColumn;
    this.updateColumnNames = ModuleFileUpdateColumn;
    this.viewColumnNames = ModuleFileViewColumn;
    this.profileId = sessionStorage.getItem('profileId');
    // creating empty object
    this.emptyModuleFile = new ModuleFile();
    // this.loadCourses();


    //this.profileId = sessionStorage.getItem('profileId');
  }

  ngOnInit(): void {

    this.activationScreenStatus = false;

    this.getAllModulesFile();
    this.getAssignedCoursesOfTeacher(this.profileId);
    this.getInactiveModuleFiles();

  }

  submitClicked(eventData: any) {
    // Handle the emitted data here
    console.log("Received event data:", eventData);
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

      this.showAddButton = true;
      this.showActivateButton = true;
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
    this.showAddButton = false;
    this.showActivateButton = false;
    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: any): void {

    // hiding update screen and displaying all module files screen 
    this.viewAll = false;
    this.viewUpdate = true;
    this.showAddButton = false;
    this.showActivateButton = false;
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
    this.showAddButton = false;
    this.showActivateButton = false;
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
    this.showAddButton = false;
    this.showActivateButton = false;
  }

  // on addComponents's submit button clicked
  onAddModuleSubmit(receivedArray: any): void {
    console.log("my" + JSON.stringify(receivedArray));

    this.addModuleFile(receivedArray);
  }

  onRecievedFiles(recievedFiles: FileList) {
    this.files = recievedFiles;
    console.log(this.files);

  }

  // on updateComponents's submit button clicked
  onUpdateModuleSubmit(objectReceived: any) {
    this.updateModuleFileById(objectReceived);
  }


  private loadModules() {
    this.modules = [];
    try {
      this.sessionData = sessionStorage.getItem('module');
      this.data = JSON.parse(this.sessionData);

      for (var module in this.data) {
        this.modules.push(this.data[module]);
      }
      //console.log(this.courses);
    }
    catch (err) {
      console.log("Error", err);
    }
    console.log(this.courses);
    this.filteredModules = [];
    this.courses.forEach(course => {
      this.modules.forEach(module => {
        if (course.courseId == module.courseId_id) {
          this.filteredModules.push(module);
        }
      })
    })

    // console.log(this.filteredModules);



  }
  filteredModules: Module[] = [];
  private loadCourses() {
    try {
      this.sessionData = sessionStorage.getItem('course');
      // console.log(this.sessionData);
      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.courses.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err);
    }
    this.loadModules();

  }

  //getting courses assigned to teacher using profileId
  private getAssignedCoursesOfTeacher(teacherId: number) {
    this.service.getAssignedCourseOfTeacher(teacherId).subscribe(
      (data) => {
        //console.log(data);

        this.courses = data;
        this.loadModules();

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
  //       console.log("failed to fetch data");
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
    // objectReceived.moduleFileIsActive = true;
    console.log("view " + JSON.stringify(this.files));



    let formData = new FormData();
    for (let i = 0; i <= this.files.length; i++) {
      formData.append("files", this.files[i]);
    }
    formData.append("admin", new Blob([JSON.stringify(objectReceived)], { type: 'application/json' }));


    this.moduleFileService.addModuleFile(formData).subscribe(
      (data) => {
        //console.log(this.moduleFile)
        //console.log(data);
        this.uploadfileService.uploadFiles(this.files).subscribe();

        this.moduleFile = data;


        console.log('File Added successfully');
        this.dialogBoxServices.open("File Added successfully", 'information');
        this.ngOnInit();
        this.back();
      },

      (error) => {
        this.dialogBoxServices.open("File is Already Present pls Select Another file..", 'warning');
        console.log('failed to upload ')
      }

    );
  }

  // For updating module files by id
  private updateModuleFileById(currentData: ModuleFile) {
    // calling service for updating data
    this.moduleFileService.updateModuleFileById(currentData.moduleFileId, currentData).subscribe(
      response => {
        this.uploadfileService.uploadFiles(this.files).subscribe();

      },
      error => {
        this.dialogBoxServices.open("Module File updation failed", 'warning');
        console.log('Module File updation failed !');
      }

    );
    console.log('Module File updated successfully !');
    this.dialogBoxServices.open("Module File updated successfully !", 'information');
    this.back();
  }




  // for getting all module files
  private getAllModulesFile() {
    // calling service to get all data
    console.log(this.modules);
    this.moduleFileService.fetchModuleFileList().subscribe(
      response => {

        this.allData = [];
        console.log(this.allData);
        response.forEach((moduleFile: ModuleFile) => {
          this.filteredModules.find((module: Module) => {
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
    this.dialogBoxServices.open('Are you sure you want to delete this ModuleFile ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
    // calling service to soft delte
    this.moduleFileService.deleteModuleFileById(moduleFileId).subscribe(
      (response) => {
        this.dialogBoxServices.open("Module File deleted successfully !", 'information');
        console.log('Module File deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        console.log('Module File deletion failed');
        this.dialogBoxServices.open("Module File deletion failed", 'warning');
      }
      );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
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
        console.log("Activated modulefile");
        this.dialogBoxServices.open("Activated modulefile", 'information');
        this.ngOnInit();
      },
      error => {
        this.dialogBoxServices.open("Failed to activate", 'warning');
        console.log("Failed to activate");
      }
    );
  }


}





