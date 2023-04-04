import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableModule } from 'app/reusable/module/reusable.module';
import { ModuleFileComponent } from '../components/module-file/module-file.component';



@NgModule({
  declarations: [
    ModuleFileComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class ModuleFileModule { }
