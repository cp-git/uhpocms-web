import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'app/category/class/category';
import { CategoryAllColumn, CategoryColumn } from 'app/category/column-name/category-column';

import { CategoryService } from 'app/category/services/category.service';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';

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


  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'roleId';

  // adminRoles: AdminRole[] = []; 
  allData: Category[] = []; // list of active category
  allInActiveData: Category[] = []; // list of inactive category

  emptyCategory: Category;  // empty category
  currentData!: Category;  // for update and view, to show existing data



  constructor(private service: CategoryService, private location: Location, private _route: Router,private dialogBoxService:DialogBoxService) {


    this.columnNames = CategoryColumn;
    this.allColumnNames = CategoryAllColumn;

    // creating empty object
    this.emptyCategory = new Category();
  }

  ngOnInit(): void {
    this.getAllCategories();  // for getting all active category
    this.getInActiveCategories(); // for getting all inactive category
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

    // hiding view of all column and displaying allcategory  screen 
    this.viewOne = true;
    this.viewAll = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Category): void {

    // hiding update screen and displaying all category screen 
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Category): void {
    this.deleteCategory(objectReceived.categoryId);
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

  // For updating category
  private updateRole(currentData: Category) {
    // calling service for updating data
    console.log(currentData)
    this.service.updateCategory(currentData, currentData.categoryId).subscribe(
      response => {
        console.log(`Category updated successfully !`);
        this.dialogBoxService.open('Category updated successfully','information');
        this.back();
      },
      error => {
        console.log(`Category updation failed !`);
        this.dialogBoxService.open('Category updation failed','warning')
      }
    );
  }


  addCategory(toCreateCategory: Category) {

    var categoryId = toCreateCategory.categoryId;

    toCreateCategory.active = true;

    this.service.insertCategory(toCreateCategory).subscribe(
      response => {

        console.log("Category added successfully");
        this.dialogBoxService.open('Category added successfully','information')
        this.emptyCategory = {} as Category;
        this.ngOnInit();
        this.back();

      },
      error => {
        console.log("Cannot add category successfully ");
        this.dialogBoxService.open('Failed to Add category','warning')
      }

    )
  }

  // for getting all category
  private getAllCategories() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service._getAllCategorys().subscribe(
      response => {

        this.allData = response; //assign data to local variable
        this.allData.sort((a, b) => a.categoryName.toLowerCase() > b.categoryName.toLowerCase() ? 1 : -1) // order by alphabets for category name
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

  //  // For deleting (soft delete) category using Id
  private deleteCategory(categoryId: number) {
    this.dialogBoxService.open('Are you sure you want to delete this Category ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
    // calling service to soft delete
    this.service.deleteCategoryById(categoryId).subscribe(
      (response) => {
        console.log('Category deleted successfully');
        this.dialogBoxService.open('Category deleted successfully', 'information');
        this.ngOnInit();
      },
      (error) => {
        this.dialogBoxService.open('Category deletion Failed', 'warning');
      }
    );
  } else {
    console.log('User clicked Cancel');
    // Do something if the user clicked Cancel
  }
});
}



  // For getting all inactive category
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

  // For activating category
  private activateCategory(categoryName: string) {

    // calling service to activating category
    this.service.updateActiveStatus(categoryName).subscribe(
      response => {
        console.log("Activated category");
        this.dialogBoxService.open('Category Activated','information')
        this.ngOnInit();
      },
      error => {
        console.log("Failed to activate");
        this.dialogBoxService.open('Failed to activate','warning')
      }
    );
  }



}
