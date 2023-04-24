import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../components/question/question.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';
import { FilterPipe } from 'app/shared/pipes/filter/filter.pipe';
import { AddQuestionAnswerComponent } from '../components/add-question-answer/add-question-answer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdvFilterPipe } from 'app/shared/pipes/adv-filter/adv-filter.pipe';
import { QuestionAnswerComponent } from '../components/question-answer/question-answer.component';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    AddQuestionAnswerComponent,
    QuestionComponent,
    QuestionAnswerComponent
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
export class QuestionModule { }
