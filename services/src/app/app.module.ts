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

import { LoginComponentComponent } from './Login/login-component/login-component.component';


import { DisplayInstituteAdminComponent } from './instituteadminrole/display-institute-admin/display-institute-admin.component';


import { DepartmentComponent } from './admindepartment/department/department.component';
import { AuthuserComponent } from './authuser/authuser/authuser.component';



@NgModule({
  declarations: [
    AppComponent,
    DisplayAdminroleComponent,
    InsertadminroleComponent,
    UpdateadminroleComponent,
    ViewadminroleComponent,
    AuthuserComponent,
    
    LoginComponentComponent,

    DisplayInstituteAdminComponent,

    DepartmentComponent

 
 

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
