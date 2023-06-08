import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { AdvFilterPipe } from './pipes/adv-filter/adv-filter.pipe';
import { RemoveExtensionPipe } from './pipes/removeExtension/remove-extension.pipe';

import { PdfViewerComponent } from './component/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { OrderByPipe } from './pipes/orderBy/order-by.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    AdvFilterPipe,
    RemoveExtensionPipe,
    PdfViewerComponent,
    DialogBoxComponent,
    OrderByPipe],
  imports: [
    CommonModule,
    PdfViewerModule,
    FormsModule,
    DialogModule
  ],
  exports: [
    FilterPipe,
    AdvFilterPipe,
    RemoveExtensionPipe,
    PdfViewerComponent,
    OrderByPipe
  ]
})
export class SharedModule { }
