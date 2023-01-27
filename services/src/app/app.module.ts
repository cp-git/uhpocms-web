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
import { HttpInterceptorServiceService } from './authlogin/http-interceptor-service.service';
import { AuthorizationAuthComponent } from './authuser/authorization-auth/authorization-auth.component';
import { AuthorizeTeacherComponent } from './teachermodule/authorize-teacher/authorize-teacher.component';
import { AuthorizationComponent } from './teacherquestion/authorization/authorization.component';

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
    AuthorizationAuthComponent,
    AuthorizeTeacherComponent,
    AuthorizationComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorServiceService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
