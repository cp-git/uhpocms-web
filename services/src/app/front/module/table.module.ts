import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAllComponent } from '../component/view-all/view-all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { ViewAddComponent } from '../component/view-add/view-add.component';

@NgModule({
  declarations: [
    ViewAllComponent,
    ViewAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ViewAllComponent,
    ViewAddComponent
  ]
})
export class TableModule { }
