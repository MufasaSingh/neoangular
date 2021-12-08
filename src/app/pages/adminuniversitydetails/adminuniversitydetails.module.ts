import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminuniversitydetailsRoutingModule } from './adminuniversitydetails-routing.module';
import { AdminuniversitydetailsComponent } from "./adminuniversitydetails.component"

@NgModule({
  declarations: [ 
    AdminuniversitydetailsComponent
  ],
  imports: [
    CommonModule,
    AdminuniversitydetailsRoutingModule
  ]
})
export class AdminuniversitydetailsModule { }
