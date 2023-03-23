import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../components/question/question.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';



@NgModule({
  declarations: [
    QuestionComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class QuestionModule { }
