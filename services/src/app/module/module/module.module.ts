import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleComponent } from '../components/module/module.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';



@NgModule({
  declarations: [
    ModuleComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class ModuleModule { }
