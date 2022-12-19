import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayAdminListComponent } from './display-admin-list/display-admin-list.component';
import { InsertAdminRoleComponent } from './insert-admin-role/insert-admin-role.component';
import { UpdateAdminRoleComponent } from './update-admin-role/update-admin-role.component';
import { ViewAdminRoleComponent } from './view-admin-role/view-admin-role.component';

const routes: Routes = [
  {path:'',component:DisplayAdminListComponent},
  {path:'addAdminRole',component:InsertAdminRoleComponent},
  {path:'updateAdminRole/:roleName',component:UpdateAdminRoleComponent},
  {path:'updateAdminRole',component:UpdateAdminRoleComponent},
  {path:'viewAdminData/:roleName',component:ViewAdminRoleComponent},
  {path:'viewAdminData',component:ViewAdminRoleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
