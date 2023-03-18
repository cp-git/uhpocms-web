import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReusableModule } from 'app/reusable/module/reusable.module';
import { CategoryComponent } from './component/component/category.component';



@NgModule({
    declarations: [
        CategoryComponent
    ],
    imports: [
        CommonModule,
        ReusableModule
    ]
})
export class CategoryModule { }
