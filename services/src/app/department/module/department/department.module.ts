import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DepartmentComponent } from 'app/department/components/department/department.component';
import { TableModule } from 'app/front/module/table.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentComponent } from 'app/department/components/add-department/add-department.component';
import { ViewOneDepartmentComponent } from 'app/department/components/view-one-department/view-one-department.component';
import { UpdateDepartmentComponent } from 'app/department/components/update-department/update-department.component';



@NgModule({
  declarations: [
    DepartmentComponent,
    AddDepartmentComponent,
    ViewOneDepartmentComponent,
    UpdateDepartmentComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    Location
  ]
})
export class DepartmentModule { }
