import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayAuthuserComponent } from './authuser/display-authuser/display-authuser.component';
import { InsertAuthUserComponent } from './authuser/insert-auth-user/insert-auth-user.component';
import { UpdateAuthUserComponent } from './authuser/update-auth-user/update-auth-user.component';
import { ViewauthUserComponent } from './authuser/viewauth-user/viewauth-user.component';
import { CreateInstituteAdminComponent } from './instituteadminrole/create-institute-admin/create-institute-admin.component';
import { DisplayInstituteAdminComponent } from './instituteadminrole/display-institute-admin/display-institute-admin.component';
import { UpdateInstituteAdminComponent } from './instituteadminrole/update-institute-admin/update-institute-admin.component';
import { ViewInstituteAdminComponent } from './instituteadminrole/view-institute-admin/view-institute-admin.component';
import { LoginComponentComponent } from './Login/login-component/login-component.component';
import { DisplayAdminroleComponent } from './roleadmin/display-adminrole/display-adminrole.component';
import { InsertadminroleComponent } from './roleadmin/insertadminrole/insertadminrole.component';
import { UpdateadminroleComponent } from './roleadmin/updateadminrole/updateadminrole.component';
import { ViewadminroleComponent } from './roleadmin/viewadminrole/viewadminrole.component';


const routes: Routes = [
{path:'RoleAdminHome',component:DisplayAdminroleComponent},
  {path:'addAdminRole',component:InsertadminroleComponent},
  {path:'updateAdminRole/:roleName',component:UpdateadminroleComponent},
  {path:'updateAdminRole',component:UpdateadminroleComponent},
  {path:'viewAdminData/:roleName',component:ViewadminroleComponent},
  {path:'viewAdminData',component:ViewadminroleComponent},

  {path:'authuser',component:DisplayAuthuserComponent},
  {path:'viewauthData/:authUserName',component:ViewauthUserComponent},
  {path:'viewauthData',component:ViewauthUserComponent},
  {path:'addAuthUser',component:InsertAuthUserComponent},
  {path:'updateuser/:authUserName',component:UpdateAuthUserComponent},

  {path:'',component:LoginComponentComponent},


  {path:'displayInstituteAdmin',component:DisplayInstituteAdminComponent},
  {path:'viewInstitutionAdmin/:firstName',component:ViewInstituteAdminComponent},
  {path:'updateInstitutionAdmin/:firstName',component:UpdateInstituteAdminComponent},
  {path:'addInstitutionAdmin',component:CreateInstituteAdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
