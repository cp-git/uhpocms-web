import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'app/category/category';
import { CategoryAllColumn, CategoryColumn } from 'app/category/category-column';
import { CategoryService } from 'app/category/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  // title heading
  moduleName: string = "Category Administration";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;
  // If all data is available or not
  dataAvailable: boolean = false;

  // adminRoleHeader: any; // header for minimum visible column data
  // adminRoleAllHeader: any;  // header for all visible column data

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'roleId';

  // adminRoles: AdminRole[] = []; 
  allData: Category[] = []; // list of active admin role
  allInActiveData: Category[] = []; // list of inactive admin role

  emptyCategory: Category;  // empty admin role
  currentData!: Category;  // for update and view, to show existing data



  constructor(private service: CategoryService, private location: Location, private _route: Router) {

    // assigng headers
    // this.adminRoleHeader = AdminRoleColumn;
    // this.adminRoleAllHeader = AdminRoleAllColumn;

    this.columnNames = CategoryColumn;
    this.allColumnNames = CategoryAllColumn;

    // creating empty object
    this.emptyCategory = new Category();
  }

  ngOnInit(): void {
    this.getAllCategories();  // for getting all active admin roles
    this.getInActiveCategories(); // for getting all inactive admin roles
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
  onChildUpdateClick(objectReceived: Category): void {

    // hiding update screen and displaying all admin roles screen 
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Category): void {
    this.deleteCategory(objectReceived.categoryName);
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onChildActivateClick(objectReceived: Category): void {
    this.activateCategory(objectReceived.categoryName);
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
  onAddCategorySubmit(objectReceived: Category): void {
    this.addCategory(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateCategorySubmit(objectReceived: Category) {
    this.updateRole(objectReceived);
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // For updating admin role
  private updateRole(currentData: Category) {
    // calling service for updating data
    console.log(currentData)
    this.service.updateCategory(currentData, currentData.categoryId).subscribe(
      response => {
        alert(`Category updated successfully !`);
        this.back();
      },
      error => {
        alert(`Category updation failed !`);
      }
    );
  }

  // For adding admin role
  //  private addCategory(currentData: Category) {

  //    currentData.active = true;  // setting active true

  //    // calling service for adding data
  //    this.service.addAdminRole(currentData).subscribe(
  //      (data) => {
  //        alert('Role added Successfully');
  //        this.emptyAdminRole = {} as AdminRole;
  //        this.ngOnInit();
  //        this.back();
  //      },
  //      (error) => {
  //        alert("Failed to add role");
  //      });
  //  }


  addCategory(toCreateCategory: Category) {

    var categoryId = toCreateCategory.categoryId;
    // toCreateCategory.categoryId = ;
    toCreateCategory.active = true;

    this.service.insertCategory(toCreateCategory).subscribe(
      response => {
        // this.currentData = response;

        alert("Category added successfully");
        this.emptyCategory = {} as Category;
        this.ngOnInit();
        this.back();
        // this._route.navigate(['category']);

        // if (this.allData.length > 0) {
        //   // this.isHidden = true;
        // }

      },
      error => {
        alert("Cannot add category successfully ");
      }

    )
  }

  // for getting all admin roles
  private getAllCategories() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service._getAllCategorys().subscribe(
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

  //  // For deleting (soft delete) admin role using role name
  private deleteCategory(roleName: string) {

    // calling service to soft delete
    this.service.deleteCategory(roleName).subscribe(
      (response) => {
        alert('Category deleted successfully');
        this.ngOnInit();
      },
      (error) => {
        alert('Category deletion failed');
      }
    );
  }



  // For getting all inactive admin roles
  private getInActiveCategories() {

    // calling service to get all inactive record
    this.service.getInactivecategoryList().subscribe(
      response => {
        this.allInActiveData = response;
      },
      error => {
        console.log('No data in table ');
      }
    );

  }

  // For activating admin role using role id
  private activateCategory(categoryName: string) {

    // calling service to activating admin role
    this.service.updateActiveStatus(categoryName).subscribe(
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
