import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableModule } from 'app/reusable/module/reusable.module';
import { EmailComponent } from '../components/email/email.component';

@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class EmailModule { }
