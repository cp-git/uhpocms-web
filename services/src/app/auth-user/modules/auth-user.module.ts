import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthUserComponent } from '../components/auth-user/auth-user.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';


@NgModule({
  declarations: [
    AuthUserComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class AuthUserModule { }
