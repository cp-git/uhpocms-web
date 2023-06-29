import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionComponent } from './components/permission/permission.component';
import { FormsModule } from '@angular/forms';
import { ReusableModule } from 'app/reusable/module/reusable.module';
import { SharedModule } from 'app/shared/shared.module';
import { UserPermissionComponent } from './components/user-permission/user-permission.component';
import { AuthModuleComponent } from './components/auth-module/auth-module.component';



@NgModule({
  declarations: [
    PermissionComponent,
    UserPermissionComponent,
    AuthModuleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReusableModule,
    SharedModule
  ]
})
export class PermissionModule { }
