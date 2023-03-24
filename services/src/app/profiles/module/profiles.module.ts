import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../components/profile/profile.component';
import { ReusableModule } from 'app/reusable/module/reusable.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReusableModule
  ]
})
export class ProfilesModule { }
