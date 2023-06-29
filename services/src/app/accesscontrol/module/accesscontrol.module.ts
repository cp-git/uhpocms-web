import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReusableModule } from 'app/reusable/module/reusable.module';
import { ModuleCheckboxComponent } from '../components/module-checkbox/module-checkbox.component';
import { AddUpdateControlsComponent } from '../components/add-update-controls/add-update-controls.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AccessControlComponent } from '../components/access-control/access-control.component';
import { AdvFilterPipe } from 'app/shared/pipes/adv-filter/adv-filter.pipe';
import { FilterPipe } from 'app/shared/pipes/filter/filter.pipe';



@NgModule({
  declarations: [
    ModuleCheckboxComponent,
    AddUpdateControlsComponent,
    AccessControlComponent,
  ],
  imports: [
    CommonModule,
    ReusableModule,
    SharedModule,
    FormsModule
  ]
})
export class AccessControlModule { }
