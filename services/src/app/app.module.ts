import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

import { LoginComponentComponent } from './Login/login-component/login-component.component';

import { AdminroleComponent } from './roleadmin/components/adminrole/adminrole.component';

import { LoginauthComponent } from './authlogin/components/loginauth.component';


import { HomeComponent } from './home/home.component';

import { AddinstituteComponent } from './admin-institution/components/addinstitute/addinstitute.component';
import { DisplayinstituteComponent } from './admin-institution/components/displayinstitute/displayinstitute.component';

import { AnnouncementComponent } from './announcement/components/announcement/announcement.component';
import { CreateAnnouncementComponent } from './announcement/components/create-announcement/create-announcement.component';

import { ActivateRoleComponent } from './roleadmin/components/activate-role/activate-role.component';

import { ActivateInstitutionComponent } from './admin-institution/components/activate-institution/activate-institution.component';

import { TeacherPanelComponent } from './teacher-panel/components/teacher-panel/teacher-panel.component';


import { EnrollstudentComponent } from './enrollstudent/components/enrollstudent.component';


import { AssigncoursetoteacherComponent } from './assigncoursetoteacher/components/assigncoursetoteacher/assigncoursetoteacher.component';

import { ReusableModule } from './reusable/module/reusable.module';
import { AdminRoleModule } from './admin-role/module/admin-role.module';
import { DepartmentModule } from './department/module/department.module';

import { QuestionModule } from './question/module/question.module';

import { CategoryComponent } from './category/component/category/category.component';
import { MainComponent } from './category/component/main/main.component';
import { AddModuleComponent } from './category/component/add-module/add-module.component';
import { AddCategoryComponent } from './category/component/add-category/add-category.component';
import { UpdatemoduleComponent } from './category/component/updatemodule/updatemodule.component';
import { AdminmdouleComponent } from './adminmdoule/components/admin-module/adminmdoule.component';


import { TeacherCourseModule } from './teacher-course/module-name/teacher-course.module';
import { InactiveTeacherCourseComponent } from './displayAssignedCourseToTeacher/components/inactive-teacher-course/inactive-teacher-course.component';

import { AuthUserModule } from './auth-user/modules/auth-user.module';
import { AuthenticationloginComponent } from './authenticationlogin/components/authenticationlogin/authenticationlogin.component';
import { StudentPanelComponent } from './student-panel/components/student-panel/student-panel.component';

import { ProfilesModule } from './profiles/module/profiles.module';
import { ModuleModule } from './module/module/module.module';
import { AddDepartmentsComponent } from './institute-details/components/add-departments/add-departments.component';
import { CourseDepartmentComponent } from './institute-details/components/course-department/course-department.component';
import { DisplaySchoolComponent } from './institute-details/components/display-school/display-school.component';
import { ViewCoursesComponent } from './institute-details/components/view-courses/view-courses.component';
import { ViewDepartmentComponent } from './institute-details/components/view-department/view-department.component';
import { EmailModule } from './email/module/email.module';
import { QuizModule } from './quiz/module/quiz.module';
import { UploadFileComponent } from './FileUpload/upload-file/upload-file.component';
import { AccessControlModule } from './accesscontrol/module/accesscontrol.module';

import { ModuleFileModule } from './module-file/module-names/module-file.module';
import { HttpInterceptorService } from './shared/services/HttpInterceptor/http-interceptor.service';
import { UploadfileReusableModule } from './uploadfile-reusable/uploadfile-reusable.module';

import { ModuleHeaderComponent } from './reusable/component/module-header/module-header.component';

import { ChartdataComponent } from './charts/components/chartdata/chartdata.component';
import { BarChartComponent } from './charts/components/bar-chart/bar-chart.component';




import { MatDialogModule } from '@angular/material/dialog';
import { AnalyticsComponent } from './admin-analytics/analytics/analytics.component';
import { PolarChartComponent } from './charts/components/polar-chart/polar-chart.component';
import { StudentModuleModule } from './student-module/student-module.module';
import { ReviewQueAnsComponent } from './review-answer/components/review-que-ans/review-que-ans.component';
import { ReviewModule } from './review-answer/module/review/review.module';
import { AddReviewMarksComponent } from './review-answer/components/add-review-marks/add-review-marks.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    AdminroleComponent,
    AdminroleComponent,
    LoginauthComponent,
    HomeComponent,
    CategoryComponent,
    MainComponent,
    AddModuleComponent,
    AddCategoryComponent,
    ViewDepartmentComponent,
    ViewCoursesComponent,
    AddinstituteComponent,
    DisplayinstituteComponent,
    UpdatemoduleComponent,
    AnnouncementComponent,
    CreateAnnouncementComponent,
    ActivateRoleComponent,
    ActivateInstitutionComponent,
    AuthenticationloginComponent,
    AdminmdouleComponent,
    TeacherPanelComponent,
    EnrollstudentComponent,
    InactiveTeacherCourseComponent,
    DisplaySchoolComponent,
    CourseDepartmentComponent,
    AddDepartmentsComponent,
    AssigncoursetoteacherComponent,
    UploadFileComponent,
    StudentPanelComponent,

    ChartdataComponent,

    BarChartComponent,
    AnalyticsComponent,
    PolarChartComponent,
    ReviewQueAnsComponent
      
    







  ],

  imports: [
    ModuleFileModule,
    QuizModule,
    EmailModule,
    ModuleModule,
    QuestionModule,
    AuthUserModule,
    ProfilesModule,
    DepartmentModule,
    ReviewModule,
    ReusableModule,
    AdminRoleModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    BrowserModule,
    NgSelectModule,
    CommonModule,
    TeacherCourseModule,
    AccessControlModule,
    UploadfileReusableModule,
    ReactiveFormsModule,
    FormsModule,
    StudentModuleModule,
    MatDialogModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
