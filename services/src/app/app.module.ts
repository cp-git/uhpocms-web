import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { DisplayInstituteAdminComponent } from './instituteadminprofile/display-institute-admin/display-institute-admin.component';

import { DepartmentComponent } from './admindepartment/department/department.component';
import { AdminroleComponent } from './roleadmin/adminrole/adminrole.component';
import { LoginauthComponent } from './authlogin/loginauth/loginauth.component';

import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './teacherquestion/question/question.component';
import { EmailComponent } from './email/email/email.component';
import { TeachermoduleComponent } from './teachermodule/teachermodule/teachermodule.component';
import { AuthuserComponent } from './authuser/authuser/authuser.component';
import { HomeComponent } from './home/home.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar';


import { HttpInterceptorServiceService } from './authlogin/http-interceptor-service.service';
import { CourseComponent } from './course/course/course.component';
import { CategoryComponent } from './category/UI/category/category.component';
import { MainComponent } from './category/UI/main/main.component';
import { AddModuleComponent } from './category/UI/add-module/add-module.component';
import { AddCategoryComponent } from './category/UI/add-category/add-category.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthuserComponent,
    LoginComponentComponent,
    DisplayInstituteAdminComponent,
    DepartmentComponent,
    AdminroleComponent,
    LoginauthComponent,

    QuizComponent,

    TeachermoduleComponent,
    EmailComponent,
    QuestionComponent,
    HomeComponent,
    CourseComponent,
    CategoryComponent,
    MainComponent,
    AddModuleComponent,
    AddCategoryComponent
   
  
  

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule
  ],
 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorServiceService,
      multi: true
    }],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
