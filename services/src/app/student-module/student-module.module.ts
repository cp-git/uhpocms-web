import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentModuleComponent } from './components/student-module/student-module.component';
import { StudentQuizComponent } from './components/student-quiz/student-quiz.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { CountdownModule } from 'ngx-countdown';



@NgModule({
  declarations: [
    StudentModuleComponent,
    StudentQuizComponent,
  ],

  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule,
    CountdownModule
  ]
})
export class StudentModuleModule { }
