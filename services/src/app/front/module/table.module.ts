import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ViewAllComponent } from '../component/view-all/view-all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { ViewAddComponent } from '../component/view-add/view-add.component';
import { ViewComponent } from '../component/view/view.component';

@NgModule({
  declarations: [
    ViewAllComponent,
    ViewAddComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ViewAllComponent,
    ViewAddComponent,
    ViewComponent
  ],
  providers: [Location]
})
export class TableModule { }
