import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'app/category/category';
import { CategoryService } from 'app/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories: Category[] = [];

  category: Category;

  isHidden: boolean = false;
  constructor(private categoryService: CategoryService, private _route: Router) {
    this.category = new Category();

  }


  addCategory(toCreateCategory: Category) {

    var categoryId = toCreateCategory.categoryId;
    toCreateCategory.categoryId = null;

    this.categoryService.insertCategory(toCreateCategory).subscribe(
      response => {
        this.category = response;

        alert("category add successfully");
        location.reload();

        if (this.categories.length > 0) {
          this.isHidden = true;
        }
      },
      error => {
        alert("Category Already Exist");
      }

    )
  }

  updateCategory(toUpdateCategory: Category) {
    this.categoryService.updateCategory(toUpdateCategory).subscribe(
      response => {
        this.category = response;
        alert("category updated successsfully")
        location.reload();
        if (this.categories.length > 0) {
          this.isHidden = true;
        }
      },
      error => {
        alert("please enter valid details")
      }

    )

  }

  deleteCategory(toDeleteCategory: Category) {
    this.categoryService.deleteCategory(toDeleteCategory.categoryName).subscribe(
      response => {
        alert(toDeleteCategory.categoryName + "    deleted Successfully")
        location.reload();
        this.emptyRow();
      },
      error => {
        alert("Failed to Delete")
      }

    )
  }
  ngOnInit(): void {

    //this.extraEmptyRow();
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this._route.navigate(['login'])
    } else {
      this.getAllCategories();
    }


  }

  getAllCategories() {

    this.categoryService._getAllCategorys().subscribe(
      response => {
        // assigning received data to emails
        this.categories = response;

        this.emptyRow();

      },
      error => {
        alert("Data not found");
      }
    );
  }

  private emptyRow() {
    if (this.categories.length <= 0) {

      // setting empty object for empty row
      //this.categories = ({} as Category);

      // default value while adding record
      this.category.active = true;
      this.isHidden = true;
    }


  }
  Back() {
    this._route.navigate(['main'])
  }
}
