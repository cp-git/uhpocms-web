import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './components/department/department.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';



@NgModule({
  declarations: [
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class DepartmentModule { }
