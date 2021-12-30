import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { AdminuniversitydetailsRoutingModule } from './adminuniversitydetails-routing.module';
import { AdminuniversitydetailsComponent } from "./adminuniversitydetails.component"

@NgModule({
  declarations: [ 
    AdminuniversitydetailsComponent
  ],
  imports: [
    CommonModule,
    AdminuniversitydetailsRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class AdminuniversitydetailsModule { }
