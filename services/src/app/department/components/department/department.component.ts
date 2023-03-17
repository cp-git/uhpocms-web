import { Component, OnInit } from '@angular/core';
import { flushMicrotasks } from '@angular/core/testing';
//import { Department } from 'app/admindepartment/department';
import { Department } from 'app/department/department';
import { DepartmentService } from 'app/department/services/department.service';
import { DepartmentColumn } from 'app/department/department-column';
import { DepartmentAllColumn } from 'app/department/department-column';
import { Location } from '@angular/common';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  moduleName: string = 'Department Administration';

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
  readonly dropdownColumnId1: string = 'adminInstitutionId';
  readonly dropdownColumnName1: string = 'adminInstitutionName';

  allData: Department[] = [];
  allInActiveData: Department[] = [];

  sessionData: any;
  data: any;

  emptyDepartment: Department;  // empty admin role
  currentData!: Department;  // for update and view, to show existing data




  constructor(private service: DepartmentService, private location: Location) {

    // assigng headers
    // this.adminRoleHeader = AdminRoleColumn;
    // this.adminRoleAllHeader = AdminRoleAllColumn;

    this.columnNames = DepartmentColumn;
    this.allColumnNames = DepartmentAllColumn;

    // creating empty object
    this.emptyDepartment = new Department();

    this.loadAdminInstitutions();
  }


  ngOnInit(): void {
    //  this.service.get
    this.getAllDepartments();
    this.getInactiveDepartment();



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

  adminInstitutions: AdminInstitution[] = [];

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
  onChildUpdateClick(objectReceived: Department): void {

    // hiding update screen and displaying all admin roles screen 
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Department): void {
    this.deleteDepartment(objectReceived.name);
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onChildActivateClick(objectReceived: Department): void {
    this.activateDepartment(objectReceived.id);
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
  onAddDepartmentSubmit(objectReceived: Department): void {
    this.addDepartment(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateDepartmentSubmit(objectReceived: Department) {
    this.updateDepartment(objectReceived);
  }

  private loadAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');
    //alert(this.sessionData);
    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
  }
  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // For updating admin role
  private updateDepartment(currentData: Department) {
    // calling service for updating data
    this.service.updateDepartment(currentData.id, currentData).subscribe(
      response => {
        alert(`Department updated successfully !`);
        this.back();
      },
      error => {
        alert(`Department updation failed !`);
      }
    );
  }

  // For adding 
  private addDepartment(currentData: Department) {

    currentData.active = true;  // setting active true

    // calling service for adding data
    this.service.insertDepartment(currentData).subscribe(
      (data) => {
        alert('Department added Successfully');
        this.emptyDepartment = {} as Department;
        this.ngOnInit();
        this.back();
      },
      (error) => {
        alert("Failed to add Department");
      });
  }


  // for getting all 
  private getAllDepartments() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service.getAllDepartments().subscribe(
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
  private deleteDepartment(name: string) {

    // calling service to soft delte
    this.service.deleteDepartment(name).subscribe(
      (response) => {
        alert('Department deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        alert('Department deletion failed');
      }
    );
  }

  // For getting all inactive admin roles
  private getInactiveDepartment() {

    // calling service to get all inactive record
    this.service.getAllDeactivatedDepartments().subscribe(
      response => {
        this.allInActiveData = response;
      },
      error => {
        console.log('No data in table ');
      }
    );

  }


  // For activating admin role using role id
  private activateDepartment(roleId: number) {

    // calling service to activating admin role
    this.service.activateDepartment(roleId).subscribe(
      response => {
        alert("Activated admin role");
        this.ngOnInit();
      },
      error => {
        alert("Failed to activate");
      }
    );
  }

}
