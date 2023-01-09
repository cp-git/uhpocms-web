import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './admindepartment/department/department.component';
import { LoginauthComponent } from './authlogin/loginauth/loginauth.component';
import { AuthuserComponent } from './authuser/authuser/authuser.component';
import { DisplayInstituteAdminComponent } from './instituteadminprofile/display-institute-admin/display-institute-admin.component';
import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { AdminroleComponent } from './roleadmin/adminrole/adminrole.component';


const routes: Routes = [
  //admin role routes
  { path: 'adminrole', component: AdminroleComponent },
  //auth user routes
  { path: 'authuser', component: AuthuserComponent },


  //login route
  { path: 'demo', component: LoginComponentComponent },

  { path: '', component: LoginauthComponent },

  //instituteadmin routes
  { path: 'displayInstituteAdmin', component: DisplayInstituteAdminComponent },



  //admindepartment routes
  { path: 'department', component: DepartmentComponent }


];

@NgModule({

  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(routes, {useHash: true})
  
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
