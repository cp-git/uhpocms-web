import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayDepartmentComponent } from './admindepartment/display-department/display-department.component';
import { InsertDepartmentComponent } from './admindepartment/insert-department/insert-department.component';
import { UpdateDepartmentComponent } from './admindepartment/update-department/update-department.component';
import { ViewDepartmentComponent } from './admindepartment/view-department/view-department.component';
import { DisplayAuthuserComponent } from './authuser/display-authuser/display-authuser.component';
import { InsertAuthUserComponent } from './authuser/insert-auth-user/insert-auth-user.component';
import { UpdateAuthUserComponent } from './authuser/update-auth-user/update-auth-user.component';
import { ViewauthUserComponent } from './authuser/viewauth-user/viewauth-user.component';
import { DisplayInstituteAdminComponent } from './instituteadminrole/display-institute-admin/display-institute-admin.component';

import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { DisplayAdminroleComponent } from './roleadmin/display-adminrole/display-adminrole.component';
import { InsertadminroleComponent } from './roleadmin/insertadminrole/insertadminrole.component';
import { UpdateadminroleComponent } from './roleadmin/updateadminrole/updateadminrole.component';
import { ViewadminroleComponent } from './roleadmin/viewadminrole/viewadminrole.component';


const routes: Routes = [
  //admin role routes
  {path:'RoleAdminHome',component:DisplayAdminroleComponent},
  {path:'addAdminRole',component:InsertadminroleComponent},
  {path:'updateAdminRole/:roleName',component:UpdateadminroleComponent},
  {path:'updateAdminRole',component:UpdateadminroleComponent},
  {path:'viewAdminData/:roleName',component:ViewadminroleComponent},
  {path:'viewAdminData',component:ViewadminroleComponent},

  //auth user routes
  {path:'authuser',component:DisplayAuthuserComponent},
  {path:'viewauthData/:authUserName',component:ViewauthUserComponent},
  {path:'viewauthData',component:ViewauthUserComponent},
  {path:'addAuthUser',component:InsertAuthUserComponent},
  {path:'updateuser/:authUserName',component:UpdateAuthUserComponent},

  //login route
  {path:'',component:LoginComponentComponent},

 //instituteadmin routes
  {path:'displayInstituteAdmin',component:DisplayInstituteAdminComponent},
  

  //admindepartment routes
  { path: 'dept', component: DisplayDepartmentComponent },
  { path: 'dept/insertdept', component: InsertDepartmentComponent },
  { path: 'dept/updatedept/:deptName', component: UpdateDepartmentComponent },
  { path: 'dept/viewdept/:deptName', component: ViewDepartmentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
