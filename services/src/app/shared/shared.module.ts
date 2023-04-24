import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { AdvFilterPipe } from './pipes/adv-filter/adv-filter.pipe';
import { RemoveExtensionPipe } from './pipes/removeExtension/remove-extension.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    AdvFilterPipe,
    RemoveExtensionPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe,
    AdvFilterPipe,
    RemoveExtensionPipe
  ]
})
export class SharedModule { }
