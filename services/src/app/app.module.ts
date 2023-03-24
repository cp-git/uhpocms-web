import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

import { LoginComponentComponent } from './Login/login-component/login-component.component';

import { AdminroleComponent } from './roleadmin/components/adminrole/adminrole.component';

import { LoginauthComponent } from './authlogin/components/loginauth.component';


import { HomeComponent } from './home/home.component';


;
import { CreateQuizComponent } from './quiz/components/create-quiz/create-quiz.component';

import { AddinstituteComponent } from './admin-institution/components/addinstitute/addinstitute.component';
import { DisplayinstituteComponent } from './admin-institution/components/displayinstitute/displayinstitute.component';

import { AnnouncementComponent } from './announcement/components/announcement/announcement.component';
import { CreateAnnouncementComponent } from './announcement/components/create-announcement/create-announcement.component';

import { ActivateRoleComponent } from './roleadmin/components/activate-role/activate-role.component';

import { ActivateInstitutionComponent } from './admin-institution/components/activate-institution/activate-institution.component';

import { TeacherPanelComponent } from './teacher-panel/components/teacher-panel/teacher-panel.component';



import { QuizComponent } from './quiz/components/quiz/quiz.component';


import { EnrollstudentComponent } from './enrollstudent/components/enrollstudent.component';

import { StudentCourseComponent } from './student/components/student-course/student-course.component';



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
import { EmailComponent } from './email/components/email/email.component';
import { AdminmdouleComponent } from './adminmdoule/components/admin-module/adminmdoule.component';


import { TeacherCourseModule } from './teacher-course/module-name/teacher-course.module';
import { InactiveTeacherCourseComponent } from './displayAssignedCourseToTeacher/components/inactive-teacher-course/inactive-teacher-course.component';

import { TeacherCourseComponent } from './teacher-course/components/teacher-course/teacher-course.component';
import { HttpInterceptorServiceService } from './authlogin/service/http-interceptor-service.service';
import { AuthUserModule } from './auth-user/modules/auth-user.module';
import { AuthenticationloginComponent } from './authenticationlogin/components/authenticationlogin/authenticationlogin.component';
import { StudentPanelComponent } from './student-panel/components/student-panel/student-panel.component';
import { StudentModuleComponent } from './student-module/components/student-module/student-module.component';

import { ProfilesModule } from './profiles/module/profiles.module';

import { ModuleModule } from './module/module/module.module';

import { UpdatequizComponent } from './quiz/components/updatequiz/updatequiz.component';

import { AddDepartmentsComponent } from './institute-details/components/add-departments/add-departments.component';
import { CourseDepartmentComponent } from './institute-details/components/course-department/course-department.component';
import { DisplaySchoolComponent } from './institute-details/components/display-school/display-school.component';
import { ViewCoursesComponent } from './institute-details/components/view-courses/view-courses.component';
import { ViewDepartmentComponent } from './institute-details/components/view-department/view-department.component';
import { EmailModule } from './email/module/email.module';



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
    CreateQuizComponent,
    UpdatequizComponent,
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
    QuizComponent,
    EnrollstudentComponent,
    StudentCourseComponent,
    InactiveTeacherCourseComponent,
    DisplaySchoolComponent,
    CourseDepartmentComponent,
    AddDepartmentsComponent,
    AssigncoursetoteacherComponent,
    StudentPanelComponent,
    StudentModuleComponent,

  ],

  imports: [
    EmailModule,
    ModuleModule,
    QuestionModule,
    AuthUserModule,
    ProfilesModule,
    DepartmentModule,
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
    TeacherCourseModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorServiceService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
