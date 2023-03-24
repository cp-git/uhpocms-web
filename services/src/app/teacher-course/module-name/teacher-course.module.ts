import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherCourseComponent } from '../components/teacher-course/teacher-course.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';


@NgModule({
  declarations: [
    TeacherCourseComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class TeacherCourseModule { }
