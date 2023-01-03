import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './admindepartment/department/department.component';
import { AuthuserComponent } from './authuser/authuser/authuser.component';

import { DisplayInstituteAdminComponent } from './instituteadminrole/display-institute-admin/display-institute-admin.component';

import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { DisplayAdminroleComponent } from './roleadmin/display-adminrole/display-adminrole.component';
import { InsertadminroleComponent } from './roleadmin/insertadminrole/insertadminrole.component';
import { UpdateadminroleComponent } from './roleadmin/updateadminrole/updateadminrole.component';
import { ViewadminroleComponent } from './roleadmin/viewadminrole/viewadminrole.component';


const routes: Routes = [
  //admin role routes
  { path: 'RoleAdminHome', component: DisplayAdminroleComponent },
  { path: 'addAdminRole', component: InsertadminroleComponent },
  { path: 'updateAdminRole/:roleName', component: UpdateadminroleComponent },
  { path: 'updateAdminRole', component: UpdateadminroleComponent },
  { path: 'viewAdminData/:roleName', component: ViewadminroleComponent },
  { path: 'viewAdminData', component: ViewadminroleComponent },

  //auth user routes
  { path: 'authuser', component: AuthuserComponent },


  //login route
  { path: '', component: LoginComponentComponent },

  //instituteadmin routes
  { path: 'displayInstituteAdmin', component: DisplayInstituteAdminComponent },
  


  //admindepartment routes
  { path: 'department', component: DepartmentComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
