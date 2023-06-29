import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewAnswerComponent } from 'app/review-answer/components/review-answer/review-answer.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'app/shared/shared.module';
import { AddReviewMarksComponent } from 'app/review-answer/components/add-review-marks/add-review-marks.component';


@NgModule({
  declarations: [
    ReviewAnswerComponent,
    AddReviewMarksComponent
  ],
  imports: [
    CommonModule,
    ReusableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class ReviewModule { }
