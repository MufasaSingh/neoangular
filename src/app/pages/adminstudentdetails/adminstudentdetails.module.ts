import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminstudentdetailsRoutingModule } from './adminstudentdetails-routing.module';
import { AdminstudentdetailsComponent } from "./adminstudentdetails.component"

import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    AdminstudentdetailsComponent
  ],
  imports: [
    CommonModule,
    AdminstudentdetailsRoutingModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class AdminstudentdetailsModule { }
