import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOneAuthUserComponent } from './components/view-one-auth-user/view-one-auth-user.component';
import { ViewAllAuthUserComponent } from './components/view-all-auth-user/view-all-auth-user.component';
import { AddAuthUserComponent } from './components/add-auth-user/add-auth-user.component';
import { TableModule } from 'app/front/module/table.module';



@NgModule({
  declarations: [
    ViewOneAuthUserComponent,
    ViewAllAuthUserComponent,
    AddAuthUserComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class AuthUserModule { }
