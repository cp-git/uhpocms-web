import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoleComponent } from './components/admin-role/admin-role.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';



@NgModule({
  declarations: [
    AdminRoleComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class AdminRoleModule { }
