import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { DepartmentComponent } from './admindepartment/department/department.component';
import { LoginauthComponent } from './authlogin/components/loginauth.component';

import { EmailComponent } from './email/components/email/email.component';
import { QuizComponent } from './quiz/components/quiz/quiz.component';
import { AdminroleComponent } from './roleadmin/components/adminrole/adminrole.component';
// import { QuestionComponent } from './teacherquestion/question/question.component';

import { HomeComponent } from './home/home.component';

import { TeacherCourseComponent } from './teacher-course/components/teacher-course/teacher-course.component';

import { MainComponent } from './category/component/main/main.component';
import { AddModuleComponent } from './category/component/add-module/add-module.component';
import { AddCategoryComponent } from './category/component/add-category/add-category.component';

import { AddinstituteComponent } from './admin-institution/components/addinstitute/addinstitute.component';
import { DisplayinstituteComponent } from './admin-institution/components/displayinstitute/displayinstitute.component';
import { UpdatemoduleComponent } from './category/component/updatemodule/updatemodule.component';

import { AnnouncementComponent } from './announcement/components/announcement/announcement.component';
import { CreateAnnouncementComponent } from './announcement/components/create-announcement/create-announcement.component';


import { ActivateRoleComponent } from './roleadmin/components/activate-role/activate-role.component';

import { ActivateInstitutionComponent } from './admin-institution/components/activate-institution/activate-institution.component';

import { AddDepartmentsComponent } from './institute-details/components/add-departments/add-departments.component';
import { CourseDepartmentComponent } from './institute-details/components/course-department/course-department.component';
import { DisplaySchoolComponent } from './institute-details/components/display-school/display-school.component';
import { ViewDepartmentComponent } from './institute-details/components/view-department/view-department.component';

import { EnrollstudentComponent } from './enrollstudent/components/enrollstudent.component';

import { StudentModuleComponent } from './student-module/components/student-module/student-module.component';
import { StudentPanelComponent } from './student-panel/components/student-panel/student-panel.component';

import { InactiveTeacherCourseComponent } from './displayAssignedCourseToTeacher/components/inactive-teacher-course/inactive-teacher-course.component';

import { AssigncoursetoteacherComponent } from './assigncoursetoteacher/components/assigncoursetoteacher/assigncoursetoteacher.component';

import { AdminRoleComponent } from './admin-role/components/admin-role/admin-role.component';
import { AuthUserComponent } from './auth-user/components/auth-user/auth-user.component';
import { QuestionComponent } from './question/components/question/question.component';
import { DepartmentComponent } from './department/components/department/department.component';
import { CategoryComponent } from './category/component/category/category.component';
import { AdminmdouleComponent } from './adminmdoule/components/admin-module/adminmdoule.component';
import { TeacherPanelComponent } from './teacher-panel/components/teacher-panel/teacher-panel.component';
import { AuthenticationloginComponent } from './authenticationlogin/components/authenticationlogin/authenticationlogin.component';
import { ProfileComponent } from './profiles/components/profile/profile.component';
import { ModuleComponent } from './module/components/module/module.component';
import { UploadFileComponent } from './FileUpload/upload-file/upload-file.component';
import { ModuleFileComponent } from './module-file/components/module-file/module-file.component';
import { AddQuestionAnswerComponent } from './question/components/add-question-answer/add-question-answer.component';
import { PermissionComponent } from './permissions/components/permission/permission.component';
import { AuthModuleComponent } from './permissions/components/auth-module/auth-module.component';
import { AccessControlComponent } from './accesscontrol/components/access-control/access-control.component';
import { AnalyticsComponent } from './admin-analytics/analytics/analytics.component';
import { ReviewAnswerComponent } from './review-answer/components/review-answer/review-answer.component';

import { AllCourseComponent } from './teacher-course/components/all-course/all-course.component';
import { LoginPopupComponent } from './authlogin/components/login-popup/login-popup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';



