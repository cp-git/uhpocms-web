import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from 'app/department/components/department/department.component';
import { TableModule } from 'app/front/module/table.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    AppRoutingModule
  ]
})
export class DepartmentModule { }
