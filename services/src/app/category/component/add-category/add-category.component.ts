import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { Course } from 'app/teacher-course/class/course';

import { Category } from 'app/category/class/category';
import { CategoryService } from 'app/category/services/category.service';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  categories: Category[] = [];

  category: Category;


  isHidden: boolean = false;
  constructor(private categoryService: CategoryService, private _route: Router, private dialogBoxService: DialogBoxService) {
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


        this.dialogBoxService.open('category add successfully', 'information');
        this._route.navigate(['category']);

        if (this.categories.length > 0) {
          this.isHidden = true;
        }

      },
      error => {
        console.log("please enter valid details");
        this.dialogBoxService.open('Failed to Add category', 'warning');
      }

    )
  }


}