const routes: Routes = [
  //Teacher-question
  //{ path: 'question', component: TeacherQuestionComponent },

  //InstituteAdminProfile Routes
  // { path: 'displayInstituteAdmin/display/:userName', component: DisplayInstituteAdminComponent },

  // { path: 'displayInstituteAdmin/display/activate/:userName', component: ActivateProfileComponent },

  //insert intituteadmin profile
  // { path: 'insertadminprofile/:userName', component: InsertinstituteadminprofileComponent },

  //update instituteadminprofile
  // { path: 'updateinstituteadminprofile/:firstName/:userName', component: UpdateinstituteadminprofileComponent },

  //view instituteadminprofile
  // { path: 'viewadminprofile/:firstName/:userName', component: ViewinstiteadminprofileComponent },

  //course Module
  //teacherCourse

  { path: 'assignteacher', component: AssigncoursetoteacherComponent },
  { path: 'assignteacher/:userName', component: AssigncoursetoteacherComponent },
  { path: 'inactivecourse', component: InactiveTeacherCourseComponent },
  { path: 'modulefile', component: ModuleFileComponent },
  { path: 'inactivecourse/:id/:userName', component: InactiveTeacherCourseComponent },
  { path: 'Course', component: TeacherCourseComponent },
  { path: 'teachercourse', component: TeacherCourseComponent },
  { path: 'teacher/:id', component: AssigncoursetoteacherComponent },
  // { path: 'teacher/:id/:userName', component: TeacherCourseComponent },
  //////////////////$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$/////////////////////
  { path: 'profile/:email', component: ForgotpasswordComponent },
  //category routing
  { path: 'addCategory', component: AddCategoryComponent },
  { path: 'addModule', component: AddModuleComponent },
  { path: 'addModule/:userName', component: AddModuleComponent },
  { path: 'main', component: MainComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'updateModule', component: UpdatemoduleComponent },
  { path: 'updateModule/:userName', component: UpdatemoduleComponent },
  { path: 'authenticationlogin', component: AuthenticationloginComponent },
  { path: 'adminmodule/admin/:userName', component: AdminmdouleComponent },
  { path: 'teacherdisplay/teacher/:userName', component: TeacherPanelComponent },
  { path: 'studentdata/student/:userName', component: StudentPanelComponent },
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
  // { path: 'authuser', component: AuthuserComponent },
  //login route
  { path: 'login', component: LoginauthComponent },
  { path: 'loginpopup', component: LoginPopupComponent },
  //instituteadmin routes
  //admindepartment routes
  { path: 'department', component: DepartmentComponent },
  { path: 'department/:userName', component: DepartmentComponent },
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
  { path: 'departmentCourse', component: CourseDepartmentComponent },
  { path: 'departmentCourse/:id/:userName', component: CourseDepartmentComponent },
  //add department for institute
  { path: 'departments', component: AddDepartmentsComponent },
  { path: 'departments/:userName', component: AddDepartmentsComponent },
  // **** commented because of reusable module
  //inserting  the quiz
  // { path: 'createQuiz/:userName', component: CreateQuizComponent },
  // { path: 'course/:id', component: ViewCoursesComponent },
  // //update Quiz
  // { path: 'updateQuiz/:title', component: UpdatequizComponent },
  // { path: 'updateQuiz/:title/:userName', component: UpdatequizComponent },
  // { path: 'updateQuiz', component: UpdatequizComponent },
  // ***commented because of reusable module
  //teacherModule routes
  // { path: 'teachermodule', component: TeachermoduleComponent },
  // { path: 'teachermodule/:userName', component: TeachermoduleComponent },
  { path: 'studentmodule', component: StudentModuleComponent },
  { path: 'email', component: EmailComponent },
  //home route
  { path: 'home', component: HomeComponent },
  //announcement router
  {
    path: 'announcement/:role', component: AnnouncementComponent, children: [
      {
        path: 'add', component: CreateAnnouncementComponent
      },
      {
        path: 'views/:id', component: CreateAnnouncementComponent
      },
      {
        path: 'viewr/:id', component: CreateAnnouncementComponent
      }
    ]
  },


  { path: 'AdminRole', component: AdminRoleComponent },
  { path: 'AdminRole/:userName', component: AdminRoleComponent },

  { path: 'Profile', component: ProfileComponent },
  { path: 'Profile/:userName', component: ProfileComponent },

  { path: 'AuthUser', component: AuthUserComponent },
  { path: 'AuthUser/:userName', component: AuthUserComponent },

  { path: 'Question', component: QuestionComponent },
  { path: 'Question/:userName', component: AddQuestionAnswerComponent },

  { path: 'Department', component: DepartmentComponent },
  { path: 'Department/:userName', component: DepartmentComponent },

  { path: 'Course', component: TeacherCourseComponent },
  { path: 'Course/:userName', component: TeacherCourseComponent },
  { path: 'Courses', component: AllCourseComponent },


  { path: 'Module', component: ModuleComponent },
  { path: 'Module/:userName', component: ModuleComponent },

  { path: 'Email', component: EmailComponent },

  { path: 'Quiz', component: QuizComponent },
  { path: 'Quiz/:userName', component: QuizComponent },

  { path: 'uploadfile', component: UploadFileComponent },
  { path: 'access', component: AccessControlComponent },
  { path: 'permission', component: PermissionComponent },
  { path: 'authmodule', component: AuthModuleComponent },
  { path: 'analytics', component: AnalyticsComponent },

  { path: 'Review/:userName', component: ReviewAnswerComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: true }),
  ],

  exports: [RouterModule],
})
export class AppRoutingModule { }
