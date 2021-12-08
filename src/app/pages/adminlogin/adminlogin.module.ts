import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminloginComponent } from './adminlogin.component';
import { AdminloginRoutingModule } from './adminlogin-routing.module';


@NgModule({
  declarations: [
    AdminloginComponent
  ],
  imports: [
    CommonModule,
    AdminloginRoutingModule
  ]
})
export class AdminloginModule { }
