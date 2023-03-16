import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

import { AddcourseComponent } from './course/addcourse/addcourse.component';
import { UpdatecourseComponent } from './course/updatecourse/updatecourse.component';
import { CourseComponent } from './course/displaycourse/course.component';
import { CategoryComponent } from './category/UI/category/category.component';
import { MainComponent } from './category/UI/main/main.component';
import { AddModuleComponent } from './category/UI/add-module/add-module.component';
import { AddCategoryComponent } from './category/UI/add-category/add-category.component';
import { CreateQuizComponent } from './quiz/create-quiz/create-quiz.component';
import { UpdatequizComponent } from './quiz/updatequiz/updatequiz.component';
import { ViewDepartmentComponent } from './InstituteDetails/view-department/view-department.component';
import { ViewCoursesComponent } from './InstituteDetails/view-courses/view-courses.component';
import { AddinstituteComponent } from './admin-institution/addinstitute/addinstitute.component';
import { DisplayinstituteComponent } from './admin-institution/displayinstitute/displayinstitute.component';
import { UpdatemoduleComponent } from './category/updatemodule/updatemodule.component';

import { AnnouncementComponent } from './announcement/components/announcement/announcement.component';
import { CreateAnnouncementComponent } from './announcement/components/create-announcement/create-announcement.component';

import { ActivateDepartmentComponent } from './admindepartment/department/activate-department/activate-department.component';
import { ActivateRoleComponent } from './roleadmin/activate-role/activate-role.component';
import { ActivateProfileComponent } from './instituteadminprofile/activate-profile/activate-profile.component';
import { ActivateInstitutionComponent } from './admin-institution/activate-institution/activate-institution.component';

import { InsertinstituteadminprofileComponent } from './instituteadminprofile/insertinstituteadminprofile/insertinstituteadminprofile.component';
import { UpdateinstituteadminprofileComponent } from './instituteadminprofile/updateinstituteadminprofile/updateinstituteadminprofile.component';
import { ViewinstiteadminprofileComponent } from './instituteadminprofile/viewinstiteadminprofile/viewinstiteadminprofile.component';
import { AuthenticationloginComponent } from './authenticationlogin/authenticationlogin.component';
import { AdminmdouleComponent } from './adminmdoule/adminmdoule.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentdataComponent } from './studentdata/studentdata.component';
import { EnrollstudentComponent } from './enrollstudent/enrollstudent.component';

import { StudentmoduleComponent } from './studentdata/component/studentmodule/studentmodule.component';

import { StudentCourseComponent } from './student/student-course/student-course.component';
import { TeacherCourseComponent } from './assignedCourseToTeacher/teacher-course/teacher-course.component';
import { InactiveTeacherCourseComponent } from './assignedCourseToTeacher/inactive-teacher-course/inactive-teacher-course.component';

import { DisplaySchoolComponent } from './InstituteDetails/display-school/display-school.component';
import { CoursedepartmentComponent } from './InstituteDetails/coursedepartment/coursedepartment.component';
import { AddDepartmentsComponent } from './InstituteDetails/add-departments/add-departments.component';
import { AssigncoursetoteacherComponent } from './assigncoursetoteacher/assigncoursetoteacher/assigncoursetoteacher.component';



import { InactivecourseComponent } from './course/inactivecourse/inactivecourse.component';
import { AdminRoleComponent } from './admin-role/components/admin-role/admin-role.component';



