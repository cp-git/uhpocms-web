import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentModuleComponent } from './components/student-module/student-module.component';
import { StudentQuizComponent } from './components/student-quiz/student-quiz.component';
import { RemoveExtensionPipe } from 'app/shared/pipes/removeExtension/remove-extension.pipe';
import { Filter2Pipe } from 'app/shared/pipes/filter2/filter2.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StudentModuleComponent,
    StudentQuizComponent,
    RemoveExtensionPipe,
    Filter2Pipe
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class StudentModuleModule { }
