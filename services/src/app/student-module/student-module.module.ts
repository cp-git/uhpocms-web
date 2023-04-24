import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentModuleComponent } from './components/student-module/student-module.component';
import { StudentQuizComponent } from './components/student-quiz/student-quiz.component';
import { RemoveExtensionPipe } from 'app/shared/pipes/removeExtension/remove-extension.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'app/shared/pipes/filter/filter.pipe';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    StudentModuleComponent,
    StudentQuizComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule
  ]
})
export class StudentModuleModule { }
