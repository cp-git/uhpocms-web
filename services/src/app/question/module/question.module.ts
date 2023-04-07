import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../components/question/question.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';
import { FilterPipe } from 'app/shared/pipes/filter/filter.pipe';
import { AddQuestionAnswerComponent } from '../components/add-question-answer/add-question-answer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdvFilterPipe } from 'app/shared/pipes/adv-filter/adv-filter.pipe';



@NgModule({
  declarations: [
    AddQuestionAnswerComponent,
    QuestionComponent,
    FilterPipe,
    AdvFilterPipe
  ],
  imports: [
    CommonModule,
    ReusableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class QuestionModule { }
