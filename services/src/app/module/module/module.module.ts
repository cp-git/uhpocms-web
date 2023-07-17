import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleComponent } from '../components/module/module.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModuleComponent
  ],
  imports: [
    CommonModule,
    ReusableModule,
    SharedModule,
    FormsModule
  ]
})
export class ModuleModule { }
