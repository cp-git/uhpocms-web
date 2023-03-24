import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'app/category/category';
import { CategoryService } from 'app/category/category.service';
import { Course } from 'app/teacher-course/class/course';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  categories: Category[] = [];

  category: Category;


  isHidden: boolean = false;
  constructor(private categoryService: CategoryService, private _route: Router) {
    this.category = new Category();

  }
  Back() {
    this._route.navigate(['category'])
  }

  addCategory(toCreateCategory: Category) {

    var categoryId = toCreateCategory.categoryId;
    toCreateCategory.categoryId = 0;
    toCreateCategory.active = true;

    this.categoryService.insertCategory(toCreateCategory).subscribe(
      response => {
        this.category = response;

        alert("category add successfully");
        this._route.navigate(['category']);

        if (this.categories.length > 0) {
          this.isHidden = true;
        }

      },
      error => {
        alert("please enter valid details");
      }

    )
  }


}
