import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ViewAllComponent } from '../component/view-all/view-all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewOneComponent } from '../component/view-one/view-one.component';
import { AddUpdateComponent } from '../component/add-update/add-update.component';
import { ModuleHeaderComponent } from '../component/module-header/module-header.component';


@NgModule({
  declarations: [
    ViewAllComponent,
    AddUpdateComponent,
    ViewOneComponent,
    ModuleHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ViewAllComponent,
    AddUpdateComponent,
    ViewOneComponent,
    ModuleHeaderComponent
  ],
  providers: [Location]
})
export class ReusableModule { }
