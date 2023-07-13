import { Component, OnInit } from '@angular/core';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';

import { DepartmentAllColumn, DepartmentColumn, DepartmentUpdateColumn } from 'app/department/column/department-column';


import { Location } from '@angular/common';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  moduleName: string = 'Department Administration';

  //screen view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewOne: boolean = false;
  viewAll: boolean = true;
  viewActivate: boolean = false;

  // for buttons to view
  showAddButton: boolean = true;
  showActivateButton: boolean = true;

  // dataAvailable: boolean = false;

  columnNames: any;
  allColumnNames: any;

  updateColumnNames: any;


  // For dropdown
  readonly primaryIdColumnName: string = 'id';
  readonly dropdownColumnId1: string = 'adminInstitutionId';
  readonly dropdownColumnName1: string = 'adminInstitutionName';

  allData: Department[] = [];
  allInActiveData: Department[] = [];

  sessionData: any;
  data: any;

  emptyDepartment: Department; // empty department
  currentData!: Department; // for update and view, to show existing data

  constructor(private service: DepartmentService, private location: Location, private dialogBoxServices: DialogBoxService) {
    // assigng headers
    this.columnNames = DepartmentColumn;
    this.allColumnNames = DepartmentAllColumn;
    this.updateColumnNames = DepartmentUpdateColumn;

    // creating empty object
    this.emptyDepartment = new Department();

    this.loadAdminInstitutions();
  }

  ngOnInit(): void {
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

      this.showAddButton = true;
      this.showActivateButton = true;
    } else {
      this.location.back();
    }
  }

  adminInstitutions: AdminInstitution[] = [];

  // For navigate to view screen with data
  // function will call when child view button is clicked
  onChildViewClick(objectReceived: any): void {
    // hiding view of all column and displaying all departments screen
    this.viewOne = true;
    this.viewAll = false;
    this.showAddButton = false;
    this.showActivateButton = false;
    this.currentData = objectReceived; // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked
  onChildUpdateClick(objectReceived: Department): void {
    // hiding update screen and displaying all departments screen
    this.viewAll = false;
    this.viewUpdate = true;
    this.showAddButton = false;
    this.showActivateButton = false;
    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked
  onChildDeleteClick(objectReceived: Department): void {
    this.deleteDepartment(objectReceived.id);
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked
  onChildActivateClick(objectReceived: Department): void {
    this.activateDepartment(objectReceived.id);
  }

  // for navigating to add screen
  onAddClick() {
    this.emptyDepartment = {} as Department;
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
  onAddDepartmentSubmit(objectReceived: Department): void {
    this.addDepartment(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateDepartmentSubmit(objectReceived: Department) {
    this.updateDepartment(objectReceived);
  }

  // for loading adminInstitutitons from session data
  private loadAdminInstitutions() {
    try {
      this.sessionData = sessionStorage.getItem('admininstitution');
      //console.log(this.sessionData);
      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.adminInstitutions.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err);
    }
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // For updating department
  private updateDepartment(currentData: Department) {
    // calling service for updating data
    this.service.updateDepartment(currentData.id, currentData).subscribe(
      (response) => {
        this.dialogBoxServices.open('Department updated successfully', 'information');
        this.back();
      },
      (error) => {
        this.dialogBoxServices.open('Department updation Failed', 'warning');
      }
    );
  }

 // For adding department
 private addDepartment(currentData: Department) {
  // currentData.active = true; // setting active true

  // calling service for adding data
  this.service.insertDepartment(currentData).subscribe(
    (data) => {
      console.log('Department added Successfully');
      if (data.active) {
        this.dialogBoxServices.open("Department added successfully", 'information').then((response) => {
          if (response) {
            location.reload(); // Refresh the page
          }

        });
      } else {
        this.dialogBoxServices.open("Department added successfully but NOT ACTIVE", 'information');
      }
      this.emptyDepartment = {} as Department;
      this.ngOnInit();
      this.back();
     
    },
    (error) => {
      this.dialogBoxServices.open("Department is Already Present pls Select Another Name", 'warning');
    }
  );
}

  // for getting all departments
  private getAllDepartments() {
    // this.dataAvailable = true;

    // calling service to get all data
    this.service.getAllDepartments().subscribe(
      (response) => {
        this.allData = response; //assign data to local variable
        this.allData.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) // order by alphabets for department name
        // if no data available
        if (this.allData.length > 0) {
          // this.dataAvailable = true;
        }
      },
      (error) => {
        console.log('No data in table ');
      }
    );
  }

  // For deleting (soft delete) department
  private deleteDepartment(id: number) {
    this.dialogBoxServices.open('Are you sure you want to delete this Department ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        // calling service to soft delte
    this.service.deleteDepartmentById(id).subscribe(
      (response) => {
        this.dialogBoxServices.open("Department deleted successfully", 'information').then((response) => {
          if (response) {
            location.reload(); // Refresh the page
          }

        });
        this.ngOnInit();
       
      },
      (error) => {
        this.dialogBoxServices.open('Department deletion Failed', 'warning');
      }
    );
  } else {
    console.log('User clicked Cancel');
    // Do something if the user clicked Cancel
  }
});
}

  // For getting all inactive departments
  private getInactiveDepartment() {
    // calling service to get all inactive record
    this.service.getAllDeactivatedDepartments().subscribe(
      (response) => {
        this.allInActiveData = response;
        this.allInActiveData.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) // order by alphabets for department name
      },
      (error) => {
        console.log('No data in table ');
      }
    );
  }

  // For activating department using role id
  private activateDepartment(id: number) {
    // calling service to activating department
    this.service.activateDepartment(id).subscribe(
      (response) => {
        this.dialogBoxServices.open("Department Activated", 'information').then((response) => {
          if (response) {
            location.reload(); // Refresh the page
          }

        });
        this.ngOnInit();
        
      },
      (error) => {
        this.dialogBoxServices.open("Failed to Activate", 'warning');
      }
    );
  }
}
