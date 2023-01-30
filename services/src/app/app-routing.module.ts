import { Component, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { LoginauthComponent } from './authlogin/loginauth/loginauth.component';
import { AuthuserComponent } from './authuser/authuser/authuser.component';
import { EmailComponent } from './email/email/email.component';
import { DisplayInstituteAdminComponent } from './instituteadminprofile/display-institute-admin/display-institute-admin.component';
import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { QuizComponent } from './quiz/quiz.component';
import { AdminroleComponent } from './roleadmin/adminrole/adminrole.component';
import { QuestionComponent } from './teacherquestion/question/question.component';
import { TeachermoduleComponent } from './teachermodule/teachermodule/teachermodule.component';
import { AuthorizationAuthComponent } from './authuser/authorization-auth/authorization-auth.component';
import { AuthorizeTeacherComponent } from './teachermodule/authorize-teacher/authorize-teacher.component';
import { DepartmentComponent } from './admindepartment/department/department.component';


const routes: Routes = [
  //admin role routes
  { path: 'adminrole', component: AdminroleComponent },
  //admin role routes
  { path: 'login', component: LoginauthComponent },
  //auth user routes
  { path: 'authuser', component: AuthuserComponent },


  { path: 'authorizationAuth', component: AuthorizationAuthComponent },


  //question routes
  { path: 'question', component: QuestionComponent },
  //login route
  { path: 'demo', component: LoginComponentComponent },
  { path: '', component: LoginauthComponent },

  //instituteadmin routes
  { path: 'displayInstituteAdmin', component: DisplayInstituteAdminComponent },
  { path: 'login', component: LoginauthComponent },

  //admindepartment routes
  { path: 'department', component: DepartmentComponent },

  //quiz routes
  { path: 'quiz', component: QuizComponent },


  //teacherModule routes
  { path: 'teachermodule', component: TeachermoduleComponent },


  { path: 'authTeacher', component: AuthorizeTeacherComponent },

  //teacherModule routes
  { path: 'email', component: EmailComponent }

];

@NgModule({

  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, { useHash: true })

  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }

