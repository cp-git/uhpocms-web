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
import { DisplayInstituteAdminComponent } from './instituteadminprofile/display-institute-admin/display-institute-admin.component';

import { AdminroleComponent } from './roleadmin/components/adminrole/adminrole.component';

import { LoginauthComponent } from './authlogin/loginauth/loginauth.component';

import { TeachermoduleComponent } from './teachermodule/teachermodule/teachermodule.component';

import { AuthuserComponent } from './authuser/authuser/authuser.component';
import { HomeComponent } from './home/home.component';
import { AddcourseComponent } from './course/addcourse/addcourse.component';
import { UpdatecourseComponent } from './course/updatecourse/updatecourse.component';

;
import { CreateQuizComponent } from './quiz/create-quiz/create-quiz.component';
import { UpdatequizComponent } from './quiz/updatequiz/updatequiz.component';
import { AddinstituteComponent } from './admin-institution/components/addinstitute/addinstitute.component';
import { DisplayinstituteComponent } from './admin-institution/components/displayinstitute/displayinstitute.component';

import { AnnouncementComponent } from './announcement/components/announcement/announcement.component';
import { CreateAnnouncementComponent } from './announcement/components/create-announcement/create-announcement.component';

import { ActivateRoleComponent } from './roleadmin/components/activate-role/activate-role.component';

import { ActivateProfileComponent } from './instituteadminprofile/activate-profile/activate-profile.component';
import { ActivateInstitutionComponent } from './admin-institution/components/activate-institution/activate-institution.component';
import { InsertinstituteadminprofileComponent } from './instituteadminprofile/insertinstituteadminprofile/insertinstituteadminprofile.component';
import { UpdateinstituteadminprofileComponent } from './instituteadminprofile/updateinstituteadminprofile/updateinstituteadminprofile.component';
import { ViewinstiteadminprofileComponent } from './instituteadminprofile/viewinstiteadminprofile/viewinstiteadminprofile.component';






import { TeacherPanelComponent } from './teacher-panel/components/teacher-panel/teacher-panel.component';

import { StudentdataComponent } from './student/components/studentdata/studentdata.component';
import { ActivationScreenComponent } from './teachermodule/activation-screen/activation-screen.component';
import { QuizComponent } from './quiz/quiz.component';

import { EnrollstudentComponent } from './enrollstudent/components/enrollstudent.component';
import { StudentmoduleComponent } from './student/components/student-course/studentmodule/studentmodule.component';
import { StudentCourseComponent } from './student/components/student-course/student-course.component';


import { DisplaySchoolComponent } from './InstituteDetails/display-school/display-school.component';
import { CoursedepartmentComponent } from './InstituteDetails/coursedepartment/coursedepartment.component';
import { AddDepartmentsComponent } from './InstituteDetails/add-departments/add-departments.component';
import { AssigncoursetoteacherComponent } from './assigncoursetoteacher/components/assigncoursetoteacher/assigncoursetoteacher.component';
import { CreateinstituteadminprofileComponent } from './instituteadminprofile/createinstituteadminprofile/createinstituteadminprofile.component';
import { InactivecourseComponent } from './course/inactivecourse/inactivecourse.component';

import { ReusableModule } from './reusable/module/reusable.module';
import { AdminRoleModule } from './admin-role/module/admin-role.module';
import { DepartmentModule } from './department/department.module';



import { QuestionModule } from './question/class/question.module';




import { CategoryComponent } from './category/component/component/category.component';
import { MainComponent } from './category/UI/main/main.component';
import { AddModuleComponent } from './category/UI/add-module/add-module.component';
import { AddCategoryComponent } from './category/UI/add-category/add-category.component';
import { UpdatemoduleComponent } from './category/updatemodule/updatemodule.component';
import { EmailComponent } from './email/components/email/email.component';
import { AdminmdouleComponent } from './adminmdoule/components/admin-module/adminmdoule.component';
import { ViewCoursesComponent } from './InstituteDetails/view-courses/view-courses.component';
import { ViewDepartmentComponent } from './InstituteDetails/view-department/view-department.component';
import { CourseComponent } from './course/displaycourse/course.component';
import { TeacherCourseModule } from './teacher-course/teacher-course.module';
import { InactiveTeacherCourseComponent } from './displayAssignedCourseToTeacher/components/inactive-teacher-course/inactive-teacher-course.component';

import { TeacherCourseComponent } from './teacher-course/components/teacher-course/teacher-course.component';
import { HttpInterceptorServiceService } from './authlogin/service/http-interceptor-service.service';
import { AuthUserModule } from './auth-user/modules/auth-user.module';
import { AuthenticationloginComponent } from './authenticationlogin/authenticationlogin.component';








@NgModule({
  declarations: [
    AppComponent,
    AuthuserComponent,
    LoginComponentComponent,
    DisplayInstituteAdminComponent,

    AdminroleComponent,
    AdminroleComponent,
    LoginauthComponent,
    TeachermoduleComponent,

    EmailComponent,

    HomeComponent,
    CourseComponent,
    AddcourseComponent,
    UpdatecourseComponent,
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
    ActivateProfileComponent,
    ActivateInstitutionComponent,
    InsertinstituteadminprofileComponent,
    UpdateinstituteadminprofileComponent,
    ViewinstiteadminprofileComponent,
    AuthenticationloginComponent,
    AdminmdouleComponent,
    TeacherPanelComponent,
    StudentdataComponent,
    ActivationScreenComponent,
    QuizComponent,
    EnrollstudentComponent,
    StudentCourseComponent,
    InactiveTeacherCourseComponent,
    DisplaySchoolComponent,
    CoursedepartmentComponent,
    AddDepartmentsComponent,
    StudentmoduleComponent,
    AssigncoursetoteacherComponent,
    CreateinstituteadminprofileComponent,
    InactivecourseComponent,



  ],

  imports: [
    QuestionModule,
    AuthUserModule,
    // ProfilesModule,
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
