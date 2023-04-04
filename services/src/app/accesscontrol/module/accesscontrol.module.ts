import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReusableModule } from 'app/reusable/module/reusable.module';
import { AccesscontrolComponent } from '../components/accesscontrol/accesscontrol.component';



@NgModule({
  declarations: [
    AccesscontrolComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class AccessControlModule { }
