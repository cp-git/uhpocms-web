import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { DisplayInstituteAdminComponent } from './instituteadminprofile/display-institute-admin/display-institute-admin.component';
import { DepartmentComponent } from './admindepartment/department/department.component';
import { AuthuserComponent } from './authuser/authuser/authuser.component';
import { AdminroleComponent } from './roleadmin/adminrole/adminrole.component';
import { LoginauthComponent } from './authlogin/loginauth/loginauth.component';
import { QuestionComponent } from './teacherquestion/question/question.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthuserComponent,
    LoginComponentComponent,
    DisplayInstituteAdminComponent,
    DepartmentComponent,
    AdminroleComponent,
    LoginauthComponent,
    QuestionComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
