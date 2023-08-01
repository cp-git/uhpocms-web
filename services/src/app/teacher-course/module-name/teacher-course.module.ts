import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherCourseComponent } from '../components/teacher-course/teacher-course.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';
import { AllCourseComponent } from '../components/all-course/all-course.component';


@NgModule({
  declarations: [
    TeacherCourseComponent,
    AllCourseComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class TeacherCourseModule { }
