import { Component } from '@angular/core';
import { Module } from 'app/module/class/module';
import { ModuleService } from 'app/module/services/module.service';
import { ModuleColumn, ModuleAllColumn } from 'app/module/column-names/module-column';
import { Course } from 'app/teacher-course/class/course';
import { Location } from '@angular/common';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent {

  moduleName: string = 'Module Administration';

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

  emptyModule: Module;  // empty admin role
  currentData!: Module;  // for update and view, to show existing data




  constructor(private service: ModuleService, private location: Location) {

    // assigng headers

    this.columnNames = ModuleColumn;
    this.allColumnNames = ModuleAllColumn;

    // creating empty object
    this.emptyModule = new Module();
    this.loadCourses();



  }


  ngOnInit(): void {
    //  this.service.get

    this.getAllModules();
    this.getInactiveModule();




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
    this.deleteModule(objectReceived.moduleName);
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
      // alert(this.sessionData);
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
  private updateModule(currentData: Module) {
    // calling service for updating data
    this.service.updateModule(currentData.moduleName, currentData).subscribe(
      response => {
        alert(`Module updated successfully !`);
        this.back();
      },
      error => {
        alert(`Module updation failed !`);
      }
    );
  }


  // For adding 
  private addModule(currentData: Module) {
    currentData.moduleIsActive = true;  // setting active true
    // calling service for adding data

    this.service.addTeacherModule(currentData).subscribe(
      (data) => {
        //  alert(this.currentData)
        alert('Module added Successfully');
        this.emptyModule = {} as Module;
        this.ngOnInit();
        this.back();
      },
      (error) => {
        alert("Failed to add Module");
      });
  }


  // for getting all 
  private getAllModules() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service.getAllModules().subscribe(
      response => {

        this.allData = response; //assign data to local variable

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

  // For deleting (soft delete) 
  private deleteModule(name: string) {

    // calling service to soft delte
    this.service.deleteModule(name).subscribe(
      (response) => {
        alert('Module deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        alert('Module deletion failed');
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
        alert("Activated Module");
        this.ngOnInit();
      },
      error => {
        alert("Failed to activate");
      }
    );
  }
}
