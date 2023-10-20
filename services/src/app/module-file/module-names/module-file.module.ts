import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleFileComponent } from '../components/module-file/module-file.component';
import { UploadfileReusableModule } from 'app/uploadfile-reusable/uploadfile-reusable.module';
import { ReusableModule } from 'app/reusable/module/reusable.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { CountdownModule } from 'ngx-countdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    ModuleFileComponent
  ],
  imports: [
    CommonModule,
    UploadfileReusableModule,
    ReusableModule,
    FormsModule,
    SharedModule,
    CountdownModule,
    PdfViewerModule
  ]
})
export class ModuleFileModule { }
