import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AdminStudentsRoutingModule } from './admin-students-routing.module';
import { AdminStudentsComponent } from "./admin-students.component"


@NgModule({
  declarations: [
    AdminStudentsComponent
  ],
  imports: [
    CommonModule,
    AdminStudentsRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class AdminStudentsModule { }
