import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAllAdminRoleComponent } from './components/view-all-admin-role/view-all-admin-role.component';
import { ViewOneAdminRoleComponent } from './components/view-one-admin-role/view-one-admin-role.component';
import { UpdateAdminRoleComponent } from './components/update-admin-role/update-admin-role.component';
import { AddAdminRoleComponent } from './components/add-admin-role/add-admin-role.component';
import { TableModule } from 'app/front/module/table.module';
import { AdminRoleComponent } from './components/admin-role/admin-role.component';



@NgModule({
  declarations: [
    ViewAllAdminRoleComponent,
    ViewOneAdminRoleComponent,
    UpdateAdminRoleComponent,
    AddAdminRoleComponent,
    AdminRoleComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class AdminRoleModule { }
