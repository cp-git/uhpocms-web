import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayAdminListComponent } from './display-admin-list/display-admin-list.component';
import { InsertAdminRoleComponent } from './insert-admin-role/insert-admin-role.component';
import { UpdateAdminRoleComponent } from './update-admin-role/update-admin-role.component';
import { ViewAdminRoleComponent } from './view-admin-role/view-admin-role.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayAdminListComponent,
    InsertAdminRoleComponent,
    UpdateAdminRoleComponent,
    ViewAdminRoleComponent
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
