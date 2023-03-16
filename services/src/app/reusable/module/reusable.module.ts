import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ViewAllComponent } from '../component/view-all/view-all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewOneComponent } from '../component/view-one/view-one.component';
import { AddUpdateComponent } from '../component/add-update/add-update.component';


@NgModule({
  declarations: [
    ViewAllComponent,
    AddUpdateComponent,
    ViewOneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ViewAllComponent,
    AddUpdateComponent,
    ViewOneComponent
  ],
  providers: [Location]
})
export class ReusableModule { }
