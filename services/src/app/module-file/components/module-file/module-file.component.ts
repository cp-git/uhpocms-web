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
import { userModule } from 'app/permissions/enum/user-module.enum';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { environment } from 'environments/environment.development';

// import { Profile } from 'app/profiles/class/profile';
// import { AssignedteachercourseComponent } from 'app/displayAssignedCourseToTeacher/components/assignedteachercourse/assignedteachercourse.component';
@Component({
  selector: 'app-module-file',
  templateUrl: './module-file.component.html',
  styleUrls: ['./module-file.component.css']
})
export class ModuleFileComponent {

  // title heading
  moduleName: string = "Module Content Administration";

  controlEnabled: boolean = true;
  module = new Module();
  modules: Module[] = []; //for all module data
  moduleFilesInModule: ModuleFile[] = [];
  modulesFile: ModuleFile[] = [];
  moduleFile = new ModuleFile();
  modulesData: Module[] = []; //for all module data

  inActivationScreenStatus: boolean = false;
  activationScreenStatus: boolean = false;
  isVisible: boolean = true;

  //screen view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewOne: boolean = false;
  viewAll: boolean = true;
  viewActivate: boolean = false;

  // // for buttons to view
  // showAddButton: boolean = true;
  // showActivateButton: boolean = true;
  titleWithUserRole: boolean = true;

  columnNames: any;
  allColumnNames: any;
  updateColumnNames: any;
  viewColumnNames: any;
  readonly primaryIdColumnName: string = 'id';

  allData: ModuleFile[] = [];
  allModuleFileData: ModuleFile[] = [];
  allInActiveData: ModuleFile[] = [];

  sessionData: any;
  data: any;
  userRole: any;
  profileId: any;

  private modulefileUrl!: string;

  displayUrl!: any;

  emptyModuleFile: ModuleFile;  // empty module file
  currentData!: ModuleFile;  // for update and view, to show existing data


  _backupModule = new Map();
  files!: FileList;

  // for user Permissions
  buttonsArray: any;
  userAndRolePermissions: AuthUserPermission[] = [];
  userModule = userModule;
  imagesUrl!: any;


  myFiles: string[] = [];


  varDataname!: string;


  constructor(

    private _route: Router,
    private location: Location,
    private moduleFileService: ModuleFileService,
    private service: TeacherCourseService,
    private uploadfileService: UploadFileService,
    private dialogBoxServices: DialogBoxService,
    private userPermissionService: AuthUserPermissionService,
    private courseService: TeacherCourseService,
    private moduleService: ModuleService
  ) {

    // Assining default values
    this.buttonsArray = {
      showAddButton: false,
      showActivateButton: false,
      showUpdateButton: false,
      showDeleteButton: false
    }

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
    this.modulefileUrl = `${environment.moduleFileUrl}`;
  }


  /////////////////////////////////////////////// ON PAGE LOAD ///////////////////////////////////////////////
  ngOnInit(): void {

    this.loadAndLinkUserPermissions();

    this.activationScreenStatus = false;
    this.loadDataBasedOnRole(this.userRole)
    this.loadModules();
    //  this.getAllModulesFile();
    // this.getAssignedCoursesOfTeacher(this.profileId);
    // this.getInactiveModuleFiles();

    // this.displayUrl = this.modulefileUrl + '/files'


    this.displayUrl = this.modulefileUrl + '/files'
  }

  // this function for loading permission from session storage and link permission 
  // with buttons to show and hide based on permissions 
  private async loadAndLinkUserPermissions() {
    this.userAndRolePermissions = await this.userPermissionService.linkAndLoadPermissions(userModule.MODULE_FILE, this.userAndRolePermissions, this.buttonsArray);
    await this.userPermissionService.toggleButtonsPermissions(userModule.MODULE_FILE, this.userAndRolePermissions, this.buttonsArray);
  }

