import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { AdminStudentsRoutingModule } from './admin-students-routing.module';
import { AdminStudentsComponent } from "./admin-students.component"

import { TablefilterPipe } from "../../pipes/tablefilter.pipe"


@NgModule({
  declarations: [
    AdminStudentsComponent,
    TablefilterPipe
  ],
  imports: [
    CommonModule,
    AdminStudentsRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule
  ]
})
export class AdminStudentsModule { }
