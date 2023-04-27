import { Component } from '@angular/core';
import { Module } from 'app/module/class/module';
import { ModuleService } from 'app/module/services/module.service';
import { ModuleColumn, ModuleAllColumn } from 'app/module/column-names/module-column';
import { Course } from 'app/teacher-course/class/course';
import { Location } from '@angular/common';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Profile } from 'app/profiles/class/profile';
@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent {

  moduleName: string = 'Module';

  //screen view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewOne: boolean = false;
  viewAll: boolean = true;
  viewActivate: boolean = false;

  dataAvailable: boolean = false;

  columnNames: any;
  allColumnNames: any;

  readonly primaryIdColumnName: string = 'id';

  allData: Module[] = [];
  allInActiveData: Module[] = [];

  sessionData: any;
  data: any;

  userRole: any;

  courseId: any;
  profileId: any;

  emptyModule: Module;  // empty admin role
  currentData!: Module;  // for update and view, to show existing data




  constructor(private service: ModuleService, private location: Location, private courseService: TeacherCourseService) {

    // assigng headers

    this.columnNames = ModuleColumn;
    this.allColumnNames = ModuleAllColumn;

    // creating empty object
    this.emptyModule = new Module();
    this.loadCourses();
    this.profileId = sessionStorage.getItem('profileId');
    this.courseId = sessionStorage.getItem('courseId');

    this.userRole = sessionStorage.getItem('userRole');

  }


  ngOnInit(): void {
    //  this.service.get


    this.getInactiveModule();
    this.getAssignedCoursesOfTeacher(this.profileId);




  }

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

  courses: Course[] = [];

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all admin roles screen 
    this.viewOne = true;
    this.viewAll = false;
    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Module): void {

    // hiding update screen and displaying all admin roles screen 
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Module): void {
    if (objectReceived.moduleId !== null) {
      this.deleteModule(objectReceived.moduleId);
    }
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onChildActivateClick(objectReceived: Module): void {
    this.activeModule(objectReceived.moduleName);
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
  onAddModuleSubmit(objectReceived: Module): void {
    this.addModule(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateModuleSubmit(objectReceived: Module) {
    this.updateModule(objectReceived);
  }

  private loadCourses() {

    try {
      this.sessionData = sessionStorage.getItem('course');
      // console.log(this.sessionData);
      this.data = JSON.parse(this.sessionData);
      console.log(this.data);
      for (var inst in this.data) {
        this.courses.push(this.data[inst]);
      }

    }
    catch (err) {
      console.log("Error", err);
    }


  }
  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // For updating admin role
  // private updateModule(currentData: Module) {
  //   // calling service for updating data
  //   this.service.updateModule(currentData.moduleName, currentData).subscribe(
  //     response => {
  //       console.log(`Module updated successfully !`);
  //       this.back();
  //     },
  //     error => {
  //       console.log(`Module updation failed !`);
  //     }
  //   );
  // }

  ///update module by id
  // For updating admin role
  private updateModule(currentData: Module) {
    // calling service for updating data
    if (currentData.moduleId !== null) {
      this.service.updateModuleById(currentData.moduleId, currentData).subscribe(
        response => {
          console.log(`Module updated successfully !`);
          this.back();
        },
        error => {
          console.log(`Module updation failed !`);
        }
      );
    }
  }

  // For adding 
  private addModule(currentData: Module) {
    // if (currentData.moduleStartDate && currentData.moduleEndDate && currentData.moduleEndDate <= currentData.moduleStartDate) {
    //   alert("End date must be after start date");
    //   return;
    // }
    currentData.moduleIsActive = true;  // setting active true
    // calling service for adding data
    //console.log(JSON.stringify(currentData));
    this.service.addTeacherModule(currentData).subscribe(
      (data) => {
        //  console.log(this.currentData)
        console.log('Module added Successfully');
        this.emptyModule = {} as Module;
        this.ngOnInit();
        this.back();
      },
      (error) => {
        console.log("Failed to add Module");
      });
  }

  //getting courses assigned to teacher using profileId
  private getAssignedCoursesOfTeacher(teacherId: number) {
    this.courseService.getAssignedCourseOfTeacher(teacherId).subscribe(
      (data) => {
        console.log("courses " + JSON.stringify(data));

        this.courses = data;
        this.getAllModules();
      },
      error => {
        console.log(error);
      }
    );
  }





  // for getting all modules by course id
  private getAllModules() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service.getAllModules().subscribe(
      response => {

        this.allData = response;
        this.allData = this.allData.filter(data =>
          this.courses.map(
            course => course.courseId).includes(data.courseId_id));


        console.log("filtered daTA " + JSON.stringify(this.allData));


        // if no data available
        if (this.allData.length > 0) {
          this.dataAvailable = true;
        }
      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  // // For deleting (soft delete) 
  // private deleteModule(name: string) {

  //   // calling service to soft delte
  //   this.service.deleteModule(name).subscribe(
  //     (response) => {
  //       console.log('Module deleted successfully');
  //       this.ngOnInit();
  //     },
  //     (error) => {
  //       console.log('Module deletion failed');
  //     }
  //   );
  // }

  // For deleting (soft delete) 
  private deleteModule(moduleId: number) {


    // calling service to soft delte
    this.service.deleteModuleById(moduleId).subscribe(
      (response) => {
        console.log('Module deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        console.log('Module deletion failed');
      }
    );

  }

  // For getting all inactive admin roles
  private getInactiveModule() {

    // calling service to get all inactive record
    this.service.getInactivemoduleList().subscribe(
      response => {
        this.allInActiveData = response;
      },
      error => {
        console.log('No data in table ');
      }
    );

  }


  // For activating admin role using role id
  private activeModule(name: string) {

    // calling service to activating admin role
    this.service.activateModule(name).subscribe(
      response => {
        console.log("Activated Module");
        this.ngOnInit();
      },
      error => {
        console.log("Failed to activate");
      }
    );
  }
}