  submitClicked(eventData: any) {
    // Handle the emitted data here

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

    this.currentData = new ModuleFile();

    this.emptyModuleFile = new ModuleFile();
    this.loadDataBasedOnRole(this.userRole)

    if (this.viewAll == false) {
      // this.ngOnInit();

      this.viewAll = true;

      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;

      // this.buttonsArray.showAddButton = true;
      // this.buttonsArray.showActivateButton = true;
      this.userPermissionService.toggleButtonsPermissions(userModule.MODULE_FILE, this.userAndRolePermissions, this.buttonsArray);



    } else {
      // this.currentData = new ModuleFile();

      this.location.back();
    }

  }



  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all module file screen 
    this.viewOne = true;
    this.viewAll = false;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: any): void {

    // hiding update screen and displaying all module files screen 
    this.viewAll = false;
    this.viewUpdate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;

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
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // on addComponents's submit button clicked
  onAddModuleSubmit(receivedArray: any): void {


    this.addModuleFile(receivedArray);
  }


  //////////////////////////////////////  ON SELECTING THE FILE  ////////////////////////////////////////
  onRecievedFiles(recievedFiles: FileList) {
    this.files = recievedFiles;


  }

  // on updateComponents's submit button clicked
  onUpdateModuleSubmit(objectReceived: any) {
    this.updateModuleFileById(objectReceived);
  }


  ///////////////////////////////////// LOAD MODULES FROM SESSION STORAGE //////////////////////////////////////
  public loadModules() {
    this.modules = [];
    try {
      this.sessionData = sessionStorage.getItem('module');
      this.data = JSON.parse(this.sessionData);
      console.log(this.data);

      for (var module in this.data) {
        this.modules.push(this.data[module]);
      }

      console.log(this.modules);






    }
    catch (err) {
      console.log("Error", err);
    }

    this.filteredModules = [];
    this.courses.forEach(course => {
      this.modules.forEach(module => {

        if (course.courseId == module.courseId_id) {
          this.filteredModules.push(module);

        }
        console.log(this.filteredModules);

      })
    })





  }
  filteredModules: Module[] = [];


  ///////////////////////////////////////// LOAD COURSES FROM SESSION STORAGE ////////////////////////////////////
  private loadCourses() {
    try {
      this.sessionData = sessionStorage.getItem('course');

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

  ////////////////////////////////////////// GET ASSIGNED COURSES OF TEACHER  USED COURSE COMPONENT  ///////////////////////////////////
  private getAssignedCoursesOfTeacher(teacherId: number) {
    this.service.getAssignedCourseOfTeacher(teacherId).subscribe(
      (data) => {

        this.courses = data;
        this.loadModules();

      },
      error => {
        console.log(error);
      }
    );
  }



  Home() {
    this.location.back();

  }



  BackToActivatedScreen() {
    location.reload();
  }

  //////////////////////////////////////////////////////  CREATE NEW MODULE FILE //////////////////////////////////////////
  addModuleFile(objectReceived: ModuleFile) {
    // objectReceived.moduleFileIsActive = true;




    let formData = new FormData();
    for (let i = 0; i <= this.files.length; i++) {
      formData.append("files", this.files[i]);
    }
    formData.append("admin", new Blob([JSON.stringify(objectReceived)], { type: 'application/json' }));


    this.moduleFileService.addModuleFile(formData).subscribe(
      (data) => {

        this.uploadfileService.uploadFiles(this.files).subscribe();

        this.moduleFile = data;


        this.dialogBoxServices.open("File Added successfully", 'information');
        this.activeModule(objectReceived.moduleId)

        this.emptyModuleFile = {} as ModuleFile;
        this.ngOnInit();
        this.back();
      },

      (error) => {
        this.dialogBoxServices.open("File is Already Present pls Select Another file..", 'warning');
        console.log('failed to upload ')
      }

    );
  }

  //////////////////////////////////  GET MODULE FILE BY MODULE ID ////////////////////////////////////////////////
  async getModuleFileByModuleId(moduleId: number): Promise<any> {
    try {
      const response: any = await this.moduleFileService.getModuleFilesByModuleId(moduleId).toPromise();
      this.moduleFilesInModule = response;

    } catch (error) {
      console.error('Error fetching module files:', error);
      throw error;
    }
  }
  ////////////////////////////////////// ACTIVATE MODULE FILE BY MODULE FILE ID /////////////////////////////////////
  private async activeModule(moduleId: any) {
    try {

      await this.getModuleFileByModuleId(moduleId);

      if (this.moduleFilesInModule && this.moduleFilesInModule.length > 0) {


        //Calling Service from Module component
        this.moduleService.activateModuleById(moduleId).subscribe(
          () => {
            //this.dialogBoxServices.open('Module Activated', 'information');
            this.ngOnInit();
          },
          error => {
            console.error('Error activating module:', error);
            //this.dialogBoxServices.open('Failed to Activate', 'warning');
          }
        );
      } else {
        this.dialogBoxServices.open('Module has no files. Cannot activate without files.', 'warning');
      }
    } catch (error) {
      console.error('Error during module activation:', error);
      this.dialogBoxServices.open('An error occurred during module activation', 'warning');
    }
  }


  ///////////////////////////////// UPDATE MODULE FILE BY MODULE  FILE ID ////////////////////////////////
  // For updating module files by id
  private updateModuleFileById(currentData: ModuleFile) {
    // calling service for updating data


    if (this.files == null) {


      this.moduleFileService.updateModuleFileJsonById(currentData.moduleFileId, currentData).subscribe(
        response => {
          // this.uploadfileService.uploadFiles(this.files).subscribe();

          this.dialogBoxServices.open("Module File updated successfully !", 'information');

          this.back();

        },
        error => {
          this.dialogBoxServices.open("Module File updation failed", 'warning');

        }

      );

    }
    else {


      let formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append("files", this.files[i]);



        currentData.moduleFile = this.files[i].name;
      }



      formData.append("admin", new Blob([JSON.stringify(currentData)], { type: 'application/json' }));

      this.moduleFileService.updateModuleFileById(currentData.moduleFileId, formData).subscribe(
        response => {
          //this.uploadfileService.uploadFiles(this.files).subscribe();

        },
        error => {
          this.dialogBoxServices.open("Module File updation failed", 'warning');

        }

      );

      this.dialogBoxServices.open("Module File updated successfully !", 'information');

      this.back();
    }
  }




  ///////////////////////////////////////// GET ALL MODULE FILE AS LIST //////////////////////////////////////////
  private getAllModulesFile() {
    // calling service to get all data

    this.moduleFileService.fetchModuleFileListActiveModule().subscribe(
      response => {
        // console.log(response);

        this.allModuleFileData = response; //assign data to local variable

      },
      error => {
        console.log('No data in table ');
      }
    );
  }





  //////////////////////////////////////  DELETE MODULE FILE BY MODULE FILE ID ///////////////////////////////////////
  private deleteModuleFileById(moduleFileId: number) {
    this.dialogBoxServices.open('Are you sure you want to delete this ModuleFile ? ', 'decision').then((response) => {
      if (response) {

        // Do something if the user clicked OK
        // calling service to soft delte
        this.moduleFileService.deleteModuleFileById(moduleFileId).subscribe(
          (response) => {
            this.dialogBoxServices.open("Module File deleted successfully !", 'information');

            this.ngOnInit();
          },
          (error) => {

            this.dialogBoxServices.open("Module File deletion failed", 'warning');
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

  //////////////////////////////////////////  GET LIST OF INACTIVE MODULE FILE AS LIST  /////////////////////////////
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
  ///////////////////////////////  ACTIVATE MODULE FILE BY MODULE FILE ID   //////////////////////////////////
  private activeModuleFile(moduleFileId: number) {


    this.moduleFileService.activatemoduleFileById(moduleFileId).subscribe(
      response => {

        this.dialogBoxServices.open("Activated modulefile", 'information');
        this.ngOnInit();
      },
      error => {
        this.dialogBoxServices.open("Failed to activate", 'warning');

      }
    );
  }


  /////////////////////////////////////   GET MODULE FILE BY MODULE FILE ID /////////////////////////////////
  display(moduleFileId: number) {

    this.moduleFileService.getFile(moduleFileId).subscribe(
      (response) => {

      }
    )
  }

  // for calling ifferent service based on role
  private async loadDataBasedOnRole(userRole: any) {


    switch (userRole) {

      case 'teacher':
        // this.getInstitutionAndDepartmentsOfUserByUserId(this.profileId);

        this.getAssignedCoursesByProfileId(this.profileId);
        await this.getModulesOfAssignedCoursesByProfileId(this.profileId);
        this.getModuleFilesOfAssignedCoursesOfModulesByProfileId(this.profileId)
        break;

      case 'student':
        // this.getInstitutionAndDepartmentsOfUserByUserId(this.profileId);

        // this.getEnrolledCoursesByProfileId(this.profileId);
        // await this.getModulesOfEnrolledCoursesByProfileId(this.profileId);
        // this.getModuleFilesOfEnrolledCoursesOfModulesByProfileId(this.profileId)

        this.getAssignedCoursesByProfileId(this.profileId);
        await this.getModulesOfAssignedCoursesByProfileId(this.profileId);
        this.getModuleFilesOfAssignedCoursesOfModulesByProfileId(this.profileId)

        break;
    }
  }

  ////////////////////////////////////////  GET COURSES ASSIGNED BY PROFILE ID ////////////////////////////////////////
  //getting courses assigned to teacher using profileId  --Course Service
  private getAssignedCoursesByProfileId(teacherId: number) {
    this.courseService.getAssignedCourseOfTeacher(teacherId).subscribe(
      (data) => {

        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }



  //////////////////////////////////////// GET ENROLLED COURSES BY PROFILE ID //////////////////////////////////// 
  //getting courses assigned to teacher using profileId  --Course Service
  private getEnrolledCoursesByProfileId(studentId: number) {
    this.courseService.getCourseByStudentId(studentId).subscribe(
      (data) => {

        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  ////////////////////////////////  GET MODULES ASSIGNED COURSES BY PROFILE ID 1////////////////////////////////
  async getModulesOfAssignedCoursesByProfileId(profileId: number) {
    // const modules = await this.moduleService.getModulesOfAssignedCoursesByProfileId(profileId).toPromise();
    // console.log(modules);

    this.moduleService.getModulesOfAssignedCoursesByProfileId(profileId).subscribe(
      response => {
        console.log(response);

        let name;
        this.modulesData = response;

        for (let u = 0; u < this.modulesData.length; u++) {
          if (this.modulesData[u].moduleIsActive == true) {

            console.log(this.modulesData[u]);

          }



        }



      }
    )













  }

  /////////////////////////////// GET MODULES ENROLLED COURSES BY PROFILE ID ////////////////////////////////
  async getModulesOfEnrolledCoursesByProfileId(profileId: number) {
    const modules = await this.moduleService.getModulesOfEnrolledCoursesByProfileId(profileId).toPromise();
    if (modules !== undefined) {
      this.modules = modules;
    }
  }



  //////////////////////////////////// GET MODULE FILES OF ASSIGNED COURSES MODULES BY PROFILE ID //////////////////////////
  getModuleFilesOfAssignedCoursesOfModulesByProfileId(profileId: number) {
    this.moduleFileService.getModuleFilesOfAssignedCoursesOfModulesByProfileId(profileId).subscribe(
      (response) => {
        this.allData = [];
        this.allInActiveData = [];

        response.forEach((moduleFile: ModuleFile) => {
          this.modules.find((module: Module) => {
            if (moduleFile.moduleId == module.moduleId) {
              if (module.moduleIsActive) {
                if (moduleFile.moduleFileIsActive) {
                  this.allData.push({
                    ...moduleFile,
                    courseId: module.courseId_id,

                  });
                }


              } else {
                this.allInActiveData.push({
                  ...moduleFile,
                  courseId: module.courseId_id,

                });


              }


            }
          })
        })
      }
    );

  }


  ////////////////////////////////////////// GET MODULE FILES ENROLLED COURSES OF MODULE BY PROFILE ID ////////////////////////////
  getModuleFilesOfEnrolledCoursesOfModulesByProfileId(profileId: number) {
    this.moduleFileService.getModuleFilesOfEnrolledCoursesOfModulesByProfileId(profileId).subscribe(
      (response) => {

        this.allData = [];
        this.allInActiveData = [];

        response.forEach((moduleFile: ModuleFile) => {
          this.modules.find((module: Module) => {
            if (moduleFile.moduleId == module.moduleId) {
              if (moduleFile.moduleFileIsActive) {
                this.allData.push({
                  ...moduleFile,
                  courseId: module.courseId_id,

                });


              } else {
                this.allInActiveData.push({
                  ...moduleFile,
                  courseId: module.courseId_id,

                });


              }


            }
          })
        })


      }
    );

  }
}