const routes: Routes = [

  //AuthUser

  { path: 'authuser', component: AuthuserComponent },

  { path: 'authuser/:userName', component: AuthuserComponent },


  //InstituteAdminProfile Routes


  { path: 'displayInstituteAdmin/display/:userName', component: DisplayInstituteAdminComponent },

  { path: 'displayInstituteAdmin/display/activate/:userName', component: ActivateProfileComponent },


  //insert intituteadmin profile

  { path: 'insertadminprofile/:userName', component: InsertinstituteadminprofileComponent },

  //update instituteadminprofile


  { path: 'updateinstituteadminprofile/:firstName/:userName', component: UpdateinstituteadminprofileComponent },


  //view instituteadminprofile
  { path: 'viewadminprofile/:firstName/:userName', component: ViewinstiteadminprofileComponent },


  //course Module




  //teacherCourse

  { path: 'assignteacher', component: AssigncoursetoteacherComponent },
  { path: 'assignteacher/:userName', component: AssigncoursetoteacherComponent },

  { path: 'inactivecourse', component: InactiveTeacherCourseComponent },

  { path: 'inactivecourse/:id/:userName', component: InactiveTeacherCourseComponent },

  { path: 'teachercourse', component: TeacherCourseComponent },

  { path: 'teachercourse/:userName', component: TeacherCourseComponent },
  { path: 'teacher/:id', component: TeacherCourseComponent },



  // { path: 'teacher/:id/:userName', component: TeacherCourseComponent },




  //category routing
  { path: 'studentcourse', component: StudentCourseComponent },
  { path: 'studentcourse/:userName', component: StudentCourseComponent },
  { path: 'profile/:id', component: StudentCourseComponent },

  { path: 'addCategory', component: AddCategoryComponent },
  { path: 'addModule', component: AddModuleComponent },

  { path: 'addModule/:userName', component: AddModuleComponent },

  { path: 'main', component: MainComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'updateModule', component: UpdatemoduleComponent },




  { path: 'updateModule/:userName', component: UpdatemoduleComponent },



  { path: 'authenticationlogin', component: AuthenticationloginComponent },

  { path: 'adminmodule/admin/:userName', component: AdminmdouleComponent },

  { path: 'teacherdisplay/teacher/:userName', component: TeacherComponent },



  { path: 'studentdata/student/:userName', component: StudentdataComponent },
  // { path: 'studentdata', component: StudentdataComponent },

  { path: 'enrollstudent', component: EnrollstudentComponent },

  { path: 'enrollstudent/:userName', component: EnrollstudentComponent },

  { path: '', component: HomeComponent },
  //admin role routes
  { path: 'adminrole', component: AdminroleComponent },

  { path: 'adminrole/:userName', component: AdminroleComponent },

  //activate role routes
  { path: 'adminrole/activate/:userName', component: ActivateRoleComponent },

  //auth user routes
  { path: 'authuser', component: AuthuserComponent },

  //question routes
  { path: 'question', component: QuestionComponent },
  //login route
  { path: 'demo', component: LoginComponentComponent },
  { path: 'login', component: LoginauthComponent },

  //instituteadmin routes


  //admindepartment routes
  { path: 'department', component: DepartmentComponent },

  { path: 'department/:userName', component: DepartmentComponent },

  //admindepartment routes
  { path: 'department/departmentactivation', component: ActivateDepartmentComponent },

  { path: 'department/departmentactivation/:userName', component: ActivateDepartmentComponent },


  //quiz routes
  { path: 'quiz/:userName', component: QuizComponent },

  { path: 'department/:id', component: ViewDepartmentComponent },

  { path: 'addinstitute', component: AddinstituteComponent },

  { path: 'addinstitute/:userName', component: AddinstituteComponent },

  { path: 'displayinstitute', component: DisplayinstituteComponent },
  { path: 'displayinstitute/:userName', component: DisplayinstituteComponent },

  { path: 'displayinstitute/:adminInstitutionId', component: DisplayinstituteComponent },
  { path: 'displayinstitute/activate/:userName', component: ActivateInstitutionComponent },

  //display school urls

  { path: 'display', component: DisplaySchoolComponent },


  // { path: 'display/:id', component: DisplaySchoolComponent },

  { path: 'display/:id/:userName', component: DisplaySchoolComponent },




  //url for deprtment course

  { path: 'departmentCourse', component: CoursedepartmentComponent },
  { path: 'departmentCourse/:id/:userName', component: CoursedepartmentComponent },


  //add department for institute
  { path: 'departments', component: AddDepartmentsComponent },

  { path: 'departments/:userName', component: AddDepartmentsComponent },


  //add multiple courses for department
  { path: 'courses', component: AddcourseComponent },

  //inserting  the quiz

  { path: 'createQuiz/:userName', component: CreateQuizComponent },
  { path: 'course/:id', component: ViewCoursesComponent },


  //update Quiz
  { path: 'updateQuiz/:title', component: UpdatequizComponent },

  { path: 'updateQuiz/:title/:userName', component: UpdatequizComponent },
  // { path: 'updateQuiz', component: UpdatequizComponent },

  //teacherModule routes
  { path: 'teachermodule', component: TeachermoduleComponent },

  { path: 'teachermodule/:userName', component: TeachermoduleComponent },


  { path: 'studentmodule', component: StudentmoduleComponent },

  { path: 'email', component: EmailComponent },

  //home route
  { path: 'home', component: HomeComponent },


  { path: 'course/userrole/:userName', component: CourseComponent },


  { path: 'addcourse', component: AddcourseComponent },
  { path: 'updatecourse/:courseName/:userName', component: UpdatecourseComponent },

  { path: 'inactivecourse/:userName', component: InactivecourseComponent },

  { path: 'updatecourse/:userName', component: UpdatecourseComponent },
  //announcement router
  {
    path: 'announcement/:role', component: AnnouncementComponent, children: [
      {
        path: 'add', component: CreateAnnouncementComponent
      },
      {
        path: 'view/:id', component: CreateAnnouncementComponent
      }
    ]
  },

  { path: 'AdminRole', component: AdminRoleComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: true }),
  ],

  exports: [RouterModule],
})
export class AppRoutingModule { }
