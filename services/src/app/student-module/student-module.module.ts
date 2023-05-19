import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentModuleComponent } from './components/student-module/student-module.component';
import { StudentQuizComponent } from './components/student-quiz/student-quiz.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ChartdataComponent } from './components/chartdata/chartdata.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BarchPopupComponent } from './components/barch-popup/barch-popup.component';



@NgModule({
  declarations: [
    StudentModuleComponent,
    StudentQuizComponent,
   
  
 
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule
  ]
})
export class StudentModuleModule { }
