import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleFileComponent } from '../components/module-file/module-file.component';
import { UploadfileReusableModule } from 'app/uploadfile-reusable/uploadfile-reusable.module';
import { ReusableModule } from 'app/reusable/module/reusable.module';


@NgModule({
  declarations: [
    ModuleFileComponent
  ],
  imports: [
    CommonModule,
    UploadfileReusableModule,
    ReusableModule
  ]
})
export class ModuleFileModule { }
