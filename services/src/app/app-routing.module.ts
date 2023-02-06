import { Component, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DepartmentComponent } from './admindepartment/department/department.component';
import { LoginauthComponent } from './authlogin/loginauth/loginauth.component';
import { AuthuserComponent } from './authuser/authuser/authuser.component';
import { EmailComponent } from './email/email/email.component';
import { DisplayInstituteAdminComponent } from './instituteadminprofile/display-institute-admin/display-institute-admin.component';
import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { QuizComponent } from './quiz/quiz.component';
import { AdminroleComponent } from './roleadmin/adminrole/adminrole.component';
import { QuestionComponent } from './teacherquestion/question/question.component';
import { TeachermoduleComponent } from './teachermodule/teachermodule/teachermodule.component';

import { HomeComponent } from './home/home.component';
import { CreateQuizComponent } from './quiz/create-quiz/create-quiz.component';
import { UpdatequizComponent } from './quiz/updatequiz/updatequiz.component';
import { AnnouncementComponent } from './announcement/component/announcement/announcement.component';
import { CreateAnnouncementComponent } from './announcement/component/create-announcement/create-announcement.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  //admin role routes
  { path: 'adminrole', component: AdminroleComponent },
  //auth user routes
  { path: 'authuser', component: AuthuserComponent },

  //question routes
  { path: 'question', component: QuestionComponent },

  //login route
  { path: 'demo', component: LoginComponentComponent },
  { path: '', component: LoginauthComponent },
  { path: 'login', component: LoginauthComponent },

  //instituteadmin routes
  { path: 'displayInstituteAdmin', component: DisplayInstituteAdminComponent },

  //admindepartment routes
  { path: 'department', component: DepartmentComponent },

  //admindepartment routes
  { path: 'department', component: DepartmentComponent },


  //quiz routes
  { path: 'quiz', component: QuizComponent },

  //inserting  the quiz

  { path: 'createQuiz', component: CreateQuizComponent },


  //update Quiz

  { path: 'updateQuiz/:title', component: UpdatequizComponent },
  { path: 'updateQuiz', component: UpdatequizComponent },



  //teacherModule routes
  { path: 'teachermodule', component: TeachermoduleComponent },

  //teacherModule routes
  { path: 'email', component: EmailComponent },



  //home route
  { path: 'home', component: HomeComponent },
  //announcement router
  {
    path: 'announcement', component: AnnouncementComponent, children: [
      {
        path: 'add', component: CreateAnnouncementComponent
      }
    ]
  }



];

@NgModule({

  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, { useHash: true })

  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }

