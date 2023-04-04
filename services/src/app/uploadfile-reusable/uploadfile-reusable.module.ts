import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateuploadComponent } from './components/add-updateupload/add-updateupload.component';
import { ViewAlluploadComponent } from './components/view-allupload/view-allupload.component';
import { ViewOneuploadComponent } from './components/view-oneupload/view-oneupload.component';



@NgModule({
  declarations: [
    AddUpdateuploadComponent,
    ViewAlluploadComponent,
    ViewOneuploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddUpdateuploadComponent,
    ViewAlluploadComponent,
    ViewOneuploadComponent
  ],
  providers: [Location]
})

export class UploadfileReusableModule { }

