import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayAdminroleComponent } from './roleadmin/display-adminrole/display-adminrole.component';
import { InsertadminroleComponent } from './roleadmin/insertadminrole/insertadminrole.component';
import { UpdateadminroleComponent } from './roleadmin/updateadminrole/updateadminrole.component';
import { ViewadminroleComponent } from './roleadmin/viewadminrole/viewadminrole.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DisplayAuthuserComponent } from './authuser/display-authuser/display-authuser.component';
import { ViewauthUserComponent } from './authuser/viewauth-user/viewauth-user.component';
import { InsertAuthUserComponent } from './authuser/insert-auth-user/insert-auth-user.component';
import { UpdateAuthUserComponent } from './authuser/update-auth-user/update-auth-user.component';
import { LoginComponentComponent } from './Login/login-component/login-component.component';

import { CreateInstituteAdminComponent } from './instituteadminrole/create-institute-admin/create-institute-admin.component';
import { DisplayInstituteAdminComponent } from './instituteadminrole/display-institute-admin/display-institute-admin.component';
import { UpdateInstituteAdminComponent } from './instituteadminrole/update-institute-admin/update-institute-admin.component';
import { ViewInstituteAdminComponent } from './instituteadminrole/view-institute-admin/view-institute-admin.component';
import { DisplayDepartmentComponent } from './admindepartment/display-department/display-department.component';
import { UpdateDepartmentComponent } from './admindepartment/update-department/update-department.component';
import { ViewDepartmentComponent } from './admindepartment/view-department/view-department.component';
import { InsertDepartmentComponent } from './admindepartment/insert-department/insert-department.component';
import { TestComponent } from './instituteadminrole/test/test.component';



@NgModule({
  declarations: [
    AppComponent,
    DisplayAdminroleComponent,
    InsertadminroleComponent,
    UpdateadminroleComponent,
    ViewadminroleComponent,
    DisplayAuthuserComponent,
    ViewauthUserComponent,
    InsertAuthUserComponent,
    UpdateAuthUserComponent,
    LoginComponentComponent,
    CreateInstituteAdminComponent,
    DisplayInstituteAdminComponent,
    UpdateInstituteAdminComponent,
    ViewInstituteAdminComponent,
    DisplayDepartmentComponent,
    UpdateDepartmentComponent,
    ViewDepartmentComponent,
    InsertDepartmentComponent,
    TestComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
