import { Component } from '@angular/core';
import { AuthModule } from 'app/permissions/class/auth-module';
import { AuthModuleColumn } from 'app/permissions/columns-name/auth-module-column';
import { AuthModuleService } from 'app/permissions/services/authModule/auth-module.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auth-module',
  templateUrl: './auth-module.component.html',
  styleUrls: ['./auth-module.component.css']
})
export class AuthModuleComponent {

  // title heading
  moduleName: string = "Master-Module Administration";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  // for buttons to view
  showAddButton: boolean = false;
  showActivateButton: boolean = false;
  updateButton: boolean = false;
  deleteButton: boolean = false;

  columnNames: any; // header for column data
  // allColumnNames: any

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'id';

  // authModules: AuthModule[] = []; 
  allData: AuthModule[] = []; // list of active Auth Module
  allInActiveData: AuthModule[] = []; // list of inactive Auth Module

  emptyAuthModule: AuthModule;  // empty AuthModule
  currentData!: AuthModule;  // for update and view, to show existing data

  constructor(private service: AuthModuleService, private location: Location) {

    this.columnNames = AuthModuleColumn;
    // this.allColumnNames = AuthModuleColumn;

    // creating empty object
    this.emptyAuthModule = new AuthModule();
  }

  ngOnInit(): void {
    this.getAllAuthModules();  // for getting all active Auth Modules
    // this.getInActiveAuthModules(); // for getting all inactive Auth Modules
  }

  // back button functionality
  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;

      this.showAddButton = false;
      this.showActivateButton = false;

    } else {
      this.location.back();
    }

  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all Auth Modules screen 
    this.viewOne = true;
    this.viewAll = false;
    this.showAddButton = false;
    this.showActivateButton = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: AuthModule): void {

    // hiding update screen and displaying all Auth Modules screen 
    this.viewAll = false;
    this.viewUpdate = true;
    this.showAddButton = false;
    this.showActivateButton = false;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: AuthModule): void {
    this.deleteAuthModule(objectReceived.id);
  }

  // // For navigate to activate screen with data
  // // function will call when child update button is clicked 
  // onChildActivateClick(objectReceived: AuthModule): void {
  //   this.activateAuthModule(objectReceived.id);
  // }

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
  onAddAuthModuleSubmit(objectReceived: AuthModule): void {
    this.addAuthModule(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateAuthModuleSubmit(objectReceived: AuthModule) {
    this.updateAuthModule(objectReceived);
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // For updating Auth Module
  private updateAuthModule(currentData: AuthModule) {
    // calling service for updating data
    this.service.updateAuthModule(currentData.id, currentData).subscribe(
      response => {

        this.back();
      },
      error => {
        console.log(`AuthModule updation failed !`);
      }
    );
  }

  // For adding Auth Module
  private addAuthModule(currentData: AuthModule) {

    // calling service for adding data
    this.service.addAuthModule(currentData).subscribe(
      (data) => {

        this.emptyAuthModule = {} as AuthModule;
        this.ngOnInit();
        this.back();
      },
      (error) => {
        console.log("Failed to add AuthModule");
      });
  }


  // for getting all Auth Modules
  private getAllAuthModules() {

    // calling service to get all data
    this.service.getAllAuthModules().subscribe(
      response => {
        this.allData = response; //assign data to local variable
      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  // For deleting (soft delete) Auth Module using AuthModule name
  private deleteAuthModule(id: number) {

    // calling service to soft delte
    this.service.deleteAuthModule(id).subscribe(
      (response) => {

        this.ngOnInit();
      },
      (error) => {
        console.log('Admin AuthModule deletion failed');
      }
    );
  }

}
