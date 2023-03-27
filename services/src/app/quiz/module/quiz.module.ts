import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from '../components/quiz/quiz.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';



@NgModule({
  declarations: [
    QuizComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class QuizModule { }
